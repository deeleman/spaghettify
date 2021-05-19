import { AnchorEvent } from 'spaghettify/core/events-listener';

/**  */
export type MiddlewarePayload = {
  /**  */
  anchor: HTMLAnchorElement;
  /**  */
  event: AnchorEvent;
  /**  */
  rawData?: HTMLElement;
   /**  */
  data?: HTMLElement;
};

/**  */
export type MiddlewareHandler = (payload: MiddlewarePayload) => MiddlewarePayload | undefined;

/**  */
export type StreamMiddleware<T = undefined> = (props: T) => MiddlewareHandler;
