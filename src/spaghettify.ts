import { EventsListener, StreamWriter } from './core';
import './core/polyfills';
import { DOMPersistenceManager, DOMScriptsParser, historyHandler, routeFilter, webScraper } from './middleware';
import { SpaghettifyConfig } from './spaghettify-config';

/**
 * 
 */
export class Spaghettify {
  private eventsListener?: EventsListener;

  private get anchorSelector(): string {
    const exclusionAttr = this.options.excludeByAttr;
    const sanitizedExclusionAttr = exclusionAttr?.startsWith('data-') ? exclusionAttr : `data-${exclusionAttr}`;

    return this.options.excludeByAttr ? `a:not([${sanitizedExclusionAttr}])` : 'a';
  }

  constructor(private readonly options: SpaghettifyConfig) {
    if (this.options.enabled) {
      document.addEventListener('DOMContentLoaded', () => {
        this.eventsListener = new EventsListener({
          element: document.body,
          elementEvent: 'click',
          selector: this.anchorSelector,
        });
        this.addNavigationRequestListener(this.eventsListener);
      });

      window.addEventListener('beforeunload', this.destroy);
    }
  }

  destroy(): void {
    this.eventsListener?.detachListeners();
  }

  private addNavigationRequestListener(eventsListener: EventsListener): void {
    const { routes, enableProgressBar, persistSelectors } = this.options;
    const middlewares = [
      routeFilter(routes),
      webScraper(enableProgressBar),
      DOMScriptsParser(),
      DOMPersistenceManager(persistSelectors),
      historyHandler(),
    ];

    const streamWriter = new StreamWriter(middlewares);

    streamWriter.onComplete((stream) => {
      if (stream.data) {
        document.body = stream.data;
        eventsListener.attachListeners(document.body);
      }
    });

    eventsListener.onEvent((anchor, event) => {
      streamWriter.pipe({ anchor, event });
    });
  }
}
