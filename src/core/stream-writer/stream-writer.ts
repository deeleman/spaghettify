import { MiddlewarePayload, MiddlewareHandler } from './stream-writer.types';

type StreamCompleteCallback = (stream: MiddlewarePayload) => void;

type StreamWriterHooks = {
  onBeforeComplete: MiddlewareHandler[];
  onAfterComplete: MiddlewareHandler[];
}

/**
 * Core class that handles the reactive stream where each middleware function receives
 * the payload stream and passes it across to the next middleware function.
 */
export class StreamWriter {
  private streamCompleteCallbacks: StreamCompleteCallback[] = [];

  constructor(private readonly streamWriterHooks: StreamWriterHooks) { }

  /**
   * Takes callback functions that will be executed upon completion of all 
   * `onBeforeComplete` middleware hooks.
   * @param streamCompleteCallback A callback expecting a `MiddlewarePayload` in this paylaod, corresponding
   * to the current state of the digested middleware object after running all `onBeforeComplete` hooks.
   */
  onComplete(streamCompleteCallback: StreamCompleteCallback): void {
    this.streamCompleteCallbacks.push(streamCompleteCallback);
  }

  /**
   * Starts a new stream from a listened event.
   * @param payload `MiddlewarePayload` instance object that will be sequentally digested by all middleware hooks.
   */
  async pipe(payload: MiddlewarePayload): Promise<void> {
    const streamPayload = await this.processMiddleware(payload, this.streamWriterHooks.onBeforeComplete);

    if (streamPayload !== void 0) {
      this.streamCompleteCallbacks.forEach((streamCompleteCallback) => streamCompleteCallback(streamPayload!));
      await this.processMiddleware(streamPayload, this.streamWriterHooks.onAfterComplete);
    }
  }

  private async processMiddleware(
    payload: MiddlewarePayload,
    middlewareHandlers: MiddlewareHandler[],
  ): Promise<MiddlewarePayload | undefined> {
    let streamPayload: MiddlewarePayload | undefined = {...payload }; // Ensures Immutability

    for (const middlewareHandler of middlewareHandlers) {
      streamPayload = await middlewareHandler(streamPayload!);

      if (streamPayload === void 0) {
        break;
      }
    }

    return streamPayload;
  }
}