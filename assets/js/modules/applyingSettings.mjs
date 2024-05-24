'use strict';

import { changePageScrollingState, showBlurOnBody } from './others.mjs';
import {
  animationGear,
  showSettings,
  disableTextSelection,
} from './settings.mjs';

window.addEventListener('DOMContentLoaded', () => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  if (!settings) {
    return;
  }

  const selectedThemeValue = settings[0];
  const selectedColorValue = settings[1];
  const selectedLanguageValue = settings[2];

  applyTheme(selectedThemeValue);
  applyColor(selectedColorValue);
  applyLanguage(selectedLanguageValue);
});

export default function applyingSettings() {
  const settingsApplyDOM = document.querySelector('#settingsApply');

  settingsApplyDOM.addEventListener('click', () => {
    const selectedOptions = document.querySelectorAll('.selectedItem');

    const selectedTheme = selectedOptions[0].textContent;
    const selectedColor = selectedOptions[1].textContent;
    const selectedLanguage = selectedOptions[2].textContent;

    savingToLocalStorage(selectedTheme, selectedColor, selectedLanguage);

    applyTheme(selectedTheme);
    applyColor(selectedColor);
    applyLanguage(selectedLanguage);

    animationGear();
    showBlurOnBody();
    showSettings();
    disableTextSelection();
    changePageScrollingState();
  });
}

function savingToLocalStorage(selectedTheme, selectedColor, selectedLanguage) {
  const settings = [selectedTheme, selectedColor, selectedLanguage];

  localStorage.setItem('settings', JSON.stringify(settings));

  return JSON.parse(localStorage.getItem('settings'));
}

// * Lógica para mudar o tema do site

function applyTheme(selectedThemeValue) {} // TODO - Andamento

// * Lógica para mudar as cores do site

function applyColor(selectedColorValue) {
  const selectedColor = whatIsTheHexadecimalColorInTheTable(selectedColorValue);
  const currentColor = whatIsTheCurrentColor();

  if (selectedColor === currentColor) {
    return;
  }

  if (selectedColor !== currentColor) {
    changeColors(selectedColor, currentColor);
    changeColorsBackground(selectedColor, currentColor);
  }
}

function whatIsTheHexadecimalColorInTheTable(selectedColorValue) {
  const colorTable = {
    '#FF5F5A': 'quaternary',
    '#FFBE2E': 'quinary',
    '#2ACA44': 'senary',
    '#2E60F2': 'septenary',
    '#662EF2': 'octonary',
  };

  const colorHexadecimal = treatValueOfSelectedColor(selectedColorValue);
  const colorName = colorTable[colorHexadecimal];

  return colorName;
}

function treatValueOfSelectedColor(selectedColorValue) {
  const colorHexadecimal = selectedColorValue.match(/#[0-9A-Fa-f]{6}/g);

  return colorHexadecimal[0];
}

export function whatIsTheCurrentColor() {
  const quaternaryColor = document.querySelector('.quaternary__color--hover')
    ? true
    : false;
  const quinaryColor = document.querySelector('.quinary__color--hover')
    ? true
    : false;
  const senaryColor = document.querySelector('.senary__color--hover')
    ? true
    : false;
  const septenaryColor = document.querySelector('.septenary__color--hover')
    ? true
    : false;
  const octonaryColor = document.querySelector('.octonary__color--hover')
    ? true
    : false;

  if (quaternaryColor) {
    return 'quaternary';
  }

  if (quinaryColor) {
    return 'quinary';
  }

  if (senaryColor) {
    return 'senary';
  }

  if (septenaryColor) {
    return 'septenary';
  }

  if (octonaryColor) {
    return 'octonary';
  }
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
    element.classList.add(`${selectedColor}__backgroundColor--lessLightHover`);
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

// * Lógica para mudar o idioma do site

function applyLanguage(selectedLanguageValue) {} // TODO - Andamento
