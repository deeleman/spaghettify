import { LoadProgressHandler } from './progress-bar.types';

export const PROGRESS_BAR_TRANSITION_MS = 200;

const generateProgressBar = (document: Document): HTMLDivElement => {
  const divElement = document.createElement('div');
  divElement.id = '__spaghettifyProgressBar';
  divElement.style.position = 'absolute';
  divElement.style.top = '0';
  divElement.style.left = '0';
  divElement.style.width = '0%';
  divElement.style.height = '3px';
  divElement.style.transitionProperty = 'width';
  divElement.style.transitionDuration = `${PROGRESS_BAR_TRANSITION_MS/1000}s`;
  divElement.style.backgroundColor = '#c90000';

  document.body.appendChild(divElement);

  return divElement;
}

export const progressBarHandler = (document: Document, loadProgress?: LoadProgressHandler | boolean): LoadProgressHandler | undefined => {
  if (loadProgress === void 0 || loadProgress === false) {
    return;
  }

  let progressBarElement: HTMLDivElement;

  const builtinLoadProgressHandler = (loadProgress: number): void => {
    if (loadProgress === 0) {
      progressBarElement = generateProgressBar(document);
    }

    progressBarElement.style.width = `${loadProgress}%`;

    if (loadProgress === 100) {
      setTimeout(() => { progressBarElement.remove(); }, PROGRESS_BAR_TRANSITION_MS - 1);
    }
  };

  return typeof loadProgress === 'boolean' ? builtinLoadProgressHandler : loadProgress;
}
