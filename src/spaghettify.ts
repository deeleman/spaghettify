import { EventsListener, progressBarHandler, StreamWriter } from './core';
import './core/polyfills';
import { DOMPersistenceManager, DOMScriptsParser, historyHandler, linkInterceptor, webScraper } from './middleware';
import { SpaghettifyConfig } from './spaghettify.types';

const defaultOptions: SpaghettifyConfig = {
  routes: ['*'],
  enabled: true,
  excludeByAttr: void 0,
  persistAttr: void 0,
  loadProgress: false,
};

/**
 * Spaghettify class, whose instances allow to handle current page navigation as a SPA.
 */
export class Spaghettify {
  private readonly options: SpaghettifyConfig;
  private eventsListener?: EventsListener;

  private get anchorSelector(): string {
    const exclusionAttr = this.options.excludeByAttr;
    const sanitizedExclusionAttr = exclusionAttr?.startsWith('data-') ? exclusionAttr : `data-${exclusionAttr}`;

    return this.options.excludeByAttr ? `a:not([${sanitizedExclusionAttr}])` : 'a';
  }

  constructor(options?: SpaghettifyConfig) {
    this.options = {
      ...defaultOptions,
      ...options,
    };

    if (this.options.enabled === void 0 || this.options.enabled === true) {
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

  /**
   * Orchestrates a new instance of Spaghettify.
   * @param options Spaghettify options.
   */
  static bootstrap(options?: SpaghettifyConfig): Spaghettify {
    return new Spaghettify(options);
  }

  /**
   * Teardown Spgahettify click listener watchers, so website will rollback to its previous static state.
   */
  destroy(): void {
    this.eventsListener?.detachListeners();
  }

  private addNavigationRequestListener(eventsListener: EventsListener): void {
    const { routes, loadProgress, persistAttr } = this.options;
    const onLoadProgressHandler = progressBarHandler(document, loadProgress);

    const onBeforeComplete = [
      linkInterceptor(routes || ['*']),
      webScraper(onLoadProgressHandler),
      DOMPersistenceManager(document.body, persistAttr),
    ];
    
    const onAfterComplete = [
      historyHandler(window),
      DOMScriptsParser(),
    ];

    const streamWriter = new StreamWriter({ onBeforeComplete, onAfterComplete });

    streamWriter.onComplete((stream) => {
      if (stream?.data) {
        document.body = stream.data;
        eventsListener.attachListeners(document.body);
      }
    });

    eventsListener.onEvent((anchor, event) => {
      streamWriter.pipe({ anchor, event });
    });
  }
}
