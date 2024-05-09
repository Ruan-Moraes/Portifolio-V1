'use strict';

import { changePageScrollingState } from './others.mjs';

function settings() {
  const gear = document.querySelector('.container__gear');
  const exitSettingsButton = document.querySelector(
    '.settings__header > .fa-xmark'
  );
  const blurOnBody = document.querySelector('.blurOnBody');

  [gear, exitSettingsButton, blurOnBody].forEach((element) => {
    element.addEventListener('click', () => {
      CheckIfMenuIsActive();
      animationGear();
      showBlurOnBody(blurOnBody);
      showSettings();
      disableTextSelection();
      changePageScrollingState();
    });

    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        CheckIfMenuIsActive();
        animationGear();
        showBlurOnBody(blurOnBody);
        showSettings();
        disableTextSelection();
        changePageScrollingState();
      }
    });

    const cancelSettings = document.querySelector('#settingsCancel');

    cancelSettings.addEventListener('click', () => {
      // function reset
      animationGear();
      showBlurOnBody(blurOnBody);
      showSettings();
      disableTextSelection();
      changePageScrollingState();
    });
  });
}

export function CheckIfMenuIsActive() {
  const IsMenuActive = document
    .querySelector('.header__links')
    .classList.contains('menuIsActivated');

  if (IsMenuActive) {
    animationMenu();
    activateMenu();
    showBlurMenu();
    changePageScrollingState();
  }
}

export function animationGear() {
  const gear = document.querySelector('.container__gear > .fa-gear');

  gear.style.transform === 'rotate(360deg)'
    ? (gear.style.transform = 'rotate(0deg)')
    : (gear.style.transform = 'rotate(360deg)');
}

export function showBlurOnBody(blurOnBody) {
  blurOnBody.classList.toggle('blurOnBodyIsActivated');
}

export function showSettings() {
  const settings = document.querySelector('.settings__modal');

  settings.classList.toggle('settingActivated');
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

export default settings;
