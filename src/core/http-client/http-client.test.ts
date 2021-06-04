/* eslint-disable @typescript-eslint/no-magic-numbers */
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, ReadableStreamDefaultReader } from 'web-streams-polyfill/ponyfill';
import { rawDataMock } from 'spaghettify/core/testing';
import { httpClient } from './http-client';

// js-dom lacks an implementation of TextDecoder when executed in browser environment so we polyfill it by hand.
Object.defineProperties(globalThis, {
  'TextDecoder': {
    value: TextDecoder,
    writable: true,
  }
});

describe('httpClient', () => {
  const MOCK_URL = 'http-client-mock.test.html';

  const headers = new Headers();
  headers.append('Content-Length', rawDataMock.length.toString());
  const response = new Response(rawDataMock, { headers });

  const encoder = new TextEncoder();
  const chunks = [
    encoder.encode(rawDataMock.substring(0, 100)),
    encoder.encode(rawDataMock.substring(100, 200)),
    encoder.encode(rawDataMock.substring(200, rawDataMock.length)),
  ];

  beforeEach(() => {
    window.fetch = jest.fn().mockResolvedValue({
      ...response,
      body: {
        ...new ReadableStream<Uint8Array>(),
        getReader: () => ({
          ...new ReadableStreamDefaultReader<Uint8Array>(new ReadableStream<Uint8Array>()),
          read: jest.fn()
            .mockReturnValue({ done: true })
            .mockReturnValueOnce({ done: false, value: chunks[0] })
            .mockReturnValueOnce({ done: false, value: chunks[1] })
            .mockReturnValueOnce({ done: false, value: chunks[2] })
        })
      }
    });
  });

  it('should perform a GET request to the given URL', async () => {
    const fetchSpy = jest.spyOn(window, 'fetch');

    await httpClient(MOCK_URL);

    expect(fetchSpy).toHaveBeenCalledWith(MOCK_URL);
  });

  it('should return the content served from the given URL', async () => {
    const result = await httpClient(MOCK_URL);

    expect(result).toEqual(rawDataMock);
  });

  it('should serialize the returned response through an adapter function if provided via options', async () => {
    const seralizerStub = (rawResponse: string): string => {
      return rawResponse.replace('Spaghettify Mock Document', 'Spaghettify Serialized Document');
    }
    const result = await httpClient(MOCK_URL, { serializer: seralizerStub });

    expect(result).toContain('Spaghettify Serialized Document');
  });

  it('should iteratively inform the download progress through a load progress callback if provided via options', async () => {
    const loadProgressHandlerSpy = jest.fn();

    await httpClient(MOCK_URL, { onLoadProgress: loadProgressHandlerSpy });

    expect(loadProgressHandlerSpy).toHaveBeenCalledTimes(3);
    expect(loadProgressHandlerSpy).toHaveBeenCalledWith(20);
    expect(loadProgressHandlerSpy).toHaveBeenCalledWith(41);
    expect(loadProgressHandlerSpy).toHaveBeenLastCalledWith(100);
  });
});