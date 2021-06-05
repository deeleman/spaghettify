import { LoadProgressHandler } from './core';

/** Spaghettify optional configuration payload  */
export type SpaghettifyConfig = {
  /** 
   * Array of strings, supporting glob tokens, representin gthe links to be intercepted.  */
  routes?: string[];
  /**
   * Boolean flag that signals whether Spaghettify must be enabled or not.  */
  enabled?: boolean;
  /** 
   * String representing a data atribute, with or without data- prefix. 
   * Links decorated with it will be disregarded.  */
  excludeByAttr?: string;
  /** 
   * String representing a data atribute, with or without data- prefix. 
   * DOM elements decorated with it will be persisted across navigation and its changes will be observed.
   * */
  persistAttr?: string;
  /**
   * Load progress handler. If truthy, will enable built-in load progress visual cue.
   * If configured as a callback, will emit progress values through it.
   */
  loadProgress?: boolean | LoadProgressHandler;
};
