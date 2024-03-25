'use strict';

import { repos } from './repositoriesJson.js';

// * Garante que o código só será executado após o carregamento do conteúdo da página
window.addEventListener('DOMContentLoaded', () => {
  // * Inicializar a biblioteca AOS
  AOS.init();

  // * Toda a lógica do menu
  const menu = document.querySelector('.header__menu');

  menu.addEventListener('click', () => {
    animationMenu();
    activateMenu();
    showBlurMenu();
    changePageScrollingState();
  });

  function activateMenu() {
    const showMenu = document.querySelector('.header__links');

    showMenu.classList.toggle('menuIsActivated');
  }

  function animationMenu() {
    ['lineOne', 'lineTwo', 'lineThree'].forEach((lineClass) => {
      const line = document.querySelector(`.menu__${lineClass}`);

      line.classList.toggle(`${lineClass}IsActivated`);
    });
  }

  function showBlurMenu() {
    const blurOnMain = document.querySelector('.BlurOnMain');

    blurOnMain.classList.toggle('BlurOnMainIsActivated');
  }

  function changePageScrollingState() {
    const bodyHTML = document.querySelector('body');
    const bodyOverflow =
      getComputedStyle(bodyHTML).getPropertyValue('overflow-y');

    bodyOverflow === 'auto'
      ? (bodyHTML.style.overflowY = 'hidden')
      : (bodyHTML.style.overflowY = 'auto');
  }

  // * Toda a lógica das configurações
  const gear = document.querySelector('.container__gear');
  const blurOnBody = document.querySelector('.BlurOnBody');
  const exitSettingsButton = document.querySelector(
    '.settings__header > .fa-xmark'
  );

  [gear, blurOnBody, exitSettingsButton].forEach((element) => {
    element.addEventListener('click', () => {
      CheckIfMenuIsActive();
      animationGear();
      showBlurOnBody();
      showSettings();
      disableTextSelection();
      changePageScrollingState();
    });
  });

  function CheckIfMenuIsActive() {
    const IsMenuActive = document
      .querySelector('.header__links')
      .classList.contains('menuIsActivated');

    if (IsMenuActive) {
      animationMenu();
      activateMenu();
      showBlurMenu();
      changePageScrollingState();
    }
  }

  function animationGear() {
    const gear = document.querySelector('.container__gear > .fa-gear');

    gear.style.transform === 'rotate(360deg)'
      ? (gear.style.transform = 'rotate(0deg)')
      : (gear.style.transform = 'rotate(360deg)');
  }

  function showBlurOnBody() {
    blurOnBody.classList.toggle('BlurOnBodyIsActivated');
  }

  function showSettings() {
    const settings = document.querySelector('.settings__modal');

    settings.classList.toggle('settingActivated');
  }

  function disableTextSelection() {
    [
      document.querySelector('.header'),
      document.querySelector('.main'),
    ].forEach((element) => {
      element.style.userSelect === 'none'
        ? (element.style.userSelect = 'text')
        : (element.style.userSelect = 'none');
    });
  }

  // * Lógica para fechar o menu e as configurações ao pressionar a tecla 'ESC'
  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      const IsMenuActive = document
        .querySelector('.header__links')
        .classList.contains('menuIsActivated');
      const IsSettingsActive = document
        .querySelector('.settings__modal')
        .classList.contains('settingActivated');

      if (IsMenuActive) {
        animationMenu();
        activateMenu();
        showBlurMenu();
        changePageScrollingState();
      }

      if (IsSettingsActive) {
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();
      }
    }
  });

  // * Buscar meus projetos no GitHub atráves da API do GitHub
  (async function fetchGitHubAPI() {
    try {
      // const ruanMoraesRepositories = await fetch(
      //   'https://api.github.com/users/ruan-moraes/repos?type=owner'
      // ).then((response) => response.json());
      // ! Código acima comentado para evitar requisições desnecessárias à API do GitHub
      const ruanMoraesRepositoriesJson = repos;
      const repositoriesThatHavePages = ruanMoraesRepositoriesJson.filter(
        (repo) => repo.has_pages === true
      );

      insertProjectsIntoDOM(repositoriesThatHavePages); // * TODO: Continuar a partir daqui
    } catch (error) {
      errorGitHubAPI();

      console.error(
        `Ocorreu um erro ao tentar carregar projetos do GitHub! Por favor, tente mais tarde. ERROR: ${error}`
      );
    }
  })();

  function insertProjectsIntoDOM(repositoriesThatHavePages) {
    const totalProjectsPerPage = 6;
    const totalPages = calculateTotalPages(
      totalProjectsPerPage,
      repositoriesThatHavePages
    );

    createPagesIndexes(totalPages);

    const projectsGroups = separateProjectsIntoGroups(
      totalPages,
      repositoriesThatHavePages
    );

    insertProjects(projectsGroups); // TODO: Continuar a partir daqui
  }

  function calculateTotalPages(
    totalProjectsPerPage,
    repositoriesThatHavePages
  ) {
    return Math.ceil(repositoriesThatHavePages.length / totalProjectsPerPage);
  }

  function createPagesIndexes(totalPages) {
    for (let i = 0; i < totalPages; i++) {
      const projectsItems = document.querySelector('.projects__pagesContainer');

      const page = document.createElement('div');
      page.classList.add('projects__page');
      page.setAttribute('id', `projectsPage${i + 1}`);

      projectsItems.appendChild(page);
    }
  }

  function separateProjectsIntoGroups(
    totalProjectsPerPage,
    totalPages,
    repositoriesThatHavePages
  ) {
    const projectsGroups = [];

    for (let i = 0; i < totalPages; i++) {
      const listOfProjects = repositoriesThatHavePages.splice(
        0,
        totalProjectsPerPage
      );

      projectsGroups.push(listOfProjects);
    }

    return projectsGroups;
  }

  function insertProjects(projectsGroups) {}

  function errorGitHubAPI() {
    const projectsItems = document.querySelector('.projects__contents');

    const errorMessage =
      '<h3>Ocorreu um erro ao tentar carregar projetos do GitHub! Por favor, tente mais tarde.</h3>';
    const errorIcon = '<i class="fas fa-exclamation-triangle"></i>';

    projectsItems.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
    projectsItems.style.display = 'block';
  }
});
