/**  */
export type AnchorEvent = globalThis.MouseEvent | globalThis.TouchEvent;

/** Settings object for the EventsListener class  */
export type EventsListenerSettings = {
  /** DOM element (usually `document.body`) to scan for elements matching `selector`. */
  element: HTMLElement;
  /** Event type to listen to, as formalized by the `HTMLElementEventMap` union type. */
  elementEvent: keyof HTMLElementEventMap;
  /** CSS selector to lookup elements within `element`. */
  selector: string;
};

/** Typed event listener callback */
export type EventCallback = (anchor: HTMLAnchorElement, event: AnchorEvent) => void;

