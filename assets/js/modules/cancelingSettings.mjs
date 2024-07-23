'use strict';

import {
  changePageScrollingState,
  showBlurOnBody,
  getValuesInLocalStorage,
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

  const elementsCancel = [
    settingsCancelDOM,
    closeSettingsXmarkDOM,
    closeSettingsLineDOM,
  ];

  elementsCancel.forEach((element) => {
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
  });
}

export function resetSettings() {
  const selectedOptions = getValuesInLocalStorage('settings');

  const selectedItems = document.querySelectorAll('.selectedItem');

  setTimeout(() => {
    selectedItems[0].textContent = selectedOptions[0];
    selectedItems[1].textContent = selectedOptions[1];
    selectedItems[2].textContent = selectedOptions[2];
  }, 600);
}
