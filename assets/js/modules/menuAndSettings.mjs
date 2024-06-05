'use strict';

import { resetSettings } from './cancelingSettings.mjs';
import {
  animationGear,
  showSettings,
  disableTextSelection,
} from './settings.mjs';
import { animationMenu, activateMenu, showBlurMenu } from './menu.mjs';
import { changePageScrollingState, showBlurOnBody } from './others.mjs';

export default function menuAndSettings() {
  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      const isSettingsActive = document
        .querySelector('.settings')
        .classList.contains('settingActivated');
      const isMenuActive = document
        .querySelector('.header__links')
        .classList.contains('menuIsActivated');

      if (!isSettingsActive && !isMenuActive) {
        resetSettings();
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();

        return;
      }

      if (isSettingsActive) {
        resetSettings();
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
