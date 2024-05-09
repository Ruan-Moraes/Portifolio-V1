'use strict';

import { changePageScrollingState } from './others.mjs';

import {
  animationGear,
  showBlurOnBody,
  showSettings,
  disableTextSelection,
} from './settings.mjs';

import { animationMenu, activateMenu, showBlurMenu } from './menu.mjs';

function menuAndSettings() {
  const blurOnBody = document.querySelector('.blurOnBody');

  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      const isSettingsActive = document
        .querySelector('.settings__modal')
        .classList.contains('settingActivated');
      const isMenuActive = document
        .querySelector('.header__links')
        .classList.contains('menuIsActivated');

      if (!isSettingsActive && !isMenuActive) {
        animationGear();
        showBlurOnBody(blurOnBody);
        showSettings();
        disableTextSelection();
        changePageScrollingState();

        return;
      }

      if (isSettingsActive) {
        animationGear();
        showBlurOnBody(blurOnBody);
        showSettings();
        disableTextSelection();
        changePageScrollingState();
      }

      if (isMenuActive) {
        animationMenu();
        activateMenu();
        showBlurMenu();
        changePageScrollingState();
      }
    }
  });
}

export default menuAndSettings;
