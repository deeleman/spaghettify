import { EventsListener } from './core';
import { SpaghettifyConfig } from './types';

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
    /**
    const streamWriter = new StreamWriter([
      routeFilter(),
      webScraper(),
      scriptParser(),
      stateManager(),
      historyHandler(),
    ]);

    streamWriter.onComplete((stream) => {
      if (stream.data) {
        document.queryElement('body').innerHtml = stream.data;
        stream.event.preventDefault();
        eventsListener.refresh();
      }
    });

    eventsListener.onEvent((htmlElement, event) => {
      streamWriter.pipe({ DOMSnapshot, htmlElement, event });
    });
    */
    eventsListener.onEvent((htmlElement, event) => {
      console.log(htmlElement, event);
      event.preventDefault();
    });
  }
}
