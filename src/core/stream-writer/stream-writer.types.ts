import { AnchorEvent } from '../events-listener';

/**  */
export type MiddlewarePayload = {
  /**  */
  anchor: HTMLAnchorElement;
  /**  */
  event: AnchorEvent;
  /**  */
  rawData?: Document;
  /**  */
  data?: HTMLElement;
};

/**  */
export type MiddlewareHandler = (payload: MiddlewarePayload) => 
  MiddlewarePayload |
  Promise<MiddlewarePayload | undefined> |
  undefined;
