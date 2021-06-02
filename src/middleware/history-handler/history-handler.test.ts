import { getMiddlewarePayloadStub, MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core';
import { historyHandler } from './history-handler';

describe('historyHandler', () => {
  const window = globalThis.window;
  window.document.title = 'initial title';

  let payload: MiddlewarePayload;
  let handler: MiddlewareHandler;

  const timestampMock = 1622584468866;
  
  beforeEach(() => {
    payload = getMiddlewarePayloadStub();
    handler = historyHandler(window);
    jest.clearAllMocks();
  });

  it('should persist current document details within history upon first execution', async () => {
    const replaceStateSpy = jest.spyOn(globalThis.window.history, 'replaceState');
    jest.spyOn(globalThis.Date, 'now').mockImplementationOnce(() => timestampMock);
    handler = historyHandler(window);

    expect(replaceStateSpy).toHaveBeenCalledWith(
      { visitedOn: timestampMock },
      'initial title',
      expect.any(String),
    );
  });

  it('should return a handler that persists the passed payload docuemnt details within the history', async () => {
    jest.spyOn(globalThis.Date, 'now').mockImplementationOnce(() => timestampMock);
    const pushStateSpy = jest.spyOn(globalThis.window.history, 'pushState');

    await handler(payload);

    expect(pushStateSpy).toHaveBeenCalledWith(
      { visitedOn: timestampMock },
      payload.rawData?.title,
      payload.anchor.href,
    );
  });

  it('should return a handler that sets the document title from the passed payload', async () => {
    const updatedTitlePayload = {...payload };
    updatedTitlePayload.rawData!.title = 'new title';

    await handler(payload);

    expect(window.document.title).toEqual('new title');
  });

  it('should return a handler that sets a blank document title if the passed payload lacks such info', async () => {
    const undefinedTitlePayload = payload;
    undefinedTitlePayload.rawData = undefined;
    await handler(payload);

    expect(window.document.title).toEqual('');
  });

  it('should return the passed payload as is, without tampering it', async () => {
    const digestedPayload = await handler(payload);

    expect(digestedPayload).toBe(payload);
  });

  it('should spin up a listener on the popstate event that replaces the current History state ', async () => {
    const updatedTitlePayload = {...payload };
    updatedTitlePayload.rawData!.title = 'new title';

    await handler(updatedTitlePayload);

    window.dispatchEvent(new PopStateEvent('popstate', {
      state: {
        visitedOn: timestampMock,
      }
    }));

    expect(window.document.title).not.toEqual('new title');
  });

  it('should teardown all popstate listeners upon abandoning the page', async () => {
    const removeEventListenerStateSpy = jest.spyOn(globalThis.window, 'removeEventListener');

    await handler(payload);

    window.dispatchEvent(new Event('beforeunload'));

    expect(removeEventListenerStateSpy).toHaveBeenCalledWith('popstate', expect.anything());
  });
});