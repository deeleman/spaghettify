/* eslint-disable @typescript-eslint/no-magic-numbers */
import { HistoryEntryList } from './history-entry-list';

describe('HistoryEntryList', () => {
  const timestampMock = 1622584468866;
  jest.spyOn(globalThis.Date, 'now').mockImplementation(() => timestampMock);

  const window = globalThis.window;
  window.document.title = 'Start page';

  let historyEntryList: HistoryEntryList;

  beforeEach(() => {
    historyEntryList = new HistoryEntryList(window);
  });

  it('should store current window metadata as head entry in the History linked list on first instance', () => {
    expect(historyEntryList.head).toEqual({
      href: expect.any(String),
      title: 'Start page',
      visitedOn: timestampMock,
      payload: {
        data: window.document.body
      },
      next: void 0,
      prev: void 0,
    });
  });

  it('should retrieve from the History linked list the previous element if the date passed is previous to head visitedOn', () => {
    historyEntryList.replaceHead({
      payload: {},
      href: 'foo.html',
      visitedOn: timestampMock + 10_000,
      title: 'Second entry',
    });

    expect(historyEntryList.head.prev?.title).toEqual('Start page')
  });

  it('should retrieve from the History linked list the next element if the date passed is previous to head visitedOn', () => {
    // We browse to a second page
    historyEntryList.replaceHead({
      payload: {},
      href: 'foo.html',
      visitedOn: timestampMock + 10_000,
      title: 'Second entry',
    });

    // We browse to a second page
    historyEntryList.replaceHead({
      payload: {},
      href: 'bar.html',
      visitedOn: timestampMock + 20_000,
      title: 'Third entry',
    });

    // We go back to the previous page
    historyEntryList.retrieveHistoryEntry({ visitedOn: timestampMock + 10_000 });

    // We bounce back to next page again
    historyEntryList.retrieveHistoryEntry({ visitedOn: timestampMock + 20_000 });

    expect(historyEntryList.head.title).toEqual('Third entry')
  });
});