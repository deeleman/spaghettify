import { MiddlewarePayload, MiddlewareHandler } from './stream-writer.types';

type StreamCompleteCallback = (stream: MiddlewarePayload) => void;

/** */
export class StreamWriter {
  private streamCompleteCallbacks: StreamCompleteCallback[] = [];

  constructor(private readonly middlewareHandlers: MiddlewareHandler[]) {}

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
    let streamPayload: MiddlewarePayload | undefined = payload;

    for (const middlewareHandler of this.middlewareHandlers) {
      streamPayload = await middlewareHandler(streamPayload!);

      if (streamPayload === void 0) {
        break;
      }
    }

    if (streamPayload !== void 0) {
      this.streamCompleteCallbacks.forEach((streamCompleteCallback) => streamCompleteCallback(streamPayload!));
    }
  }
}