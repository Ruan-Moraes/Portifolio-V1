'use strict';

import applyingSettings from './modules/applyingSettings.mjs';
import currentYear from './modules/currentYear.mjs';
import menu from './modules/menu.mjs';
import settings from './modules/settings.mjs';
import menuAndSettings from './modules/menuAndSettings.mjs';
import customSelect from './modules/customSelect.mjs';

// * Garante que o código só será executado após o carregamento do conteúdo da página

window.addEventListener('DOMContentLoaded', () => {
  // * Capturar as configurações do usuário e aplicar no site

  applyingSettings();

  // * Inicializar a biblioteca AOS

  AOS.init();

  // * Ano atual no rodapé

  currentYear();

  // * Toda a lógica do menu

  menu();

  // * Toda a lógica das configurações

  settings();

  // * Lógica para fechar o menu e as configurações ao pressionar a tecla ESC

  menuAndSettings();

  // * Lógica para os selects customizados

  customSelect();
});
