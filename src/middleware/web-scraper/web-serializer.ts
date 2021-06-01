const responseDOMParser = new DOMParser();

/**
 * Serializes a string representing an HTML document into an actual Document object.
 * @param responseText Chunk of text representing an HTML document.
 * @returns A Document typed object representation
 */
export const webSerializer = (responseText: string): Document => responseDOMParser.parseFromString(responseText, 'text/html');
