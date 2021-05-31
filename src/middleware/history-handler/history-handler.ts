import { MiddlewareHandler, MiddlewarePayload } from '../../core/stream-writer'
import { HistoryEntryList } from './history-entry-list';

/**
 * History handling middleware, internally leveraging the DOM History API to provide back
 * and forth navigation support with automatic URL and title replacement.
 * @param window Current Window instance so the module can interact with the History API.
 */
export const historyHandler = (window: Window): MiddlewareHandler => {
  const historyEntries = new HistoryEntryList(window);

  const historyHead = historyEntries.head;
  window.history.replaceState({ visitedOn: historyHead.visitedOn }, historyHead.title, historyHead.href);

  const onPopState = (event: PopStateEvent) => {
    const historyEntry = historyEntries.retrieveHistoryEntry(event.state);
    window.document.body = historyEntry!.payload.data!;
    window.document.title = historyEntry?.title || '';
  };
  
  window.addEventListener('popstate', onPopState);
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('popstate', onPopState);
  });

  return (payload: MiddlewarePayload): MiddlewarePayload => {
    const visitedOn = Date.now();
    const href = payload.anchor.href;
    const title = payload.rawData?.title || '';

    historyEntries.replaceHead({
      payload,
      href,
      title,
      visitedOn,
    });
    
    window.history.pushState({ visitedOn }, title, href);
    window.document.title = title;

    return payload;
  };
};
