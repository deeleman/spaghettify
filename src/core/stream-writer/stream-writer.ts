import { MiddlewarePayload, MiddlewareHandler } from './stream-writer.types';

type StreamCompleteCallback = (stream: MiddlewarePayload) => void;

export class StreamWriter {
  private streamCompleteCallbacks: StreamCompleteCallback[] = [];

  constructor(private readonly middlewareHandlers: MiddlewareHandler[]) {}

  onComplete(streamCompleteCallback: StreamCompleteCallback): void {
    this.streamCompleteCallbacks.push(streamCompleteCallback);
  }

  async pipe(payload: MiddlewarePayload): Promise<void> {
    const streamPayload = await this.middlewareHandlers.reduce((updatedPayload, middlewareHandler) => {
      return middlewareHandler(updatedPayload);
    }, payload);

    this.streamCompleteCallbacks.forEach((streamCompleteCallback) => streamCompleteCallback(streamPayload));
  }
}