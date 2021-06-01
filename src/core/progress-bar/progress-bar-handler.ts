import { LoadProgressHandler } from './progress-bar.types';

export const PROGRESS_BAR_TRANSITION_MS = 200;
const MILLISECONDS = 1000;

const generateProgressBar = (document: Document): HTMLDivElement => {
  const divElement = document.createElement('div');
  divElement.id = '__spaghettifyProgressBar';
  divElement.style.position = 'fixed';
  divElement.style.top = '0';
  divElement.style.left = '0';
  divElement.style.width = '0%';
  divElement.style.height = '3px';
  divElement.style.transitionProperty = 'width';
  divElement.style.transitionDuration = `${PROGRESS_BAR_TRANSITION_MS/MILLISECONDS}s`;
  divElement.style.backgroundColor = '#c90000';

  document.body.appendChild(divElement);

  return divElement;
}

/**
 * Core function handler that wraps serves as a factory function to return download progress handlers.
 * @param document DOM element where the progress bar DOM node will be appended.
 * @param loadProgressHandler Can be either a boolean value which will enable the
 * built-in progress handler or a custom progress handler that will override the native one.
 * @returns Either the native load handler, the user-defined one or undefined if no load handler settings are supplied.
 */
export const progressBarHandler = (
  document: Document,
  loadProgressHandler?: LoadProgressHandler | boolean
  ): LoadProgressHandler | undefined => {
  if (loadProgressHandler === void 0 || loadProgressHandler === false) {
    return;
  }

  const LOAD_COMPLETE_PERCENTAGE = 100;
  let progressBarElement: HTMLDivElement;

  const builtinLoadProgressHandler = (loadProgress: number): void => {
    if (loadProgress === 0) {
      progressBarElement = generateProgressBar(document);
    }

    progressBarElement.style.width = `${loadProgress}%`;

    if (loadProgress === LOAD_COMPLETE_PERCENTAGE) {
      setTimeout(() => { progressBarElement.remove(); }, PROGRESS_BAR_TRANSITION_MS - 1);
    }
  };

  return typeof loadProgressHandler === 'boolean' ? builtinLoadProgressHandler : loadProgressHandler;
}
