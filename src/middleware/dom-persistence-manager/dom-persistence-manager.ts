import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

const persistedElements = new Map<string, Element>();

const persistenceWatch = (elementPersistenceKey: string, element: Element): void => {
  const observer = new MutationObserver(() => {
    persistedElements.set(elementPersistenceKey, element);
  });
  
  observer.observe(element, { childList: true, subtree: true });
};

const persistElements = (targetElement: Element, persistAttr: string): void => {
  const elementsToPersist = targetElement.querySelectorAll(`*[${persistAttr}]`);

  elementsToPersist.forEach((element) => {
    let elementPersistenceKey = element.getAttribute(persistAttr)!;
    
    if (!persistedElements.has(elementPersistenceKey)) {
      persistedElements.set(elementPersistenceKey, element);
      persistenceWatch(elementPersistenceKey, element);
    } else {
      const persistedElement = persistedElements.get(elementPersistenceKey) as Element;

      if (persistedElement.nodeType !== element.nodeType) {
        throw new Error(`There is more than one element persisted with the "${persistAttr}" data attribute value.`);
      }

      element.replaceWith(persistedElement);
    }
  });
};

export const DOMPersistenceManager = (body: Element, persistAttribute: string = 'no-persist'): MiddlewareHandler => {
  const sanitizedPersistAttr = persistAttribute?.startsWith('data-') ? persistAttribute : `data-${persistAttribute}`;

  persistElements(body, sanitizedPersistAttr);

  return (payload: MiddlewarePayload): MiddlewarePayload => {
    if (payload.data !== void 0) {
      persistElements(payload.data, sanitizedPersistAttr);
    }

    return payload;
  };
};
