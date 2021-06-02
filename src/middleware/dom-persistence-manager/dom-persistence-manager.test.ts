import { getMiddlewarePayloadStub } from 'spaghettify/core';
import { DOMPersistenceManager } from './dom-persistence-manager';

describe('DOMPersistenceManager', () => {
  const startDocumentStub = getMiddlewarePayloadStub(undefined, `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Spaghettify Empty Mock Document</title>
      </head>
      <body>
        <p class="test-element" data-persist="lorem">Persisted content on load.</p>
      </body>
    </html>`);

  it('should return the payload as is if no persistence attribute is configured', async () => {
    const handler = DOMPersistenceManager(startDocumentStub.data!);
    const payload = getMiddlewarePayloadStub();

    const output = await handler(payload);

    expect(output).toBe(payload);
  });

  it('should return the payload as is if persistence attribute is an empty string', async () => {
    const handler = DOMPersistenceManager(startDocumentStub.data!, '');
    const payload = getMiddlewarePayloadStub();

    const output = await handler(payload);

    expect(output).toBe(payload);
  });

  it('should replace DOM elements decorated with persistence attributes by elements persisted on load, if any', async () => {
    const handler = DOMPersistenceManager(startDocumentStub.data!, 'data-persist');
    const payload = getMiddlewarePayloadStub();

    const output = await handler(payload);

    const persistedElement = output?.data?.getElementsByClassName('test-element')[0];

    expect(persistedElement?.innerHTML).toEqual('Persisted content on load.');
  });

  it('should persist elements regardless the persisting attrbiute does not feature data- prefix', async () => {
    const handler = DOMPersistenceManager(startDocumentStub.data!, 'persist');
    const payload = getMiddlewarePayloadStub();

    const output = await handler(payload);

    const persistedElement = output?.data?.getElementsByClassName('test-element')[0];

    expect(persistedElement?.innerHTML).toEqual('Persisted content on load.');
  });

  it('should replace DOM elements decorated with persistence attributes by elements persisted after load, if any', async () => {
    const payload = getMiddlewarePayloadStub();

    // Upon first execution the middleware handler factory persists elements and returns a handler.
    const handler = DOMPersistenceManager(startDocumentStub.data!, 'persist');

    // We digest a payload for the first time: Elemets persisted upon first execution replace those in payload.
    const output = await handler(payload);

    // Some DOM elements marked to be persisted are then changed in the resulting document, emulating a change.
    const persistedElement = output?.data?.getElementsByClassName('test-element')[0] as Element;
    persistedElement.innerHTML = 'CHANGED persisted content';

    // The previously returned payload, now allocating a changed element, serves again as a payload
    const finalOutput = await handler(output!);

    // Traverses finalOutput and retrieves persisted element
    const persistedChangedElement = finalOutput?.data?.getElementsByClassName('test-element')[0];

    // Checks whether the rendered persisted element observes the latest changes
    expect(persistedChangedElement?.innerHTML).toEqual('CHANGED persisted content');
  });

  it('should throw if the payload data contains several elements with same persist attribute and distinct node name', async () => {
    const handler = DOMPersistenceManager(startDocumentStub.data!, 'data-persist');
    const malformedDocumentStub = getMiddlewarePayloadStub(undefined, `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Spaghettify Empty Mock Document</title>
        </head>
        <body>
          <div data-persist="lorem">Cloned persisted content with matching persist ID and node type.</div>
          <p data-persist="lorem">Persisted content.</p>
        </body>
      </html>`);

    expect(() => handler(malformedDocumentStub)).toThrow(/data\-persist.*lorem/i);
  });
});