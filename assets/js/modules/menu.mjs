'use strict';

import { changePageScrollingState } from './others.mjs';

export default function menu() {
  const hamburgerButtonDOM = document.querySelector('#menuButton');

  hamburgerButtonDOM.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      animationMenu();
      activateMenu();
      showBlurMenu();
      changePageScrollingState();
    }
  });

  hamburgerButtonDOM.addEventListener('click', () => {
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
