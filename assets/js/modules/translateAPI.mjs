'use strict';

import { processingTranslationTexts } from './others.mjs';

export default async function translateDynamicTexts(source, target) {
  const dynamicElementsDOM = document.querySelectorAll('[data-translate]');
  const dynamicElementsTexts = processingTranslationTexts();

  const key = '2977a912-0744-40ba-8b2c-4a66cb89ab3e:fx';
  const endpoint = 'https://api-free.deepl.com/v2/translate';

  try {
    const response = await fetch(
      `${endpoint}?auth_key=${key}&text=${dynamicElementsTexts}&source_lang=${source}&target_lang=${target}`
    ).then((response) => response.json());
    const translatedText = await apiTextTreatment(
      response.translations[0].text
    );

    dynamicElementsDOM.forEach((element, index) => {
      element.textContent = translatedText[index];
    });

    return translatedText;
  } catch (error) {
    console.error(
      "Não foi possível traduzir o texto! Tente novamente mais tarde. - We couldn't translate the text! Please try again later." +
        error
    );
  }
}

async function apiTextTreatment(text) {
  return Array.from(text.split(',').map((text) => text.trim())).map((text) => {
    return text.replace(/ \|/g, ',');
  });
}
