'use strict';

import {
  changePageScrollingState,
  showBlurOnBody,
  getValuesInLocalStorage,
  setValuesInLocalStorage,
} from './others.mjs';
import {
  animationGear,
  showSettings,
  disableTextSelection,
} from './settings.mjs';
import { whatIsTheCurrentColor } from './others.mjs';
import changeEachTextToEnglish from './translates/EN-US/changeEachTextToEnglish.mjs';
import changeEachTextToPortuguese from './translates/PT-BR/changeEachTextToPortuguese.mjs';

window.addEventListener('DOMContentLoaded', () => {
  const selectedOptions = getValuesInLocalStorage('settings');

  if (!selectedOptions) {
    applyLanguage(window.navigator.language);

    return;
  }

  const selectedThemeValue = selectedOptions[0];
  const selectedColorValue = selectedOptions[1];
  const selectedLanguageValue = selectedOptions[2];

  applyTheme(selectedThemeValue);
  applyColor(selectedColorValue);
  applyLanguage(selectedLanguageValue);
});

// * Lógica para aplicar as configurações selecionadas

export default function applyingSettings() {
  const settingsApplyDOM = document.querySelector('#settingsApply');

  settingsApplyDOM.addEventListener('click', () => {
    const selectedOptions = document.querySelectorAll('.selectedItem');

    const selectedTheme = selectedOptions[0].textContent;
    const selectedColor = selectedOptions[1].textContent;
    const selectedLanguage = selectedOptions[2].textContent;

    applyTheme(selectedTheme);
    applyColor(selectedColor);
    applyLanguage(selectedLanguage);

    setValuesInLocalStorage(
      'settings',
      selectedTheme,
      selectedColor,
      selectedLanguage
    );

    animationGear();
    showBlurOnBody();
    showSettings();
    disableTextSelection();
    changePageScrollingState();
  });
}

// * Lógica para mudar o tema do site

function applyTheme(selectedThemeValue) {} // TODO - Andamento

// * Lógica para mudar as cores do site

function applyColor(selectedColorValue) {
  const selectedColor = whatIsTheHexadecimalColorInTheTable(selectedColorValue);
  const currentColor = whatIsTheCurrentColor();

  if (selectedColor !== currentColor) {
    changeColors(selectedColor, currentColor);
    changeColorsBackground(selectedColor, currentColor);
  }

  function whatIsTheHexadecimalColorInTheTable(selectedColorValue) {
    const colorTable = {
      '#FF5F5A': 'quaternary',
      '#FFBE2E': 'quinary',
      '#2ACA44': 'senary',
      '#2E60F2': 'septenary',
      '#662EF2': 'octonary',
    };

    return colorTable[treatValueOfSelectedColor(selectedColorValue)];
  }

  function treatValueOfSelectedColor(selectedColorValue) {
    return selectedColorValue.match(/#[0-9A-Fa-f]{6}/g)[0];
  }

  function changeColors(selectedColor, currentColor) {
    const colorBase = document.querySelectorAll(`.${currentColor}__color`);
    const colorHover = document.querySelectorAll(
      `.${currentColor}__color--hover`
    );

    colorBase.forEach((element) => {
      element.classList.remove(`${currentColor}__color`);
      element.classList.add(`${selectedColor}__color`);
    });

    colorHover.forEach((element) => {
      element.classList.remove(`${currentColor}__color--hover`);
      element.classList.add(`${selectedColor}__color--hover`);
    });
  }

  function changeColorsBackground(selectedColor, currentColor) {
    const colorBackgroundBase = document.querySelectorAll(
      `.${currentColor}__backgroundColor`
    );
    const colorBackgroudHover = document.querySelectorAll(
      `.${currentColor}__backgroundColor--hover`
    );
    const colorBackgroundSelected = document.querySelectorAll(
      `.${currentColor}__backgroundColor--selected`
    );
    const colorBackgroundLessLightHover = document.querySelectorAll(
      `.${currentColor}__backgroundColor--lessLightHover`
    );
    const colorBackgroundMenuHover = document.querySelectorAll(
      `.${currentColor}__backgroundColor--menuHover`
    );
    const colorBackgroundMenuActive = document.querySelectorAll(
      `.${currentColor}__backgroundColor--menuActive`
    );

    colorBackgroundBase.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor`);
      element.classList.add(`${selectedColor}__backgroundColor`);
    });

    colorBackgroudHover.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor--hover`);
      element.classList.add(`${selectedColor}__backgroundColor--hover`);
    });

    colorBackgroundSelected.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor--selected`);
      element.classList.add(`${selectedColor}__backgroundColor--selected`);
    });

    colorBackgroundLessLightHover.forEach((element) => {
      element.classList.remove(
        `${currentColor}__backgroundColor--lessLightHover`
      );
      element.classList.add(
        `${selectedColor}__backgroundColor--lessLightHover`
      );
    });

    colorBackgroundMenuHover.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor--menuHover`);
      element.classList.add(`${selectedColor}__backgroundColor--menuHover`);
    });

    colorBackgroundMenuActive.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor--menuActive`);
      element.classList.add(`${selectedColor}__backgroundColor--menuActive`);
    });
  }
}

// * Lógica para mudar o idioma do site

function applyLanguage(selectedLanguageValue) {
  if (selectedLanguageValue === 'pt-BR') {
    changeTextToSelectedLanguage(selectedLanguageValue);

    return;
  }

  if (selectedLanguageValue === 'en-US') {
    changeTextToSelectedLanguage(selectedLanguageValue);

    return;
  }

  changeTextToSelectedLanguage(
    selectedLanguageValue === 'Português' ? 'pt-BR' : 'en-US'
  );

  function changeTextToSelectedLanguage(selectedLanguage) {
    document.querySelector('html').setAttribute('lang', selectedLanguage);

    if (selectedLanguage === 'en-US') {
      changeEachTextToEnglish();
    }

    if (selectedLanguage === 'pt-BR') {
      changeEachTextToPortuguese();
    }
  }
}

// * Lógica para salvar as configurações selecionadas
