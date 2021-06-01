import {
  httpClient,
  LoadProgressHandler,
  MiddlewareHandler,
  MiddlewarePayload,
  PROGRESS_BAR_TRANSITION_MS,
} from 'spaghettify/core';
import { webSerializer } from './web-serializer'

/**
 * Middleware hook that receives a `MiddlewarePayload` object, and peforms an HTTP GET request 
 * to the URL informed by the payload anchor href, with optional support for enabling a progress
 * bar or even interaxct with an event handler callback provided by the consumer.
 * @param onLoadProgress Can be either a boolean value, in which case the hook will enable a visual
 * download progress bar, or a consumer-provided download progress callback.
 * @returns A `MiddlewarePayload` object featuring in its rawData property the HTML snapshot fetched through HTTP
 * and its parsed `document.body` element.
 */
export const webScraper = (onLoadProgress?: LoadProgressHandler): MiddlewareHandler => {
  return async (payload: MiddlewarePayload): Promise<MiddlewarePayload> => {
    const { href } = payload.anchor;

    if (onLoadProgress !== void 0) {
      onLoadProgress(0);
    }

    const scrapedPageDOM = await httpClient<Document>(href, { serializer: webSerializer, onLoadProgress });

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
