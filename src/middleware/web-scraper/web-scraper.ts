import { httpClient, LoadProgressHandler, MiddlewareHandler, MiddlewarePayload, PROGRESS_BAR_TRANSITION_MS } from '../../core';

/**
 * 
 * @param onLoadProgress 
 * @returns 
 */
export const webScraper = (onLoadProgress?: LoadProgressHandler): MiddlewareHandler => {
  const responseDOMParser = new DOMParser();
  const serializer = (responseText: string) => responseDOMParser.parseFromString(responseText, 'text/html');

  return async (payload: MiddlewarePayload): Promise<MiddlewarePayload> => {
    const { href } = payload.anchor;

    if (onLoadProgress !== void 0) {
      onLoadProgress(0);
    }

    const scrapedPageDOM = await httpClient<Document>(href, { serializer, onLoadProgress });

    // If onLoadProgress is provided, middleware finalization is deferred to next transition tick to ensure full progress bar rendering
    const deferRate = onLoadProgress !== void 0 ? PROGRESS_BAR_TRANSITION_MS : 0;
    await new Promise((resolve) => setTimeout(resolve, deferRate));

    return {
      ...payload,
      rawData: scrapedPageDOM,
      data: scrapedPageDOM.body,
    };
  };
};
