import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

export const DOMPersistenceManager = (window: Window, persistSelectors: string[] = []): MiddlewareHandler => {
  return (payload: MiddlewarePayload): MiddlewarePayload => {
    return payload;
  };
};
