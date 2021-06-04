/** Additional options for httpClient payload */
type HttpClientOptions<T> = {
  /**
   * Optional serializer function, which will receive the response as a text string ready to be serialized and returned as T
   */
  serializer?: (responseText: string) => T;
  /**
   * Optional on load progress callback, which will receibe the current progress percentage as an integer rangin from n to 100
   */
  onLoadProgress?: (loadProgress: number) => void;
};

/**
 * @description
 * General purpose network client for scraping content from a given URL with
 * extended support for typed responses.
 * @param url URL of remote resource
 * @param options 
 * @returns Typed promise with response output, featuring error handling functionality
 */
export const httpClient = async <T>(url: string, options?: HttpClientOptions<T>): Promise<T> => {
  // Initialize request
  const response = await fetch(url);

  // Spin up a binary stream reader and declare tracking tokens so we can keep track of HTTP GET download progress
  const streamReader = response.body!.getReader();
  const binaryBodyChunks = [];
  const contentLength = +(response.headers.get('Content-Length') || 0); // Total length
  let receivedContentLength = 0;
  let isDownloadInProgress = true;

  // Runs a tick-based loop to iteratively read stream progress
  while (isDownloadInProgress) {
    const { done, value } = await streamReader.read();

    isDownloadInProgress = !done;
  
    if (isDownloadInProgress) {
      binaryBodyChunks.push(value);
      receivedContentLength += value !== void 0 ? value.length : 0;
  
      if (options?.onLoadProgress !== void 0) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        options.onLoadProgress(Math.floor((receivedContentLength / contentLength) * 100));
      }
    }
  }
  
  // Recompile chunks into a single Uint8Array
  const uint8Array = new Uint8Array(receivedContentLength);
  let position = 0;

  for (const binaryBodyChunk of binaryBodyChunks) {
    uint8Array.set(binaryBodyChunk as Uint8Array, position);
    position += binaryBodyChunk ? binaryBodyChunk.length : 0;
  }

  // Decode recompiled binary array into plain string and return results
  const responseText = new TextDecoder('utf-8').decode(uint8Array);

  if (options?.serializer !== void 0) {
    return options.serializer(responseText) as T;
  }

  return responseText as unknown as T;
};
