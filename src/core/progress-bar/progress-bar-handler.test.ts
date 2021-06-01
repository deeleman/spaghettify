import { getRawDataStub } from '../testing';
import { progressBarHandler, PROGRESS_BAR_TRANSITION_MS } from './progress-bar-handler';
import { LoadProgressHandler } from './progress-bar.types';

describe('progressBarHandler', () => {
  it('should return an undefined handler if loadProgressHandler is falsey', () => {
    const handler =  progressBarHandler(getRawDataStub(), false);
    expect(handler).toBeUndefined();
  });

  it('should return an undefined handler if loadProgressHandler is undefined', () => {
    const handler =  progressBarHandler(getRawDataStub());
    expect(handler).toBeUndefined();
  });

  it('should return the same callback as a handler if provided', () => {
    const customHandler = jest.fn();
    const handler =  progressBarHandler(getRawDataStub(), customHandler);
    expect(handler).toBe(customHandler);
  });

  it('should append a load bar to the provided DOM when the loadProgressHandler callback receives a 0 value', () => {
    const document = getRawDataStub();
    const handler =  progressBarHandler(document, true) as LoadProgressHandler;
    handler(0);

    const progressBar = document.getElementById('__spaghettifyProgressBar');
    expect(progressBar).not.toBeNull();
    expect(progressBar?.style.width).toEqual('0%');
  });

  it('should refresh the builtin progress bar when the returned handler is run with a progres value', () => {
    const document = getRawDataStub();
    const handler =  progressBarHandler(document, true) as LoadProgressHandler;
    handler(0);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    handler(55);

    const progressBar = document.getElementById('__spaghettifyProgressBar');
    expect(progressBar).not.toBeNull();
    expect(progressBar?.style.width).toEqual('55%');
  });

  it('should asynchronously wipe out the progres bar from the DOM when progress is complete and transitions are done', () => {
    jest.useFakeTimers();

    const document = getRawDataStub();
    const handler =  progressBarHandler(document, true) as LoadProgressHandler;
    handler(0);
    const progressBar = document.getElementById('__spaghettifyProgressBar');
    expect(progressBar).not.toBeNull();

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    handler(100);
    jest.advanceTimersByTime(PROGRESS_BAR_TRANSITION_MS + 1);

    expect(document.getElementById('__spaghettifyProgressBar')).toBeNull();
  });
});