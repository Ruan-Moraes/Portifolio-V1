import { repos } from './repositoriesJson.js';

window.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init();

  // Close menu and settings when click key 'ESC'
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

  // All logic of menu
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
    const cssProperties = getComputedStyle(bodyHTML);
    const overflowProperty = cssProperties.getPropertyValue('overflow-y');

    overflowProperty === 'visible'
      ? (bodyHTML.style.overflowY = 'hidden')
      : (bodyHTML.style.overflowY = 'visible');
  }

  // All logic of settings
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

  // Fetch my data through the GitHub API and render it on the page
  (async function fetchGitHubAPI() {
    try {
      // const ruanMoraesRepositories = await fetch(
      //   'https://api.github.com/users/ruan-moraes/repos?type=owner'
      // );
      // const ruanMoraesRepositoriesJson = await ruanMoraesRepositories.json();
      const ruanMoraesRepositoriesJson = repos;
      const repositoriesThatHavePages = ruanMoraesRepositoriesJson.filter(
        (repo) => repo.has_pages === true
      );

      createProjectContentInHTML(repositoriesThatHavePages); // * TODO: Continuar a partir daqui
    } catch (error) {
      errorGitHubAPI();

      console.error(
        `Ocorreu um erro ao tentar carregar projetos do GitHub! Por favor, tente mais tarde. ERROR: ${error}`
      );

      throw new Error(error);
    }
  })();

  function createProjectContentInHTML(repositoriesThatHavePages) {
    const numberPages = Math.ceil(repositoriesThatHavePages.length / 6);

    createPagesIndex(numberPages);
    enumeratePage(); // TODO: FINALIZA AQUI
    // TODO: addProjectsToHTML(repositoriesThatHavePages)
  }

  function createPagesIndex(numberPages) {
    for (let i = 0; i < numberPages; i++) {
      const projectsItems = document.querySelector('.projects__pagesContainer');
      const page = document.createElement('div');

      page.classList.add('projects__page');
      page.setAttribute('data-page', i + 1);

      projectsItems.appendChild(page);
    }
  }

  function enumeratePage() {}

  function addProjectsToHTML(repositories) {
    const projectsItems = document.querySelector('.projects__container');

    for (let i = 0; i < 6; i++) {
      const project = document.createElement('div');

      project.classList.add('project');
      project.innerHTML = `
        <div class="project__header">
          <h3>${repositories[i].name}</h3>
        </div>
        <div class="project__body">
          <div class="project__image">
            <img src="assets/images/${repositories[i].name}.png" alt="${repositories[i].name}" />
          </div>
          <div class="project__description">
            <p>${repositories[i].description}</p>
          </div>
        </div>
        <div class="project__footer">
          <a href="https://ruan-moraes.github.io/${repositories[i].name}/" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-eye"></i> Visualizar Projeto
          </a>
          <a href="${repositories[i].html_url}" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i> Ver no GitHub
          </a>
        </div>
      `;
      projectsItems.appendChild(project);
    }
  }

  function errorGitHubAPI() {
    const projectsItems = document.querySelector('.projects__contents');

    const errorMessage =
      '<h3>Erro ao buscar os repositórios no GitHub! Tente mais tarde.</h3>';
    const errorIcon = '<i class="fas fa-exclamation-triangle"></i>';

    projectsItems.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
    projectsItems.style.display = 'block';
  }
});
