import { Spaghettify, SpaghettifyConfig } from './src';

export { Spaghettify, SpaghettifyConfig };

Object.defineProperty(window, 'Spaghettify', {
  writable: false,
  enumerable: true,
  configurable: false,
  value: Spaghettify,
});
