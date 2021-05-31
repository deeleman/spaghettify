import { AnchorEvent, EventCallback, EventsListenerSettings } from './events-listener.types';

/** 
 * Core class that handles event listeners for a given set of selectors
 * and event types withing a HTMLElement document object.
*/
export class EventsListener {
  private readonly elementEventListeners:  Array<{ element: HTMLAnchorElement; listener: EventListener }> = [];
  private readonly eventCallbacks: EventCallback[] = [];

  constructor(private readonly settings: EventsListenerSettings) {
    this.attachListeners(settings.element);
  }

  /**
   * Adds event listeners to all elements in HTML element that amtch the given selector.
   * @param body HTMLElement containing elements which are subject to be traversed by 
   * selector defied upon instantiating this class.
   */
  attachListeners(body: HTMLElement): void {
    const elements = body.querySelectorAll<HTMLAnchorElement>(this.settings.selector);

    elements.forEach((element) => {
      const listener: EventListener = (event: AnchorEvent) => {
        this.eventHandler(element, event);
      };

      element.addEventListener(this.settings.elementEvent, (e) => listener(e));
      this.elementEventListeners.push({ element, listener });
    });
  }
  
  /**
   * Registers an event listener callback
   * @param eventHandler Event listener callback to be triggered when the selected elements
   * dispatch an eligible event.
   */
  onEvent(eventHandler: EventCallback): void {
    this.eventCallbacks.push(eventHandler);
  }
  
  /**
   * Un-registers event listeners to prevent memory leaks.
   */
  detachListeners(): void {
    this.elementEventListeners.forEach(({ element, listener }) => {
      element.removeEventListener(this.settings.elementEvent, listener);
    });
  }

  private eventHandler(element: HTMLAnchorElement, event: AnchorEvent): void {
    this.eventCallbacks.forEach((eventHandler) => eventHandler(element, event));
  }
}
