import { AnchorEvent } from 'spaghettify/core/events-listener';

/**  */
export type MiddlewarePayload = {
  /**  */
  anchor: HTMLAnchorElement;
  /**  */
  event: AnchorEvent;
  /**  */
  data?: HTMLElement;
  /** */
  scriptElements?: HTMLScriptElement[];
};

/**  */
export type MiddlewareHandler = (payload: MiddlewarePayload) => 
  MiddlewarePayload |
  Promise<MiddlewarePayload | undefined> |
  undefined;
