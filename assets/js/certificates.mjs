'use strict';

import applyingSettings from './modules/applyingSettings.mjs';
import cancelingSettings from './modules/cancelingSettings.mjs';
import currentYear from './modules/currentYear.mjs';
import menu from './modules/menu.mjs';
import settings from './modules/settings.mjs';
import menuAndSettings from './modules/menuAndSettings.mjs';
import customSelect from './modules/customSelect.mjs';

// * Garante que o código só será executado após o carregamento do conteúdo da página

window.addEventListener('DOMContentLoaded', () => {
  // * Capturar as configurações do usuário e aplicar no site

  applyingSettings();

  // * Cancelar as configurações e voltar ao estado anterior

  cancelingSettings();

  // * Inicializar a biblioteca AOS

  AOS.init();

  // * Ano atual no rodapé

  currentYear();

  // * Toda a lógica do menu

  menu();

  // * Toda a lógica das configurações

  settings();

  // * Toda a lógica do menu e das configurações quando o usuário pressionar a tecla "Esc"

  menuAndSettings();

  // * Lógica para os selects customizados

  customSelect();

  // * Tradução dos certificados

  const elements = document.querySelectorAll('[data-translate]');
  const elementsText = Array.from(elements).map(
    (element) => element.textContent
  );

  const translation = translateText('en', 'pt', elementsText);

  elements.forEach((element, index) => {
    element.textContent = translation[index];
  });
});

async function translateText(source, target, text) {
  console.log(text);
  try {
    const response = await fetch('http://localhost:5000/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source, target, text }),
    });

    return await console.log(response.json());
  } catch (error) {
    console.log(`Ocorreu um erro ao traduzir os elementos: ${error}`);
  }
}
