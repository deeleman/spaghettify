/**
 * Http Status mapping enum
 * @internal
 */
 enum HttpStatus {
  Success     = 200,
  Redirect    = 300,
  ClientError = 400,
  ServerError = 500
}

/**
 * @description
 * General purpose network client for scraping content from a given URL with
 * extended support for typed responses.
 * @param url URL of remote resource
 * @param serializer OPTIONAL: generic transform function that will serialize data before returning it
 * @returns Typed promise with response output, featuring error handling functionality
 */
export const httpClient = async <T = string>(url: string, serializer?: (input: any) => T): Promise<T> => {
  return fetch(url)
    .then((response: Response) => {
      if (response.ok && response.status >= HttpStatus.Success && response.status < HttpStatus.Redirect) {
        return response.text();
      } else {
        const errorMessage = !response.ok ? 'Invalid Response' : `Http Error ${response.status}`;
        throw new Error(errorMessage);
      }
    })
    .then((data) => (serializer !== void 0 ? serializer(data) : data as unknown as T))
    .catch((error: Error) => Promise.reject(error));
};