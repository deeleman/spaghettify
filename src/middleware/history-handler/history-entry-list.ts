import { MiddlewarePayload } from '../../core';

export type HistoryEntry = {
  payload: Partial<MiddlewarePayload>;
  href: string;
  visitedOn: number; 
  title?: string;
  prev?: HistoryEntry;
  next?: HistoryEntry;
};

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

    this.replaceHead(this.head);
  }

  replaceHead(node: HistoryEntry): HistoryEntry {
    node.prev = this.head;
    this.head.next = node;
    this.head = node;

    return node;
  }

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
