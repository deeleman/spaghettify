type HttpClientOptions = {
  serializer?: (responseText: string) => unknown;
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
export const httpClient = async <T = string>(url: string, options?: HttpClientOptions): Promise<T> => {
  // Initialize request
  const response = await fetch(url);

  // Spin up a binary stream reader and declare tracking tokens so we can keep track of HTTP GET download progress
  const streamReader = response.body!.getReader();
  const binaryBodyChunks = [];
  const contentLength = +(response.headers.get('Content-Length') || 0); // Total length
  let receivedContentLength = 0;

  // Runs a tick-based loop to iteratively read stream progress
  while (true) {
    const { done, value } = await streamReader.read();
  
    if (done) {
      break;
    }
  
    binaryBodyChunks.push(value);
    receivedContentLength += value !== void 0 ? value.length : 0;

    if (options?.onLoadProgress !== void 0) {
      options.onLoadProgress(Math.floor((receivedContentLength / contentLength) * 100));
    }
  }
  
  // Recompile chunks into a single Uint8Array
  const uint8Array = new Uint8Array(receivedContentLength);
  let position = 0;

  for (let binaryBodyChunk of binaryBodyChunks) {
    uint8Array.set(binaryBodyChunk as Uint8Array, position); // (4.2)
    position += binaryBodyChunk ? binaryBodyChunk.length : 0;
  }

  // Decode recompiled binary array into plain string and return results
  const responseText = new TextDecoder("utf-8").decode(uint8Array);

  return options?.serializer !== void 0 ? options.serializer(responseText) : responseText as unknown as T;
};
