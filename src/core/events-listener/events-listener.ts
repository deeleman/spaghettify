import { AnchorEvent } from './events-listener.types';

/**  */
type EventCallback = (anchor: HTMLAnchorElement, event: AnchorEvent) => void;

/** */
type EventsListenerSettings = {
  /** */
  element: HTMLElement;
  /** */
  elementEvent: keyof HTMLElementEventMap;
  /** */
  selector: string;
}

/**  */
export class EventsListener {
  private readonly elementEventListeners:  Array<{ element: HTMLAnchorElement; listener: EventListener }> = [];
  private readonly eventCallbacks: EventCallback[] = [];

  constructor(private readonly settings: EventsListenerSettings) {
    this.attachListeners(settings.element);
  }

  /**
   * 
   */
  attachListeners(body: HTMLElement): void {
    const elements = body.querySelectorAll<HTMLAnchorElement>(this.settings.selector);

    elements.forEach((element) => {
      const listener: EventListener = (event: AnchorEvent) => {
        this.eventHandler(element, event);
      };

      element.addEventListener(this.settings.elementEvent, listener);
      this.elementEventListeners.push({ element, listener });
    });
  }
  
  /**
   * 
   * @param eventHandler 
   */
  onEvent(eventHandler: EventCallback): void {
    this.eventCallbacks.push(eventHandler.bind(eventHandler));
  }
  
  /**
   * 
   */
  detachListeners(): void {
    this.elementEventListeners.forEach(({ element, listener }) => {
      element.removeEventListener(this.settings.elementEvent, listener);
    });
  }

  private eventHandler(element: HTMLAnchorElement, event: AnchorEvent): any {
    this.eventCallbacks.forEach((eventHandler) => eventHandler(element, event));
  }
}
