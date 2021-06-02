import { getMiddlewarePayloadStub, MiddlewarePayload } from 'spaghettify/core';
import { DOMScriptsParser } from './dom-scripts-parser';

describe('DOMScriptsParser', () => {
  it('should parse all inline script elements and remove them from DOM and reinject them to ensure JS execution', () => {
    const handler = DOMScriptsParser();

    const result = handler(getMiddlewarePayloadStub()) as MiddlewarePayload;

    expect(result.data?.querySelectorAll('script').length).toEqual(2);
  });
});