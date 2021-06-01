import { AnchorEvent } from '../events-listener';

/** Object representing the streamed object to be digested by each middleware hook. */
export type MiddlewarePayload = {
  /** The DOM element representing the clicked link. */
  anchor: HTMLAnchorElement;
  /** The DOM event propagated by the DOM element being listened. */
  event: AnchorEvent;
  /** A raw HTML snapshot of the target page.  */
  rawData?: Document;
  /** The body element to be iteratively transformed by each middleware hook. */
  data?: HTMLElement;
};

/** Represents the interface of a Middleware hook function. */
export type MiddlewareHandler = (payload: MiddlewarePayload) => 
  MiddlewarePayload |
  Promise<MiddlewarePayload | undefined> |
  undefined;
