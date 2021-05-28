import { MiddlewareHandler, MiddlewarePayload } from '../../core/stream-writer'

/**  */
export const linkInterceptor = (routes: string[]): MiddlewareHandler => {
  const routeRegexPattern = routes.join('|')
    .replace(/\//g, '\\/')
    .replace(/\./g, '\\.')
    .replace(/\+/g, '\\+')
    .replace(/\?/g, '\\?')
    .replace(/\*+/g, '.?');

  const routeRegex = new RegExp(routeRegexPattern, 'i');

  return (payload: MiddlewarePayload): MiddlewarePayload | undefined => {
    const isEligibleAnchor = routeRegex.test(payload.anchor.href);

    if (isEligibleAnchor) {
      payload.event.preventDefault();
    }

    return isEligibleAnchor ? payload : void 0
  };
};
