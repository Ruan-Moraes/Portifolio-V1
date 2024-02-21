import { repos } from './repositoriesJson.js';

window.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init();

  // Close menu and settings when click key 'ESC'
  window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape') {
      console.log('esc');
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
  const projectsPerPage = 6;

  (async function fetchGitHubAPI() {
    try {
      // const ruanMoraesRepositories = await fetch(
      //   'https://api.github.com/users/ruan-moraes/repos?type=owner'
      // );
      const ruanMoraesRepositoriesJson = repos;

      const repositoriesThatHavePages = ruanMoraesRepositoriesJson.filter(
        (repo) => repo.has_pages === true
      );

      addProjectsToHTML(repositoriesThatHavePages, projectsPerPage);
    } catch (error) {
      errorGitHubAPI();

      console.error(
        `Ocorreu um erro ao tentar carregar projetos do GitHub! Por favor, tente mais tarde. ERROR: ${error}`
      );
    }
  })();

  function errorGitHubAPI() {
    const errorMessage = '<h2>Erro ao buscar os repositórios do GitHub</h2>';
    const errorIcon = '<i class="fas fa-exclamation-triangle"></i>';

    const projectsItems = document.querySelector('.projects__items');

    projectsItems.style.display = 'block';
    projectsItems.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
  }

  function addProjectsToHTML(repositories, limit, page) {
    const projectsItems = document.querySelector('.projects__items');
    projectsItems.innerHTML = '';

    for (let i = 0; i < limit; i++) {
      const repo = repositories[i];

      const project = document.createElement('div');
      project.classList.add('project');

      project.innerHTML = `
        <div class="project__header">
          <h3>${repo.name}</h3>
        </div>
        <div class="project__body">
          <div class="project__image">
            <img src="assets/images/${repo.name}.png" alt="${repo.name}" />
          </div>
          <div class="project__description">
            <p>${repo.description}</p>
          </div>
        </div>
        <div class="project__footer">
          <a href="https://ruan-moraes.github.io/${repo.name}/" target="_blank" rel="noopener noreferrer">
            <i class="fas fa-eye"></i> Visualizar Projeto
          </a>
          <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github"></i> Ver no GitHub
          </a>
        </div>
      `;

      projectsItems.appendChild(project);
    }
  }

  checkWhichPageIs(page);
});

function checkWhichPageIs(page) {}
