'use strict';

import {
  whatIsTheCurrentColor,
  setValuesInLocalStorage,
  getValuesLocalStorage,
} from './others.mjs';

export default async function fetchGitHubAPI() {
  const currentColor = whatIsTheCurrentColor();

  try {
    loadingProjects(true);

    const repositories = getValuesLocalStorage('repositories')
      ? getValuesLocalStorage('repositories')
      : await requestAPI();
    setValuesInLocalStorage('repositories', ...repositories);

    insertProjectsDOM(repositories, currentColor);
  } catch (error) {
    errorGitHubAPI(currentColor, error);
  }
}

function loadingProjects(isLoading) {
  const projectsContentsDOM = document.querySelector('.projects');

  if (!isLoading) {
    const loadingProjectsDOM = document.querySelector(
      '.projects__loadingProjects'
    );
    loadingProjectsDOM.remove();

    return;
  }

  const loadingProjectsDOM = document.createElement('div');
  loadingProjectsDOM.classList.add('projects__loadingProjects');
  loadingProjectsDOM.innerHTML = `<p>Carregando Projetos...</p>`;

  projectsContentsDOM.appendChild(loadingProjectsDOM);
}

async function requestAPI() {
  const repositoriesAddedManually = ['Accounts', 'Translate-API'];

  return await fetch(
    'https://api.github.com/users/ruan-moraes/repos?type=owner&per_page=64'
  )
    .then((response) => response.json())
    .then((response) =>
      response.filter(
        (repository) =>
          repository.has_pages === true ||
          repositoriesAddedManually.includes(repository.name)
      )
    )
    .then((response) => response.sort(() => Math.random() - 0.5))
    .then((response) => {
      return response.map((repository) => {
        return {
          name: repository.name,
          description: repository.description,
          has_pages: repository.has_pages,
          html_url: repository.html_url,
        };
      });
    });
}

function insertProjectsDOM(repositories, currentColor) {
  const numberRandom = Math.floor(Math.random() * 2000);

  setTimeout(() => {
    const totalProjectsPerPage = 6;
    const totalPages = calculateTotalNumberPages(
      totalProjectsPerPage,
      repositories
    );

    insertProjectsCounter(repositories, currentColor);
    createPagesIndexes(totalPages);
    createPagination(totalPages, currentColor);

    const projectsGroups = separateProjectsIntoGroups(
      totalProjectsPerPage,
      totalPages,
      repositories
    );

    loadingProjects(false);

    insertProjects(projectsGroups, currentColor);
    whichPageToDisplay();
  }, 1 * numberRandom);
}

function calculateTotalNumberPages(totalProjectsPerPage, repositories) {
  return Math.ceil(repositories.length / totalProjectsPerPage);
}

function insertProjectsCounter(repositories, currentColor) {
  const projectsCounterDOM = document.querySelector('#projectAccountant');
  projectsCounterDOM.classList.add(`${currentColor}__color`);
  projectsCounterDOM.innerHTML = `
      ${repositories.length}
    `;
}

function createPagesIndexes(totalPages) {
  for (let i = 0; i < totalPages; i++) {
    const projectsItemsDOM = document.querySelector('.projects__projectsItems');

    const pageDOM = document.createElement('div');
    pageDOM.classList.add('projects__page');
    pageDOM.setAttribute('id', `projectsPage${i + 1}`);
    pageDOM.setAttribute('data-aos', 'fade-up');
    pageDOM.setAttribute('data-aos-duration', '250');

    projectsItemsDOM.appendChild(pageDOM);
  }
}

function createPagination(totalPages, currentColor) {
  const projectsPaginationDOM = document.querySelector('.projects__pagination');

  for (let i = 0; i < totalPages; i++) {
    const pageDOM = document.createElement('a');
    pageDOM.setAttribute('href', '#myProjects');
    pageDOM.setAttribute('role', 'button');
    pageDOM.classList.add('projects__paginationItem');
    pageDOM.classList.add(`${currentColor}__backgroundColor--lessLightHover`);
    pageDOM.innerHTML = `<span class="visually-hidden">Página ${i + 1}</span> ${
      i + 1
    }`;

    pageDOM.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        whichPageToDisplayAcessibility(pageDOM, currentColor);
      }
    });

    projectsPaginationDOM.appendChild(pageDOM);
  }
}

function separateProjectsIntoGroups(
  totalProjectsPerPage,
  totalPages,
  repositories
) {
  const projectsGroups = [];

  for (let i = 0; i < totalPages; i++) {
    const listOfProjects = repositories.splice(0, totalProjectsPerPage);

    projectsGroups.push(listOfProjects);
  }

  return projectsGroups;
}

