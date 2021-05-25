import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'
import { HistoryEntryList } from './history-entry-list';

export const historyHandler = (window: Window): MiddlewareHandler => {
  const historyEntries = new HistoryEntryList(window);

  const { href, visitedOn, title } = historyEntries.head;
  window.history.replaceState({ visitedOn }, title || '', href);

  const onPopState = (event: PopStateEvent) => {
    const historyEntry = historyEntries.retrieveHistoryEntry(event.state);
    window.document.body = historyEntry!.payload.data!;
  };
  
  window.addEventListener('popstate', onPopState);
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('popstate', onPopState);
  });

  return (payload: MiddlewarePayload): MiddlewarePayload => {
    const title = payload.rawData?.title || '';
    const href = payload.anchor.href;
    const visitedOn = Date.now();

    historyEntries.replaceHead({
      payload,
      href,
      title,
      visitedOn,
    });

    window.history.pushState({ visitedOn }, title, href);

    return payload;
  };
};
