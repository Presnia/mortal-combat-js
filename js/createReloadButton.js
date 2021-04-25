import { createElement } from './Helpers/index.js';

export const createReloadButton = () => {
  const reloadWrap = createElement('div', 'reloadWrap');
  const reloadButton = createElement('button', 'button');
  reloadButton.innerText = 'Restart';

  reloadButton.addEventListener('click', () => {
      window.location.reload();
    });

  reloadWrap.append(reloadButton);
  return reloadWrap;
};