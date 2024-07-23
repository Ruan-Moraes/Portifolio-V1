'use strict';

import { processingTranslationTexts } from './others.mjs';

export default async function translateDynamicTexts(source, target) {
  const dynamicElements = document.querySelectorAll('[data-translate]');

  const dynamicElementsTexts = processingTranslationTexts();

  const key = '';
  const endpoint = 'https://api-free.deepl.com/v2/translate';

  try {
    const response = await fetch(
      `${endpoint}?auth_key=${key}&text=${dynamicElementsTexts}&source_lang=${source}&target_lang=${target}`
    ).then((response) => response.json());
    const translatedText = await textTreatment(response.translations[0].text);

    dynamicElements.forEach((element, index) => {
      element.textContent = translatedText[index];
    });

    return translatedText;
  } catch (error) {
    console.error("Couldn't translate the text." + error);
  }
}

async function textTreatment(text) {
  return await text
    .split(',')
    .map((text) => text.replace(/\s{2,}/g, ' ').trim());
}
