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

export function processingTranslationTexts(formatToOriginalText = false) {
  const dynamicElementsDOM = document.querySelectorAll('[data-translate]');

  if (formatToOriginalText) {
    return Array.from(dynamicElementsDOM).map((element) =>
      element.textContent
        .replace(/\s{2,}/g, ' ')
        .trim()
        .replace(/ \|/g, ',')
    );
  }

  return Array.from(dynamicElementsDOM).map((element) =>
    element.textContent
      .replace(/\s{2,}/g, ' ')
      .trim()
      .replace(/,/g, ' |')
  );
}

export function saveTextsInPortugueseInLocalStorage(itemName) {
  const dynamicElementsTexts = processingTranslationTexts(true);

  setValuesInLocalStorage(itemName, ...dynamicElementsTexts);
}

export function setValuesInLocalStorage(itemName, ...data) {
  localStorage.setItem(itemName, JSON.stringify([...data]));
}

export function getValuesLocalStorage(itemName) {
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
