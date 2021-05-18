import { AnchorEvent } from 'spaghettify/types';

type EventCallback = (anchor: HTMLAnchorElement, event: AnchorEvent) => void;

export class EventsListener {
  private readonly elementEventListeners:  Array<{ element: HTMLAnchorElement; listener: EventListener }> = [];
  private readonly eventCallbacks: EventCallback[] = [];
  private readonly window: Window = globalThis.window;

  constructor(
    private readonly selector: string,
    private readonly elementEvent: keyof HTMLElementEventMap,
  ) {
    this.refresh();
  }

  refresh(): void {
    const elements = this.window.document.querySelectorAll<HTMLAnchorElement>(this.selector);
    elements.forEach((element) => {
      const listener: EventListener = (event: AnchorEvent) => {
        this.eventHandler(element, event);
      };

      element.addEventListener(this.elementEvent, listener);
      this.elementEventListeners.push({ element, listener });
    });
  }
  
  onEvent(eventHandler: EventCallback): void {
    this.eventCallbacks.push(eventHandler.bind(eventHandler));
  }
  
  dispose(): void {
    this.elementEventListeners.forEach(({ element, listener }) => {
      element.removeEventListener(this.elementEvent, listener);
    });
  }

  private eventHandler(element: HTMLAnchorElement, event: AnchorEvent): any {
    this.eventCallbacks.forEach((eventHandler) => eventHandler(element, event));
  }
}
