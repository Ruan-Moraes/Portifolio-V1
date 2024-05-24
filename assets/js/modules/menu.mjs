'use strict';

import { changePageScrollingState } from './others.mjs';

export default function menu() {
  const hamburgerButton = document.querySelector('#menuButton');

  hamburgerButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      animationMenu();
      activateMenu();
      showBlurMenu();
      changePageScrollingState();
    }
  });

  hamburgerButton.addEventListener('click', () => {
    animationMenu();
    activateMenu();
    showBlurMenu();
    changePageScrollingState();
  });
}

export function animationMenu() {
  const linesDOM = ['lineOne', 'lineTwo', 'lineThree'];

  linesDOM.forEach((line) => {
    const lineDOM = document.querySelector(`.hamburgerButton__${line}`);

    lineDOM.classList.toggle(`${line}IsActivated`);
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
