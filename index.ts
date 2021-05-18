import { Spaghettify } from './src';

export { Spaghettify };

Object.defineProperty(window, 'Spaghettify', {
  writable: false,
  enumerable: true,
  configurable: false,
  value: Spaghettify,
})
