'use strict';

import { changePageScrollingState, showBlurOnBody } from './others.mjs';
import {
  animationGear,
  showSettings,
  disableTextSelection,
} from './settings.mjs';

export default function cancelingSettings() {
  const settingsCancelDOM = document.querySelector('#settingsCancel');

  settingsCancelDOM.addEventListener('click', () => {
    getTheSettings();
    animationGear();
    showBlurOnBody();
    showSettings();
    disableTextSelection();
    changePageScrollingState();
  });
}

function getTheSettings() {
  const selectedItems = document.querySelectorAll('.selectedItem');

  const settings = {
    theme: selectedItems[0].textContent,
    color: selectedItems[1].textContent,
    language: selectedItems[2].textContent,
  };

  resetSettings(settings);
}

function resetSettings(settings) {
  const selectedItems = document.querySelectorAll('.selectedItem');

  // TODO - Resetar as configurações
}
