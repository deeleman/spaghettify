import { Spaghettify } from './src';


export const spa = Spaghettify;

Object.defineProperty(window, 'Spaghettify', {
  writable: false,
  enumerable: true,
  configurable: false,
  value: Spaghettify,
});
