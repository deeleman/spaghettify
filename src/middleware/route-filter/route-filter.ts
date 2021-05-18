import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

export const routeFilter = (routes: string[]): MiddlewareHandler => {
  return (payload: MiddlewarePayload): MiddlewarePayload => {
    return payload;
  };
};
