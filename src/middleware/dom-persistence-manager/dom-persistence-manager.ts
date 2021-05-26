import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

const persistedElementsMap = new Map<string, Node>();

const persistElements = (targetElement: Element, persistAttr: string): void => {
  const elementsToPersist = targetElement.querySelectorAll(`*[${persistAttr}]`);

  elementsToPersist.forEach((element) => {
    const elementPersistenceKey = element.getAttribute(persistAttr)!;

    if (persistedElementsMap.has(elementPersistenceKey)) {
      const persistedElement = persistedElementsMap.get(elementPersistenceKey);

      if (persistedElement !== void 0 && persistedElement.nodeType !== element.nodeType) {
        throw new Error(`There is more than one element with the "${persistAttr}" data attribute set to "${elementPersistenceKey}"".`);
      }

      element.replaceWith(persistedElement!);
    } else {
      persistedElementsMap.set(elementPersistenceKey, element);
    }
  });
};

export const DOMPersistenceManager = (body: Element, persistAttribute: string = 'no-persist'): MiddlewareHandler => {
  const sanitizedPersistAttr = persistAttribute?.startsWith('data-') ? persistAttribute : `data-${persistAttribute}`;

  persistElements(body, sanitizedPersistAttr);

  return (payload: MiddlewarePayload): MiddlewarePayload => {
    persistElements(payload.data!, sanitizedPersistAttr);

    return payload;
  };
};
