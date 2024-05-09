'use strict';

import { changePageScrollingState } from './others.mjs';

function menu() {
  const menu = document.querySelector('.header__menu');

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      animationMenu();
      activateMenu();
      showBlurMenu();
      changePageScrollingState();
    }
  });

  menu.addEventListener('click', () => {
    animationMenu();
    activateMenu();
    showBlurMenu();
    changePageScrollingState();
  });
}

export function animationMenu() {
  ['lineOne', 'lineTwo', 'lineThree'].forEach((lineClass) => {
    const line = document.querySelector(`.menu__${lineClass}`);

    line.classList.toggle(`${lineClass}IsActivated`);
  });
}

export function activateMenu() {
  const showMenu = document.querySelector('.header__links');

  showMenu.classList.toggle('menuIsActivated');
}

export function showBlurMenu() {
  const blurOnMain = document.querySelector('.blurOnMain');

  blurOnMain.classList.toggle('blurOnMainIsActivated');
}

export default menu;
