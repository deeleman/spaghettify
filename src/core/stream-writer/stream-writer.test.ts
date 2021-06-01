import { getMiddlewarePayloadStub } from '../testing';
import { StreamWriter } from './stream-writer';

describe('StreamWriter', () => {
  const middlewareHandlerStub1 = jest.fn().mockImplementation((payload) => payload);
  const middlewareHandlerStub2 = jest.fn().mockImplementation((payload) => Promise.resolve(payload));
  const middlewareHandlerStub3 = jest.fn().mockImplementation((payload) => payload);
  const middlewareHandlerStub4 = jest.fn().mockImplementation((payload) => Promise.resolve(payload));
  const middlewareHandlerStubFail = jest.fn().mockResolvedValue(void 0);

  const onBeforeComplete = [middlewareHandlerStub1, middlewareHandlerStub2];
  const onAfterComplete = [middlewareHandlerStub3, middlewareHandlerStub4];

  const middlewarePayloadMock = getMiddlewarePayloadStub();

  let streamWriter: StreamWriter;

  beforeEach(() => {
    jest.clearAllMocks();
    streamWriter = new StreamWriter({ onBeforeComplete, onAfterComplete });
  });

  it('should take a MiddlewarePayload object in via pipe() and funnel it through all sync/async streamWriterHooks', async () => {
    await streamWriter.pipe(middlewarePayloadMock);

    expect(middlewareHandlerStub1).toHaveBeenCalledWith(middlewarePayloadMock);
    expect(middlewareHandlerStub2).toHaveBeenCalledWith(middlewarePayloadMock);
    expect(middlewareHandlerStub3).toHaveBeenCalledWith(middlewarePayloadMock);
    expect(middlewareHandlerStub4).toHaveBeenCalledWith(middlewarePayloadMock);
  });

  it('should execute all complete callbacks passed through the onComplete handler upon completion', async() => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    streamWriter.onComplete(callback1);
    streamWriter.onComplete(callback2);
    
    await streamWriter.pipe(middlewarePayloadMock);

    expect(callback1).toHaveBeenCalledWith(middlewarePayloadMock);
    expect(callback2).toHaveBeenCalledWith(middlewarePayloadMock);
  });

  it('should execute all onAfterComplete middleware functions before the onComplete hook is executed', async () => {
    const callback = jest.fn();

    streamWriter.onComplete(callback);
    await streamWriter.pipe(middlewarePayloadMock);

    const middlewareHandlerStub1Order = middlewareHandlerStub1.mock.invocationCallOrder[0];
    const middlewareHandlerStub2Order = middlewareHandlerStub2.mock.invocationCallOrder[0];
    const callbackOrder = callback.mock.invocationCallOrder[0];

    expect(middlewareHandlerStub1Order).toBeLessThan(middlewareHandlerStub2Order);
    expect(middlewareHandlerStub2Order).toBeLessThan(callbackOrder);
  });

  it('should execute all onBeforeComplete hooks after onComplete is executed', async () => {
    const callback = jest.fn();

    streamWriter.onComplete(callback);
    await streamWriter.pipe(middlewarePayloadMock);

    const middlewareHandlerStub3Order = middlewareHandlerStub3.mock.invocationCallOrder[0];
    const middlewareHandlerStub4Order = middlewareHandlerStub4.mock.invocationCallOrder[0];
    const callbackOrder = callback.mock.invocationCallOrder[0];

    expect(callbackOrder).toBeLessThan(middlewareHandlerStub3Order);
    expect(middlewareHandlerStub3Order).toBeLessThan(middlewareHandlerStub4Order);
  });

  it('should not execute the onComplete callback if any of the onBeforeComplete hooks returns undefined', async () => {
    const callback = jest.fn();
    const onBeforeCompleteFlawed = [...onBeforeComplete, middlewareHandlerStubFail];

    streamWriter = new StreamWriter({ onBeforeComplete: onBeforeCompleteFlawed, onAfterComplete });
    streamWriter.onComplete(callback);

    await streamWriter.pipe(middlewarePayloadMock);

    expect(callback).not.toHaveBeenCalled();
  });
});