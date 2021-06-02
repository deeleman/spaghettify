import { MiddlewarePayload } from 'spaghettify/core';

/** Represents a snapshot of History in the overall history Linked List */
export type HistoryEntry = {
  payload: Partial<MiddlewarePayload>;
  href: string;
  visitedOn: number; 
  title: string;
  prev?: HistoryEntry;
  next?: HistoryEntry;
};

/** Middleware utility class to represent a linked list with visited documents */
export class HistoryEntryList {
  head: HistoryEntry;

  constructor(window: Window) {
    const title = window.document.title;
    const href = window.location.href;
    const visitedOn = Date.now();

    this.head = {
      href,
      title,
      visitedOn,
      payload: {
        data: window.document.body
      }
    };
  }

  /**
   * Appends a new document to the linked list (or inserts a new head on a previous position). To be
   * executed whenever the user browses to a new page or, if returned back to a previous page, resumes navigation forward.
   * @param node History entry node object featuring navigation metadata
   * @returns A fully populated `HistoryEntry` now featuring `prev` and `next` properties.
   */
  replaceHead(node: HistoryEntry): HistoryEntry {
    node.prev = this.head;
    this.head.next = node;
    this.head = node;

    return node;
  }

  /**
   * Fetches the previous or next item in the History linked list taking into consideration the 
   * `visitedOn` value as demanded from the `PopStateEvent` event. 
   * @param eventState `PopStateEvent.state` value corresponding to the History document demanded.
   * @returns The next or previous `HistoryEntry` item in the History linked list or `null` if none.
   */
  retrieveHistoryEntry(eventState: { visitedOn: number }): HistoryEntry | null {
    const { visitedOn } = eventState;

    if (this.head.visitedOn > visitedOn && this.head.prev) {
      this.head = this.head.prev;
    } else if (this.head.visitedOn < visitedOn && this.head.next) {
      this.head = this.head.next;
    }

    return this.head;
  }
}
