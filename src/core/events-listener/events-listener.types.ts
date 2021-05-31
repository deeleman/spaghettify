/**  */
export type AnchorEvent = globalThis.MouseEvent | globalThis.TouchEvent;

/** */
export type EventsListenerSettings = {
  /** */
  element: HTMLElement;
  /** */
  elementEvent: keyof HTMLElementEventMap;
  /** */
  selector: string;
};

/**  */
export type EventCallback = (anchor: HTMLAnchorElement, event: AnchorEvent) => void;

