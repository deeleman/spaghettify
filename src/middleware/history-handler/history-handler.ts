import { MiddlewareHandler, MiddlewarePayload } from '../../core/stream-writer'
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
    historyEntries.replaceHead({
      payload,
      href: payload.anchor.href,
      title: payload.rawData?.title || '',
      visitedOn: Date.now(),
    });
    
    window.history.pushState({ visitedOn }, historyEntries.head.title!, href);

    return payload;
  };
};
