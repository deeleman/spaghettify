import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

export const DOMScriptsParser = (): MiddlewareHandler => {
  return (payload: MiddlewarePayload): MiddlewarePayload => {
    return payload;
  };
};
