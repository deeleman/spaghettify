import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

export const historyHandler = (): MiddlewareHandler => {
  return (payload: MiddlewarePayload): MiddlewarePayload => {
    return payload;
  };
};
