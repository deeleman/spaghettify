import * as coreFunctions from 'spaghettify/core';
import { getMiddlewarePayloadStub, getRawDataStub } from 'spaghettify/core/testing';
import { webScraper } from './web-scraper';

jest.mock('spaghettify/core');

describe('webScraper', () => {
  const payloadStub = getMiddlewarePayloadStub();
  const { anchor, event } = payloadStub;
  const payloadMock = { anchor, event };

  jest.spyOn(coreFunctions, 'httpClient').mockResolvedValue(getRawDataStub());

  it('should return a handler that performs an AJAX request and returns populates the payload with the response', async () => {
    const handler = webScraper();

    const digestedPayload = await handler(payloadMock);

    expect(digestedPayload).toEqual(payloadStub);
  });

  it('should initialize the onLoadProgress handler to zero before triggering the HTTP call', async () => {
    const onLoadProgress = jest.fn();
    const handler = webScraper(onLoadProgress);

    await handler(payloadMock);

    expect(onLoadProgress).toHaveBeenCalledWith(0);
  });
});
