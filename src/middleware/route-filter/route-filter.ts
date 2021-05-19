import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

/**  */
export const routeFilter = (routes: string[]): MiddlewareHandler => {
  const routeRegexPattern = routes.join('|')
    .replace(/\//g, '\\/')
    .replace(/\./g, '\\.')
    .replace(/\+/g, '\\+')
    .replace(/\?/g, '\\?')
    .replace(/\*/g, '.*');

  const regex = new RegExp(routeRegexPattern, 'gi');

  return (payload: MiddlewarePayload): MiddlewarePayload | undefined => {
    return regex.test(payload.anchor.href) ? payload : void 0;
  };
};
