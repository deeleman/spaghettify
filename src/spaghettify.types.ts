import { LoadProgressHandler } from './core';

/**  */
export type SpaghettifyConfig = {
  /**  */
  routes: string[];
  /**  */
  enabled: boolean;
  /**  */
  excludeByAttr?: string;
  /**  */
  loadProgress?: boolean | LoadProgressHandler;
  /**  */
  persistSelectors?: string[];
};
