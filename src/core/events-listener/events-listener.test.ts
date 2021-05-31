import { getPayloadStub, getAnchorEventStub } from '../testing';
import { EventsListener } from './events-listener';
import { EventsListenerSettings } from './events-listener.types';

describe('EventsListener', () => {
  const elementStub = getPayloadStub();
  const freshElementStub = getPayloadStub();

  const documentLink = elementStub.querySelector('a') as HTMLElement;
  const documentLinkAddListenerSpy = jest.spyOn(documentLink, 'addEventListener');
  const documentLinkRemoveListenerSpy = jest.spyOn(documentLink, 'removeEventListener');

  const freshDocumentLink = freshElementStub.querySelector('a') as HTMLElement;
  const freshDocumentLinkAddListenerSpy = jest.spyOn(freshDocumentLink, 'addEventListener');
  const freshDocumentLinkRemoveListenerSpy = jest.spyOn(freshDocumentLink, 'removeEventListener');

  const eventsListenerSettings: EventsListenerSettings = {
    element: elementStub,
    elementEvent: 'click',
    selector: 'a',
  };

  const eventsListener = new EventsListener(eventsListenerSettings);
  eventsListener.attachListeners(freshElementStub);

  const eventHandler1 = jest.fn();
  const eventHandler2 = jest.fn();

  eventsListener.onEvent((anchor, event) => eventHandler1(anchor, event));
  eventsListener.onEvent((anchor, event) => eventHandler2(anchor, event));

  it('should execute all event handlers registered via onEvent() when the listened elements dispatch the selected event', () => {
    documentLink.dispatchEvent(getAnchorEventStub());
    freshDocumentLink.dispatchEvent(getAnchorEventStub());
    
    expect(eventHandler1).toHaveBeenCalledTimes(2);
    expect(eventHandler2).toHaveBeenCalledTimes(2);
  });

  describe('should attach event listeners to all elements within an HTMLElement that match a given selector', () => {
    it('upon being instantiated', () => {
      expect(documentLinkAddListenerSpy).toHaveBeenCalledWith('click', expect.anything());
    });

    it('to any new HTMLElement passed through the attachListeners() method', () => {
      expect(freshDocumentLinkAddListenerSpy).toHaveBeenCalledWith('click', expect.anything());
    });
  });

  describe('should detach all event listeners attached to selected nodes upon running the detachListeners() method', () => {
    eventsListener.detachListeners();

    it('from selected nodes in the original HTMLElement pased on instantiation', () => {
      expect(documentLinkRemoveListenerSpy).toHaveBeenCalledWith('click', expect.anything());
    });

    it('from selected nodes in the follow up HTMLElement pased via attachListeners()', () => {
      expect(freshDocumentLinkRemoveListenerSpy).toHaveBeenCalledWith('click', expect.anything());
    });
  });
});