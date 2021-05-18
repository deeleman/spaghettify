import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

export const webScraper = (enableProgressBar?: boolean): MiddlewareHandler => {
  return (payload: MiddlewarePayload): MiddlewarePayload => {
    return payload;
  };
};
