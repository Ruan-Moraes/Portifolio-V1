'use strict';

import { changePageScrollingState, showBlurOnBody } from './others.mjs';
import { animationMenu, activateMenu, showBlurMenu } from './menu.mjs';

export default function settings() {
  const gearDOM = document.querySelector('#settingsButton');
  const exitSettingsButtonDOM = document.querySelector('#exitSettingsButton');
  const blurOnBodyDOM = document.querySelector('.blurOnBody');

  const elementsOfInteractions = [
    gearDOM,
    exitSettingsButtonDOM,
    blurOnBodyDOM,
  ];

  elementsOfInteractions.forEach((elementDOM) => {
    elementDOM.addEventListener('click', () => {
      CheckIfMenuIsActive();
      animationGear();
      showBlurOnBody();
      showSettings();
      disableTextSelection();
      changePageScrollingState();
    });

    elementDOM.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        CheckIfMenuIsActive();
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();
      }
    });
  });
}

function CheckIfMenuIsActive() {
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
  const gearDOM = document.querySelector('#settingsButton > .fa-gear');

  gearDOM.style.transform === 'rotate(360deg)'
    ? (gearDOM.style.transform = 'rotate(0deg)')
    : (gearDOM.style.transform = 'rotate(360deg)');
}

export function showSettings() {
  const settingsDOM = document.querySelector('.settings__modal');

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
