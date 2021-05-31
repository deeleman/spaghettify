import { getMiddlewarePayloadStub } from 'spaghettify/core/testing';
import { linkInterceptor } from './link-interceptor';

describe('linkInterceptor', () => {
  describe('should return a MiddlewarePayload handler', () => {
    describe('that returns the MiddlewarePayload as is if the href anchor prop matches any of the given routes', () => {
      it('when the routes match an anchor by document filename regardless extension', () => {
        const payloadStub = getMiddlewarePayloadStub('page/foo.html');
        const linkInterceptorHandler = linkInterceptor(['**/foo.*']);
  
        expect(linkInterceptorHandler(payloadStub)).toBe(payloadStub);
      });

      it('when the routes match an anchor by path and file extension', () => {
        const payloadStub = getMiddlewarePayloadStub('page/foo.html');
        const linkInterceptorHandler = linkInterceptor(['page/*.html']);
        
        expect(linkInterceptorHandler(payloadStub)).toBe(payloadStub);
      });

      it('when the routes match an anchor by folder and file extension', () => {
        const payloadStub = getMiddlewarePayloadStub('page/foo.html');
        const linkInterceptorHandler = linkInterceptor(['page/**/*.html']);
  
        expect(linkInterceptorHandler(payloadStub)).toBe(payloadStub);
      });

      it('when the routes match an anchor by several rules combined', () => {
        const payloadStub = getMiddlewarePayloadStub('page/foo.html');
        const linkInterceptorHandler = linkInterceptor([
          '**/foo.*',
          'page/*.html',
          'page/**/*.html',
        ]);
  
        expect(linkInterceptorHandler(payloadStub)).toBe(payloadStub);
      });
    });

    it('that returns an undefined MiddlewarePayload if the anchor href prop does not match any of the given routes', () => {
      const payloadStub = getMiddlewarePayloadStub('other/file.html');
      const linkInterceptorHandler1 = linkInterceptor(['**/foo.*']);
      const linkInterceptorHandler2 = linkInterceptor(['page/*.html']);
      const linkInterceptorHandler3 = linkInterceptor(['page/**/*.html']);
      const linkInterceptorHandlerAll = linkInterceptor([
        '**/foo.*',
        'page/*.html',
        'page/**/*.html',
      ]);

      expect(linkInterceptorHandler1(payloadStub)).toBeUndefined();
      expect(linkInterceptorHandler2(payloadStub)).toBeUndefined();
      expect(linkInterceptorHandler3(payloadStub)).toBeUndefined();
      expect(linkInterceptorHandlerAll(payloadStub)).toBeUndefined();
    });
    
    it('that prevents the passed event default behavior if the anchor href matches a route', () => {
      const payloadStub = getMiddlewarePayloadStub('page/foo.html');
      const preventDefaultSpy = jest.spyOn(payloadStub.event, 'preventDefault');

      const linkInterceptorHandler = linkInterceptor(['**/foo.*']);
      linkInterceptorHandler(payloadStub);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });
  
});