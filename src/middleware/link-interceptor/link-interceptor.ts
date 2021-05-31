import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core'

/**
 * The `linkInterceptor` middleware expects a routes array and will return a `MiddlewarePayload` object
 * handler. When executed, it will inspect the `href` of the passed `MiddlewarePayload` object
 * to assess whether the represented link is eligible for AJAX-driven navigation, shortcircuiting
 * the default DOM event if so.
 * @param routes Routes array, containing a collection of glob tokens
 * representing URLs  whose links spaghettify will act on.
 * @returns A `MiddlewarePayload` object if the link is eligible. Otherwise it will return `undefined`.
 */
export const linkInterceptor = (routes: string[]): MiddlewareHandler => {
  const routeRegexPattern = routes.join('|')
    .replace(/\//g, '\\/')
    .replace(/\./g, '\\.')
    .replace(/\+/g, '\\+')
    .replace(/\?/g, '\\?')
    .replace('**/', '(.*\\/)?')
    .replace(/\*/g, '.+?')
    .replace('.+?.+?\\/', '(.+?.+?\/)?');

  const routeRegex = new RegExp(routeRegexPattern, 'i');

  return (payload: MiddlewarePayload): MiddlewarePayload | undefined => {
    const isEligibleAnchor = routeRegex.test(payload.anchor.href);

    if (isEligibleAnchor) {
      payload.event.preventDefault();
    }

    return isEligibleAnchor ? payload : void 0
  };
};