function insertProjects(projectsGroups, currentColor) {
  const projectsPagesDOM = document.querySelectorAll('.projects__page');

  for (let i = 0; i < projectsGroups.length; i++) {
    const projectsPage = projectsPagesDOM[i];
    const projectsGroup = projectsGroups[i];

    for (let j = 0; j < projectsGroup.length; j++) {
      const project = projectsGroup[j];
      const projectUrl = `https://ruan-moraes.github.io/${project.name}`;

      processingRepositoryData(project);

      const projectElementDOM = document.createElement('div');
      projectElementDOM.classList.add('projects__card');
      projectElementDOM.setAttribute('data-aos', 'fade-in');
      projectElementDOM.setAttribute('data-aos-delay', `${50 * j}`);
      projectElementDOM.setAttribute('data-aos-duration', `${350 + 150 * j}`);

      if (project.has_pages === true) {
        projectElementDOM.innerHTML = `
        <div class="projects__cardHeader">
          <h3>${project.name}</h3>
        </div>
        <div class="projects__cardBody">
          <div class="projects__cardDescription">
            <p data-translate>${project.description}</p>
          </div>
        </div> 
        <div class="projects__cardFooter">
          <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="${currentColor}__backgroundColor--hover">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <div class="separator"></div>
          <a href="${projectUrl}" target="_blank" rel="noopener noreferrer" class="${currentColor}__backgroundColor--hover">
            <i class="fas fa-external-link-alt"></i>
            <span>Deploy</span>
          </a>
        </div>
        `;
      } else {
        projectElementDOM.innerHTML = `
        <div class="projects__cardHeader">
          <h3>${project.name}</h3>
        </div>
        <div class="projects__cardBody">
          <div class="projects__cardDescription">
            <p data-translate>${project.description}</p>
          </div>
        </div> 
        <div class="projects__cardFooter noDeployed">
          <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="${currentColor}__backgroundColor--hover">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
        </div>
        `;
      }

      projectsPage.appendChild(projectElementDOM);
    }
  }

  disablePagesDisplays(currentColor);
}

function processingRepositoryData(project) {
  if (
    project.description === null ||
    project.description === '' ||
    project.description === undefined
  ) {
    project.description = 'Projeto sem uma descrição definida.';
  }

  project.name = project.name.replace(/[-\/]/g, ' ').replace(/_/g, ' | ');
}

function disablePagesDisplays(currentColor) {
  const projectsPagesDOM = document.querySelectorAll('.projects__page');
  const projectsPaginationDOM = document.querySelectorAll(
    '.projects__paginationItem'
  );

  projectsPaginationDOM[0].classList.add(
    `${currentColor}__backgroundColor--selected`
  );
  projectsPagesDOM[0].classList.add('projects__pageIsDisplayed');
}

function whichPageToDisplay() {
  const projectsPagesDOM = document.querySelectorAll('.projects__page');
  const projectsPaginationDOM = document.querySelectorAll(
    '.projects__paginationItem'
  );

  for (let i = 0; i < projectsPaginationDOM.length; i++) {
    projectsPaginationDOM[i].addEventListener('click', () => {
      const currentColor = whatIsTheCurrentColor();

      for (let i = 0; i < projectsPagesDOM.length; i++) {
        projectsPaginationDOM[i].classList.remove(
          `${currentColor}__backgroundColor--selected`
        );
        projectsPagesDOM[i].classList.remove('projects__pageIsDisplayed');
      }

      projectsPaginationDOM[i].classList.add(
        `${currentColor}__backgroundColor--selected`
      );
      projectsPagesDOM[i].classList.add('projects__pageIsDisplayed');

      AOS.refresh();
    });
  }
}

function whichPageToDisplayAcessibility(page, currentColor) {
  const projectsPagesDOM = document.querySelectorAll('.projects__page');
  const projectsPaginationDOM = document.querySelectorAll(
    '.projects__paginationItem'
  );

  for (let i = 0; i < projectsPaginationDOM.length; i++) {
    projectsPaginationDOM[i].classList.remove(
      `${currentColor}__backgroundColor--selected`
    );
    projectsPagesDOM[i].classList.remove('projects__pageIsDisplayed');

    if (projectsPaginationDOM[i] === page) {
      projectsPaginationDOM[i].classList.add(
        `${currentColor}__backgroundColor--selected`
      );
      projectsPagesDOM[i].classList.add('projects__pageIsDisplayed');
    }
  }
}

function errorGitHubAPI(currentColor) {
  console.error(
    `Ocorreu um erro ao tentar carregar projetos do GitHub! Por favor, tente mais tarde. ERROR: ${error}`
  );

  const errorMessage =
    '<h3>Ocorreu um problema ao tentar carregar projetos do GitHub! Por favor, tente mais tarde.</h3>';
  const errorIcon = `<i class="fas fa-exclamation-triangle ${currentColor}__color"></i>`;

  const projectsDOM = document.querySelector('.projects');
  projectsDOM.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
}
