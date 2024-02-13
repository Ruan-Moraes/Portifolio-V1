import { repos } from './repositoriesJson.js';

window.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS

  AOS.init();

  // Menu

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

  // Settings

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

  // API GITHUB

  (async function fetchGitHubAPI() {
    try {
      // 
      // const ruanMoraesRepositories = await fetch(
      //   'https://api.github.com/users/ruan-moraes/repos?type=owner',
      // );
      const ruanMoraesRepositoriesJson = repos;

      const repositoriesThatHavePages = ruanMoraesRepositoriesJson.filter(
        (repo) => repo.has_pages === true
      );

      addProjectsToHTML(repositoriesThatHavePages);
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

    projectsItems.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
    projectsItems.parentElement.style.minHeight = '50vh';
  }

  function addProjectsToHTML(RepositorysArray) {
    const projectsItems = document.querySelector('.projects__items');

    RepositorysArray.forEach((repository) => {
      const projectItem = document.createElement('div');
      // projectItem.classList.add('project__item');
      // projectItem.innerHTML = `
      //   <a href="${repository.homepage}" target="_blank">
      //     <img src="assets/img/${repository.name}.png" alt="${repository.name}" />
      //     <h3>${repository.name}</h3>
      //   </a>
      // `;

      // projectsItems.appendChild(projectItem);

      const images = getReadmeImages('ruan-moraes', repository.name);
    });
  }

  async function getReadmeImages(user, repo) {
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${user}/${repo}/readme`
    );

    const data = await readmeResponse.json();
    const readmeContent = atob(data.content); // Decode o conteúdo do arquivo README

    const imageUrls = readmeContent.match(/!\[.*?\]\((.*?)\)/g);

    imageUrls.forEach((url) => {
      const imageUrl = url.match(/\((.*?)\)/)[1].replace(' ', ''); // Obtém a URL da imagem
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = 'Imagem do Portfólio';
      imageContainer.appendChild(img);
    });
  }
});
