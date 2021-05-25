import { MiddlewareHandler, MiddlewarePayload } from 'spaghettify/core/stream-writer'

/** */
export const DOMScriptsParser = (): MiddlewareHandler => {
  const parseScriptNodes = (element: HTMLElement): NodeListOf<HTMLScriptElement> => {
    return element.querySelectorAll('script');
  };

  return (payload: MiddlewarePayload): MiddlewarePayload => {
    const documentBody = payload.data!;
    const scriptElementNodeList = parseScriptNodes(documentBody);
    const scriptElements: HTMLScriptElement[] = [];

    scriptElementNodeList.forEach((scriptElement) => {
      const childScriptElement = payload.data?.ownerDocument.createElement('script') as HTMLScriptElement;
      childScriptElement.type = 'text/javascript';

      if (scriptElement.src) {
        childScriptElement.src = scriptElement.src;
      } else {
        childScriptElement.insertAdjacentText('afterbegin' , scriptElement.innerText);
      }
      
      scriptElements.push(childScriptElement);
      scriptElement.remove();
    });
    
    return {
      ...payload,
      scriptElements
    };
  };
};
