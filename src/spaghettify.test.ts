import { Spaghettify, defaultOptions } from './spaghettify';

describe('Spaghettify', () => {
  const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

  beforeEach(() => {
    addEventListenerSpy.mockClear();
  });

  it('should instrument itself upon the DOMContentLoaded event if enabled', () => {
    new Spaghettify();

    expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });

  it('should not instrument itself upon the DOMContentLoaded event if disabled',  () => {
    new Spaghettify({ enabled: false });

    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  it('should fallback to default options if payload is null or undefined', () => {
    const spaghettify = new Spaghettify();

    expect(spaghettify.options).toEqual(defaultOptions);
  });

  it('should compound up all options with default ones if options payload is partial', () => {
    const payload = { routes: ['foo.html'], loadProgress: true };
    const expectedOptions = {...defaultOptions, ...payload};

    const spaghettify = new Spaghettify(payload);

    expect(spaghettify.options).toEqual(expectedOptions);
  });

  it('should compose an anchor selector featuring an exclusion selector attribute, if provided', () => {
    const spaghettify = new Spaghettify({ excludeByAttr: 'data-skip-link' });

    expect(spaghettify.anchorSelector).toEqual('a:not([data-skip-link])');
  });

  it('should compose a generic anchor selector if an exclusion selector attribute is not provided', () => {
    const spaghettify = new Spaghettify();

    expect(spaghettify.anchorSelector).toEqual('a');
  });

  it('should append a data- prefix to generic anchor selector if an exclusion selector attribute does not include it', () => {
    const spaghettify = new Spaghettify({ excludeByAttr: 'skip-link' });

    expect(spaghettify.anchorSelector).toEqual('a:not([data-skip-link])');
  });
});