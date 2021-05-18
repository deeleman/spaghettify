import { AnchorEvent } from './anchor-event';

/**  */
type MiddlewarePayload = {
  rawData: HTMLElement;
  data?: HTMLElement;
  anchor: HTMLAnchorElement;
  event: AnchorEvent;
};

/**  */
export type StreamMiddleware<T = undefined> = (props: T) => (payload: MiddlewarePayload) => MiddlewarePayload;
