'use strict';

import applyingSettings from './modules/applyingSettings.mjs';
import currentYear from './modules/currentYear.mjs';
import menu from './modules/menu.mjs';
import settings from './modules/settings.mjs';
import menuAndSettings from './modules/menuAndSettings.mjs';
import customSelect from './modules/customSelect.mjs';
import { whatIsTheCurrentColor } from './modules/others.mjs';

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

  // * Toda a lógica do menu e das configurações quando o usuário pressionar a tecla "Esc"

  menuAndSettings();

  // * Lógica para os selects customizados

  customSelect();

  // * Buscar meus projetos no GitHub atráves da API do GitHub e inserir no DOM

  (async function fetchGitHubAPI() {
    const currentColor = whatIsTheCurrentColor();

    try {
      loadingProjects(true, currentColor);

      const ruanMoraesRepositories = await fetch(
        'https://api.github.com/users/ruan-moraes/repos?type=owner'
      )
        .then((response) => response.json())
        .then((response) =>
          response.filter((repository) => repository.has_pages === true)
        );

      setTimeout(() => {
        insertProjectsDOM(ruanMoraesRepositories, currentColor);
      }, 1 * 1000);
    } catch (error) {
      errorGitHubAPI(currentColor);

      console.error(
        `Ocorreu um erro ao tentar carregar projetos do GitHub! Por favor, tente mais tarde. ERROR: ${error}`
      );
    }
  })();

  function loadingProjects(isLoading, currentColor) {
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
    loadingProjects.classList.add(`${currentColor}__color`);
    loadingProjects.innerHTML = `<p>Carregando Projetos...</p>`;

    projectsContents.appendChild(loadingProjects);
  }

  function insertProjectsDOM(ruanMoraesRepositories, currentColor) {
    const totalProjectsPerPage = 6;
    const totalPages = calculateTheTotalNumberOfPages(
      totalProjectsPerPage,
      ruanMoraesRepositories
    );

    insertTheProjectsCounter(ruanMoraesRepositories, currentColor);
    createPagesIndexes(totalPages);
    createPagination(totalPages, currentColor);

    const projectsGroups = separateProjectsIntoGroups(
      totalProjectsPerPage,
      totalPages,
      ruanMoraesRepositories
    );

    loadingProjects(false);

    insertProjects(projectsGroups, currentColor);
    whichPageToDisplay();
  }

  function calculateTheTotalNumberOfPages(
    totalProjectsPerPage,
    ruanMoraesRepositories
  ) {
    return Math.ceil(ruanMoraesRepositories.length / totalProjectsPerPage);
  }

  function insertTheProjectsCounter(ruanMoraesRepositories, currentColor) {
    const projectsCounter = document.querySelector('#projectAccountant');
    projectsCounter.classList.add(`${currentColor}__color`);
    projectsCounter.innerHTML = `
      ${ruanMoraesRepositories.length}
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
          <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="${currentColor}__backgroundColor--hover">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <div class="separator--page"></div>
          <a href="${projectUrl}" target="_blank" rel="noopener noreferrer" class="${currentColor}__backgroundColor--hover">
            <i class="fas fa-external-link-alt"></i>
            <span>Deploy</span>
          </a>
        </div>
        `;

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
    const projects = document.querySelector('.projects');

    const errorMessage =
      '<h3>Ocorreu um problema ao tentar carregar projetos do GitHub! Por favor, tente mais tarde.</h3>';
    const errorIcon = `<i class="fas fa-exclamation-triangle ${currentColor}__color"></i>`;

    projects.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
  }
});
