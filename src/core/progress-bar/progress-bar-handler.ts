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
