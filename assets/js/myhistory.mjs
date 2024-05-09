'use strict';

import currentYear from './currentYear.mjs';
import menu from './menu.mjs';
import settings from './settings.mjs';
import menuAndSettings from './menuAndSettings.mjs';
import customSelect from './customSelect.mjs';

// * Garante que o código só será executado após o carregamento do conteúdo da página
window.addEventListener('DOMContentLoaded', () => {
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
