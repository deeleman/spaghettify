import { MiddlewareHandler, MiddlewarePayload, httpClient } from 'spaghettify/core'

/**
 * 
 * @param enableProgressBar 
 * @returns 
 */
export const webScraper = (enableProgressBar?: boolean): MiddlewareHandler => {
  const responseDOMParser = new DOMParser();
  const responseDOMSerializer = (responseText: string) => responseDOMParser.parseFromString(responseText, 'text/html');

  return async (payload: MiddlewarePayload): Promise<MiddlewarePayload> => {
    const { href } = payload.anchor;
    const scrapedPageDOM = await httpClient<Document>(href, responseDOMSerializer);

    return {
      ...payload,
      rawData: scrapedPageDOM,
      data: scrapedPageDOM.body,
    };
  };
};
