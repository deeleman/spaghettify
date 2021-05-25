import { MiddlewarePayload, MiddlewareHandler } from './stream-writer.types';

type StreamCompleteCallback = (stream: MiddlewarePayload) => void;

type StreamWriterHooks = {
  onBeforeComplete: MiddlewareHandler[];
  onAfterComplete: MiddlewareHandler[];
}

/** */
export class StreamWriter {
  private streamCompleteCallbacks: StreamCompleteCallback[] = [];

  constructor(private readonly streamWriterHooks: StreamWriterHooks) { }

  /**
   * 
   * @param streamCompleteCallback 
   */
  onComplete(streamCompleteCallback: StreamCompleteCallback): void {
    this.streamCompleteCallbacks.push(streamCompleteCallback);
  }

  /**
   * 
   * @param payload 
   */
  async pipe(payload: MiddlewarePayload): Promise<void> {
    let streamPayload = await this.processMiddleware(payload, this.streamWriterHooks.onBeforeComplete);

    if (streamPayload !== void 0) {
      this.streamCompleteCallbacks.forEach((streamCompleteCallback) => streamCompleteCallback(streamPayload!));
      await this.processMiddleware(streamPayload, this.streamWriterHooks.onAfterComplete);
    }
  }

  private async processMiddleware(
    payload: MiddlewarePayload,
    middlewareHandlers: MiddlewareHandler[],
  ): Promise<MiddlewarePayload | undefined> {
    let streamPayload: MiddlewarePayload | undefined = payload;

    for (const middlewareHandler of middlewareHandlers) {
      streamPayload = await middlewareHandler(streamPayload!);

      if (streamPayload === void 0) {
        break;
      }
    }

    return streamPayload;
  }
}