'use strict';

import { changePageScrollingState, showBlurOnBody } from './others.mjs';
import {
  animationGear,
  showSettings,
  disableTextSelection,
} from './settings.mjs';
import { animationMenu, activateMenu, showBlurMenu } from './menu.mjs';

function menuAndSettings() {
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
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();

        return;
      }

      if (isSettingsActive) {
        animationGear();
        showBlurOnBody();
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

// * Exportando a função menuAndSettings

export default menuAndSettings;
