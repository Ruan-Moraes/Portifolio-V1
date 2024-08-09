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
      const isSettingsActiveDOM = document
        .querySelector('.settings')
        .classList.contains('settingActivated');
      const isMenuActiveDOM = document
        .querySelector('.header__links')
        .classList.contains('menuIsActivated');

      if (!isSettingsActiveDOM && !isMenuActiveDOM) {
        resetSettings();
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();

        return;
      }

      if (isSettingsActiveDOM) {
        resetSettings();
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();
      }

      if (isMenuActiveDOM) {
        animationMenu();
        activateMenu();
        showBlurMenu();
        changePageScrollingState();
      }
    }
  });
}
