'use strict';

// import { repos } from './repositoriesJson.js';

// * Garante que o código só será executado após o carregamento do conteúdo da página
window.addEventListener('DOMContentLoaded', () => {
  // * Inicializar a biblioteca AOS
  AOS.init();

  // * Toda a lógica do menu
  const menu = document.querySelector('.header__menu');

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      animationMenu();
      activateMenu();
      showBlurMenu();
      changePageScrollingState();
    }
  });

  menu.addEventListener('click', () => {
    animationMenu();
    activateMenu();
    showBlurMenu();
    changePageScrollingState();
  });

  function animationMenu() {
    ['lineOne', 'lineTwo', 'lineThree'].forEach((lineClass) => {
      const line = document.querySelector(`.menu__${lineClass}`);

      line.classList.toggle(`${lineClass}IsActivated`);
    });
  }

  function activateMenu() {
    const showMenu = document.querySelector('.header__links');

    showMenu.classList.toggle('menuIsActivated');
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

    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        CheckIfMenuIsActive();
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();
      }
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
      const isMenuActive = document
        .querySelector('.header__links')
        .classList.contains('menuIsActivated');
      const isSettingsActive = document
        .querySelector('.settings__modal')
        .classList.contains('settingActivated');

      if (!isMenuActive && !isSettingsActive) {
        console.log('Nenhum menu ou configuração está ativo.');
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();

        return;
      }

      if (isMenuActive) {
        animationMenu();
        activateMenu();
        showBlurMenu();
        changePageScrollingState();
      }

      if (isSettingsActive) {
        animationGear();
        showBlurOnBody();
        showSettings();
        disableTextSelection();
        changePageScrollingState();
      }
    }
  });

  // * Buscar meus projetos no GitHub atráves da API do GitHub e inserir no DOM
  (async function fetchGitHubAPI() {
    try {
      loadingProjects();

      const ruanMoraesRepositories = await fetch(
        'https://api.github.com/users/ruan-moraes/repos?type=owner'
      )
        .then((response) => response.json())
        .then((response) =>
          response.filter((repository) => repository.has_pages === true)
        );

      insertProjectsDOM(ruanMoraesRepositories);
    } catch (error) {
      errorGitHubAPI();

      console.error(
        `Ocorreu um erro ao tentar carregar projetos do GitHub! Por favor, tente mais tarde. ERROR: ${error}`
      );
    }
  })();

  function loadingProjects(isLoading = true) {
    const projectsContents = document.querySelector('.projects__contents');

    if (!isLoading) {
      const loadingProjects = document.querySelector(
        '.projects__loadingProjects'
      );
      loadingProjects.remove();

      return;
    }

    const loadingProjects = document.createElement('div');
    loadingProjects.classList.add('projects__loadingProjects');
    loadingProjects.innerHTML = `<p>Carregando Projetos...</p>`;

    projectsContents.appendChild(loadingProjects);
  }

  function insertProjectsDOM(ruanMoraesRepositories) {
    const totalProjectsPerPage = 6;
    const totalPages = calculateTheTotalNumberOfPages(
      totalProjectsPerPage,
      ruanMoraesRepositories
    );

    insertTheProjectsCounter(ruanMoraesRepositories);
    createPagesIndexes(totalPages);
    createPagination(totalPages);

    const projectsGroups = separateProjectsIntoGroups(
      totalProjectsPerPage,
      totalPages,
      ruanMoraesRepositories
    );

    loadingProjects(false);

    insertProjects(projectsGroups);
    whichPageToDisplay();
  }

  function calculateTheTotalNumberOfPages(
    totalProjectsPerPage,
    ruanMoraesRepositories
  ) {
    return Math.ceil(ruanMoraesRepositories.length / totalProjectsPerPage);
  }

  function insertTheProjectsCounter(ruanMoraesRepositories) {
    const projectsCounter = document.querySelector('#projectAccountant');
    projectsCounter.setAttribute('data-aos', 'fade-down');
    projectsCounter.setAttribute('data-aos-duration', '250');

    projectsCounter.innerHTML = `<p>Total de projetos: <strong>${ruanMoraesRepositories.length}</strong></p>`;
  }

  function createPagesIndexes(totalPages) {
    for (let i = 0; i < totalPages; i++) {
      const projectsItems = document.querySelector('.projects__projectsItems');

      const page = document.createElement('div');
      page.classList.add('projects__page');
      page.setAttribute('id', `projectsPage${i + 1}`);
      page.setAttribute('data-aos', 'fade-up');
      page.setAttribute('data-aos-duration', '250');

      projectsItems.appendChild(page);
    }
  }

  function createPagination(totalPages) {
    const projectsPagination = document.querySelector('.projects__pagination');

    for (let i = 0; i < totalPages; i++) {
      const page = document.createElement('a');
      page.setAttribute('role', 'button');
      page.classList.add('projects__paginationItem');
      page.innerHTML = `
      <p>
        <span class="visually-hidden">Página ${i + 1}</span>
        ${i + 1}
      </p>`;

      page.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          whichPageToDisplayAcessibility(page);
        }
      });

      projectsPagination.appendChild(page);
    }
  }

  function separateProjectsIntoGroups(
    totalProjectsPerPage,
    totalPages,
    ruanMoraesRepositories
  ) {
    const projectsGroups = [];

    for (let i = 0; i < totalPages; i++) {
      const listOfProjects = ruanMoraesRepositories.splice(
        0,
        totalProjectsPerPage
      );

      projectsGroups.push(listOfProjects);
    }

    return projectsGroups;
  }

  function insertProjects(projectsGroups) {
    const projectsPages = document.querySelectorAll('.projects__page');

    for (let i = 0; i < projectsGroups.length; i++) {
      const projectsPage = projectsPages[i];
      const projectsGroup = projectsGroups[i];

      for (let i = 0; i < projectsGroup.length; i++) {
        const project = projectsGroup[i];

        const projectUrl = `https://ruan-moraes.github.io/${project.name}`;
        processingRepositoryData(project);

        const projectElement = document.createElement('div');
        projectElement.classList.add('projects__card');
        projectElement.setAttribute('data-aos', 'fade-in');
        projectElement.setAttribute('data-aos-delay', `${50 * i}`);
        projectElement.setAttribute('data-aos-duration', `${350 + 150 * i}`);
        projectElement.innerHTML = `
        <div class="projects__cardHeader">
          <h3>${project.name}</h3>
        </div>
        <div class="projects__cardBody">
          <div class="projects__cardDescription">
            <p>${project.description}</p>
          </div>
        </div> 
        <div class="projects__cardFooter">
          <a href="${project.html_url}" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <div class="separator--page"></div>
          <a href="${projectUrl}" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-external-link-alt"></i>
            <span>Deploy</span>
          </a>
        </div>
        `;

        projectsPage.appendChild(projectElement);
      }
    }

    disablePagesDisplays();
  }

  function processingRepositoryData(project) {
    if (
      project.description === null ||
      project.description === '' ||
      project.description === undefined
    ) {
      project.description = 'Sem descrição.';
    }

    project.name = project.name.replace(/[-\/]/g, ' ').replace(/_/g, ' | ');
  }

  function disablePagesDisplays() {
    const projectsPages = document.querySelectorAll('.projects__page');
    const projectsPagination = document.querySelectorAll(
      '.projects__paginationItem'
    );

    projectsPagination[0].classList.add('projects__paginationIsSelected');
    projectsPages[0].classList.add('projects__pageIsDisplayed');
  }

  function whichPageToDisplayAcessibility(page) {
    const projectsPages = document.querySelectorAll('.projects__page');
    const projectsPagination = document.querySelectorAll(
      '.projects__paginationItem'
    );

    for (let i = 0; i < projectsPagination.length; i++) {
      projectsPagination[i].classList.remove('projects__paginationIsSelected');
      projectsPages[i].classList.remove('projects__pageIsDisplayed');

      if (projectsPagination[i] === page) {
        projectsPagination[i].classList.add('projects__paginationIsSelected');
        projectsPages[i].classList.add('projects__pageIsDisplayed');
      }
    }
  }

  function whichPageToDisplay() {
    const projectsPages = document.querySelectorAll('.projects__page');
    const projectsPagination = document.querySelectorAll(
      '.projects__paginationItem'
    );

    for (let i = 0; i < projectsPagination.length; i++) {
      projectsPagination[i].addEventListener('click', () => {
        for (let i = 0; i < projectsPages.length; i++) {
          projectsPagination[i].classList.remove(
            'projects__paginationIsSelected'
          );
          projectsPages[i].classList.remove('projects__pageIsDisplayed');
        }

        projectsPagination[i].classList.add('projects__paginationIsSelected');
        projectsPages[i].classList.add('projects__pageIsDisplayed');

        AOS.refresh();
      });
    }
  }

  function errorGitHubAPI() {
    const projectsContents = document.querySelector('.projects__contents');

    const errorMessage =
      '<h3>Ocorreu um problema ao tentar carregar projetos do GitHub! Por favor, tente mais tarde.</h3>';
    const errorIcon = '<i class="fas fa-exclamation-triangle"></i>';

    projectsContents.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
  }
});
