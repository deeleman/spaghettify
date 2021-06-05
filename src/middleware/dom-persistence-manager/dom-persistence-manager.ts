import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core';

const PERSIST_ATTR_PREFIX = 'data-';
const persistedElementsMap = new Map<string, Node>();

const persistElements = (targetElement: Element, persistAttr: string): void => {
  if (persistAttr === PERSIST_ATTR_PREFIX) {
    return;
  }

  const elementsToPersist = targetElement.querySelectorAll(`*[${persistAttr}]`);

  elementsToPersist.forEach((element) => {
    const elementPersistenceKey = element.getAttribute(persistAttr)!;

    if (persistedElementsMap.has(elementPersistenceKey)) {
      const persistedElement = persistedElementsMap.get(elementPersistenceKey);

      if (persistedElement !== void 0 && persistedElement.nodeName !== element.nodeName) {
        throw new Error(`There is more than 1 element with a "${persistAttr}" data attribute set to "${elementPersistenceKey}"".`);
      }

      const clonedPersistedElement = persistedElement?.cloneNode(true);
      persistedElementsMap.set(elementPersistenceKey, clonedPersistedElement!);
      element.replaceWith(clonedPersistedElement!);
    } else {
      const clonedPersistedElement = element?.cloneNode(true);
      persistedElementsMap.set(elementPersistenceKey, clonedPersistedElement);
      element.replaceWith(clonedPersistedElement!);
    }
  });
};

export const DOMPersistenceManager = (body: Element, persistAttribute?: string): MiddlewareHandler => {
  const sanitizedPersistAttr = persistAttribute?.startsWith(PERSIST_ATTR_PREFIX) ?
    persistAttribute :
    `${PERSIST_ATTR_PREFIX}${persistAttribute}`;

  persistElements(body, sanitizedPersistAttr);

  return (payload: MiddlewarePayload): MiddlewarePayload => {
    persistElements(payload.data!, sanitizedPersistAttr);

    return payload;
  };
};
