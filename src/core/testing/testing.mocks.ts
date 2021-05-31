import { AnchorEvent } from '../events-listener';
import { MiddlewarePayload } from '../stream-writer';

export const getAnchorStub = (href: string): HTMLAnchorElement => {
  const anchor = document.createElement('a');
  anchor.setAttribute('href', href);

  return anchor;
};

export const getAnchorEventStub = (): AnchorEvent => new Event('click') as AnchorEvent;

export const getRawDataStub = (): Document => {
  const responseDOMParser = new DOMParser();
  const rawDataMock = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Spaghettify Mock Document</title>
      </head>
      <body>
        <h1>Spaghettify Sandbox - Page mock</h1>
        <p>Lorem ipsum dolor sit amet, consectetur <a href="page-a.html">adipiscing elit</a>.</p>
        <script>function ping() { return 'pong'; }</script>
        <script type="text/javascript" src="foo.js"></script>
      </body>
    </html>`;
  return responseDOMParser.parseFromString(rawDataMock, 'text/html');
};

export const getPayloadStub = (): HTMLElement => getRawDataStub().body;

export const getMiddlewarePayloadStub = (href: string): MiddlewarePayload => {
  const anchor = getAnchorStub(href);
  const event = getAnchorEventStub();
  const rawData = getRawDataStub();
  const data = rawData.body;

  return { anchor, event, rawData, data };
};