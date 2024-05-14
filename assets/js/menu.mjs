'use strict';

import { changePageScrollingState } from './others.mjs';

function menu() {
  const menuDOM = document.querySelector('.header__menu');

  menuDOM.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      animationMenu();
      activateMenu();
      showBlurMenu();
      changePageScrollingState();
    }
  });

  menuDOM.addEventListener('click', () => {
    animationMenu();
    activateMenu();
    showBlurMenu();
    changePageScrollingState();
  });
}

export function animationMenu() {
  ['lineOne', 'lineTwo', 'lineThree'].forEach((lineClass) => {
    const lineDOM = document.querySelector(`.menu__${lineClass}`);

    lineDOM.classList.toggle(`${lineClass}IsActivated`);
  });
}

export function activateMenu() {
  const showMenuDOM = document.querySelector('.header__links');

  showMenuDOM.classList.toggle('menuIsActivated');
}

export function showBlurMenu() {
  const blurOnMainDOM = document.querySelector('.blurOnMain');

  blurOnMainDOM.classList.toggle('blurOnMainIsActivated');
}

// * Exportando a função menu

export default menu;
