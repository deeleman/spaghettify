import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core'

/**
 * Parses the `MiddlewarePayload` payload for detecting inline scripts and 
 * reappends them into the returned document to ensure JavaSccript execution.
 * @returns A `MiddlewarePayload` object whose `data`  proeprty now features new SCRIPT DOM elements.
 */
export const DOMScriptsParser = (): MiddlewareHandler => {
  const parseScriptNodes = (element: HTMLElement): NodeListOf<HTMLScriptElement> => {
    return element.querySelectorAll('script');
  };

  return (payload: MiddlewarePayload): MiddlewarePayload => {
    const documentBody = payload.data!;
    const scriptElementNodeList = parseScriptNodes(documentBody);
    const scriptElements: HTMLScriptElement[] = [];

    scriptElementNodeList.forEach((scriptElement) => {
      const childScriptElement = payload.rawData?.createElement('script') as HTMLScriptElement;
      childScriptElement.type = 'text/javascript';

      if (scriptElement.src) {
        childScriptElement.src = scriptElement.src;
      } else {
        childScriptElement.insertAdjacentText('afterbegin' , scriptElement.innerText);
      }
      
      scriptElement.remove();
      scriptElements.push(childScriptElement);
    });

    scriptElements?.forEach((scriptElement) => payload.data!.appendChild(scriptElement));
    
    return payload;
  };
};
