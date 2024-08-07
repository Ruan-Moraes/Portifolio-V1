'use strict';

import { changePageScrollingState, showBlurOnBody } from './others.mjs';
import { animationMenu, activateMenu, showBlurMenu } from './menu.mjs';

export default function settings() {
  const settingsButtonDOM = document.querySelector('#settingsButton');
  const blurOnBodyDOM = document.querySelector('.blurOnBody');

  settingsButtonDOM.addEventListener('click', () => {
    CheckIfMenuIsActive();
    animationGear();
    showBlurOnBody();
    showSettings();
    disableTextSelection();
    changePageScrollingState();
  });

  settingsButtonDOM.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      CheckIfMenuIsActive();
      animationGear();
      showBlurOnBody();
      showSettings();
      disableTextSelection();
      changePageScrollingState();
    }
  });

  blurOnBodyDOM.addEventListener('click', () => {
    CheckIfMenuIsActive();
    animationGear();
    showBlurOnBody();
    showSettings();
    disableTextSelection();
    changePageScrollingState();
  });
}

function CheckIfMenuIsActive() {
  const IsMenuActiveDOM = document
    .querySelector('.header__links')
    .classList.contains('menuIsActivated');

  if (IsMenuActiveDOM) {
    animationMenu();
    activateMenu();
    showBlurMenu();
    changePageScrollingState();
  }
}

export function animationGear() {
  const gearDOM = document.querySelector('#settingsButton > .fa-gear');

  gearDOM.style.transform === 'rotate(360deg)'
    ? (gearDOM.style.transform = 'rotate(0deg)')
    : (gearDOM.style.transform = 'rotate(360deg)');
}

export function showSettings() {
  const settingsDOM = document.querySelector('.settings');

  settingsDOM.classList.toggle('settingActivated');
}

export function disableTextSelection() {
  [
    document.querySelector('.header'),
    document.querySelector('.main'),
    document.querySelector('.footer'),
  ].forEach((element) => {
    element.style.userSelect === 'none'
      ? (element.style.userSelect = 'text')
      : (element.style.userSelect = 'none');
  });
}
