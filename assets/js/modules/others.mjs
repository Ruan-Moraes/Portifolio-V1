'use strict';

export function changePageScrollingState() {
  const bodyDOM = document.querySelector('body');
  const bodyOverflow = getComputedStyle(bodyDOM).getPropertyValue('overflow-y');

  bodyOverflow === 'auto' || bodyOverflow === 'visible'
    ? (bodyDOM.style.overflowY = 'hidden')
    : (bodyDOM.style.overflowY = 'auto');
}

export function showBlurOnBody() {
  const blurOnBodyDOM = document.querySelector('.blurOnBody');

  blurOnBodyDOM.classList.toggle('blurOnBodyIsActivated');
}

export function processingTranslationTexts() {
  const dynamicElements = document.querySelectorAll('[data-translate]');

  return Array.from(dynamicElements).map((element) =>
    // Faça um tratamento no texto para remover espaços em branco seguidos e espaços em branco no início e no final e substitui virgula por '-';

    element.textContent
      .replace(/\s{2,}/g, ' ')
      .trim()
      .replace(/,/g, ' -')
  );
}

export function saveTextsInPortuguese(itemName) {
  const dynamicElementsTexts = processingTranslationTexts();

  setValuesInLocalStorage(itemName, ...dynamicElementsTexts);
}

export function setValuesInLocalStorage(itemName, ...data) {
  localStorage.setItem(itemName, JSON.stringify([...data]));
}

export function getValuesInLocalStorage(itemName) {
  return JSON.parse(localStorage.getItem(itemName));
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
