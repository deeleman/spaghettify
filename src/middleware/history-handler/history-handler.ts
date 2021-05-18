import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

export const historyHandler = (): MiddlewareHandler => {
  return (payload: MiddlewarePayload): MiddlewarePayload => {

    // TODO: Replace this mock data by real implementation
    const data = document.createElement('div');
    data.innerHTML = '<h1>JavaScript DOM</h1>';

    return {
      ...payload,
      data,
    };
  };
};
