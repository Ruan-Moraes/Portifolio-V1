'use strict';

import {
  whatIsTheCurrentColor,
  setValuesInLocalStorage,
  getValuesInLocalStorage,
} from './others.mjs';

export default async function fetchGitHubAPI() {
  const currentColor = whatIsTheCurrentColor();

  try {
    loadingProjects(true);

    const repositories = getValuesInLocalStorage('repositories')
      ? getValuesInLocalStorage('repositories')[0]
      : await requestAPI();
    setValuesInLocalStorage('repositories', repositories);

    insertProjectsDOM(repositories, currentColor);
  } catch (error) {
    errorGitHubAPI(currentColor, error);
  }
}

function loadingProjects(isLoading) {
  const projectsContents = document.querySelector('.projects');

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
    .then((response) => response.sort(() => Math.random() - 0.5));
}

function insertProjectsDOM(repositories, currentColor) {
  const numberRandom = Math.floor(Math.random() * 2000);

  setTimeout(() => {
    const totalProjectsPerPage = 6;
    const totalPages = calculateTheTotalNumberOfPages(
      totalProjectsPerPage,
      repositories
    );

    insertTheProjectsCounter(repositories, currentColor);
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

function calculateTheTotalNumberOfPages(totalProjectsPerPage, repositories) {
  return Math.ceil(repositories.length / totalProjectsPerPage);
}

function insertTheProjectsCounter(repositories, currentColor) {
  const projectsCounter = document.querySelector('#projectAccountant');
  projectsCounter.classList.add(`${currentColor}__color`);
  projectsCounter.innerHTML = `
      ${repositories.length}
    `;
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

function createPagination(totalPages, currentColor) {
  const projectsPagination = document.querySelector('.projects__pagination');

  for (let i = 0; i < totalPages; i++) {
    const page = document.createElement('a');
    page.setAttribute('href', '#myProjects');
    page.setAttribute('role', 'button');
    page.classList.add('projects__paginationItem');
    page.classList.add(`${currentColor}__backgroundColor--lessLightHover`);
    page.innerHTML = `<span class="visually-hidden">Página ${i + 1}</span> ${
      i + 1
    }`;

    page.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        whichPageToDisplayAcessibility(page, currentColor);
      }
    });

    projectsPagination.appendChild(page);
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

      if (project.has_pages === true) {
        projectElement.innerHTML = `
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
      }

      if (project.has_pages === false) {
        projectElement.innerHTML = `
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

      projectsPage.appendChild(projectElement);
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
  const projectsPages = document.querySelectorAll('.projects__page');
  const projectsPagination = document.querySelectorAll(
    '.projects__paginationItem'
  );

  projectsPagination[0].classList.add(
    `${currentColor}__backgroundColor--selected`
  );
  projectsPages[0].classList.add('projects__pageIsDisplayed');
}

function whichPageToDisplay() {
  const projectsPages = document.querySelectorAll('.projects__page');
  const projectsPagination = document.querySelectorAll(
    '.projects__paginationItem'
  );

  for (let i = 0; i < projectsPagination.length; i++) {
    projectsPagination[i].addEventListener('click', () => {
      const currentColor = whatIsTheCurrentColor();

      for (let i = 0; i < projectsPages.length; i++) {
        projectsPagination[i].classList.remove(
          `${currentColor}__backgroundColor--selected`
        );
        projectsPages[i].classList.remove('projects__pageIsDisplayed');
      }

      projectsPagination[i].classList.add(
        `${currentColor}__backgroundColor--selected`
      );
      projectsPages[i].classList.add('projects__pageIsDisplayed');

      AOS.refresh();
    });
  }
}

function whichPageToDisplayAcessibility(page, currentColor) {
  const projectsPages = document.querySelectorAll('.projects__page');
  const projectsPagination = document.querySelectorAll(
    '.projects__paginationItem'
  );

  for (let i = 0; i < projectsPagination.length; i++) {
    projectsPagination[i].classList.remove(
      `${currentColor}__backgroundColor--selected`
    );
    projectsPages[i].classList.remove('projects__pageIsDisplayed');

    if (projectsPagination[i] === page) {
      projectsPagination[i].classList.add(
        `${currentColor}__backgroundColor--selected`
      );
      projectsPages[i].classList.add('projects__pageIsDisplayed');
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

  const projects = document.querySelector('.projects');
  projects.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
}