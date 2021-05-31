import { MiddlewareHandler, MiddlewarePayload } from '../../core/stream-writer'

const persistedElementsMap = new Map<string, Node>();

const observeElementChanges = (persistenceKey: string, element: Node): void => {
  element.addEventListener('change', () => {
    persistedElementsMap.set(persistenceKey, element!);
  });
}

const persistElements = (targetElement: Element, persistAttr: string): void => {
  const elementsToPersist = targetElement.querySelectorAll(`*[${persistAttr}]`);

  elementsToPersist.forEach((element) => {
    const elementPersistenceKey = element.getAttribute(persistAttr)!;

    if (persistedElementsMap.has(elementPersistenceKey)) {
      const persistedElement = persistedElementsMap.get(elementPersistenceKey);

      if (persistedElement !== void 0 && persistedElement.nodeType !== element.nodeType) {
        throw new Error(`There is more than 1 element with a "${persistAttr}" data attribute set to "${elementPersistenceKey}"".`);
      }

      const clonedPersistedElement = persistedElement?.cloneNode(true);
      observeElementChanges(elementPersistenceKey, persistedElement!);
      persistedElementsMap.set(elementPersistenceKey, clonedPersistedElement!);
      element.replaceWith(clonedPersistedElement!);
    } else {
      const clonedPersistedElement = element?.cloneNode(true);
      observeElementChanges(elementPersistenceKey, element!);
      persistedElementsMap.set(elementPersistenceKey, clonedPersistedElement);
      element.replaceWith(clonedPersistedElement!);
    }
  });
};

export const DOMPersistenceManager = (body: Element, persistAttribute = 'no-persist'): MiddlewareHandler => {
  const sanitizedPersistAttr = persistAttribute?.startsWith('data-') ? persistAttribute : `data-${persistAttribute}`;

  persistElements(body, sanitizedPersistAttr);

  return (payload: MiddlewarePayload): MiddlewarePayload => {
    persistElements(payload.data!, sanitizedPersistAttr);

    return payload;
  };
};
