'use strict';

import {
  changePageScrollingState,
  showBlurOnBody,
  getValuesLocalStorage,
} from './others.mjs';
import {
  animationGear,
  showSettings,
  disableTextSelection,
} from './settings.mjs';

export default function cancelingSettings() {
  const settingsCancelDOM = document.querySelector('#settingsCancel');
  const closeSettingsXmarkDOM = document.querySelector('#closeSettingsXmark');
  const closeSettingsLineDOM = document.querySelector('#closeSettingsLine');

  [settingsCancelDOM, closeSettingsXmarkDOM, closeSettingsLineDOM].forEach(
    (element) => {
      element.addEventListener('click', () => {
        resetSettings();
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();
      });

      element.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          resetSettings();
          animationGear();
          showBlurOnBody();
          showSettings();
          disableTextSelection();
          changePageScrollingState();
        }
      });
    }
  );
}

export function resetSettings() {
  const selectedOptions = getValuesLocalStorage('settings');

  const selectedItemsDOM = document.querySelectorAll('.selectedItem');

  setTimeout(() => {
    selectedItemsDOM[0].textContent = selectedOptions[0];
    selectedItemsDOM[1].textContent = selectedOptions[1];
    selectedItemsDOM[2].textContent = selectedOptions[2];
  }, 600);
}
