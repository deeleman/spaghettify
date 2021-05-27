import { LoadProgressHandler } from './core';

/**  */
export type SpaghettifyConfig = {
  /**  */
  routes?: string[];
  /**  */
  enabled?: boolean;
  /**  */
  excludeByAttr?: string;
  /**  */
  persistAttr?: string;
  /**  */
  loadProgress?: boolean | LoadProgressHandler;
};
