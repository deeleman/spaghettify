import './core/polyfills';
import { EventsListener, StreamWriter } from './core';
import { DOMPersistenceManager, DOMScriptsParser, historyHandler, routeFilter, webScraper } from './middleware';
import { SpaghettifyConfig } from './spaghettify-config';

/**
 * 
 */
export class Spaghettify {
  private eventsListener?: EventsListener;

  private get anchorSelector(): string {
    return this.options.excludeByAttr ? `a:not([data-${this.options.excludeByAttr}="true"])` : 'a';
  }

  constructor(private readonly options: SpaghettifyConfig) {
    if (this.options.enabled) {
      document.addEventListener('DOMContentLoaded', () => {
        this.eventsListener = new EventsListener(this.anchorSelector, 'click');
        this.processNavigationRequests(this.eventsListener);
      });

      window.addEventListener('beforeunload', () => this.destroy());
    }
  }

  destroy(): void {
    this.eventsListener?.dispose();
  }

  private processNavigationRequests(eventsListener: EventsListener): void {
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
        stream.event.preventDefault();
        document.body.innerHTML = stream.data.outerHTML;
        eventsListener.refresh();
      }
    });

    eventsListener.onEvent((anchor, event) => {
      streamWriter.pipe({ anchor, event });
    });
  }
}
