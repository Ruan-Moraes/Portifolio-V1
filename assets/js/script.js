'use strict';

// * Garante que o código só será executado após o carregamento do conteúdo da página
window.addEventListener('DOMContentLoaded', () => {
  // * Inicializar a biblioteca AOS
  AOS.init();

  // * Ano atual no rodapé

  const currentYear = new Date().getFullYear();

  const currentYearDOM = document.querySelector('#currentYear');
  currentYearDOM.innerHTML = currentYear;

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

    bodyOverflow === 'auto' || bodyOverflow === 'visible'
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
      document.querySelector('.footer'),
    ].forEach((element) => {
      element.style.userSelect === 'none'
        ? (element.style.userSelect = 'text')
        : (element.style.userSelect = 'none');
    });
  }

  // * Estilização do select

  const selectionElements = document.querySelectorAll('select');

  selectionElements.forEach((selectionElement) => {
    hideSelectElement(selectionElement);

    const parentElementOfTheSelection =
      selectTheParentElement(selectionElement);
    const ItemSelected = showTheFirstSelectedItem(
      selectionElement,
      parentElementOfTheSelection
    );
    const listOfOptions = createListOfOptions(parentElementOfTheSelection);

    addOptions(listOfOptions, selectionElement, ItemSelected);

    const allOptions = listOfOptions.querySelectorAll('li');

    addEventShowOrHideOptions(allOptions, listOfOptions, ItemSelected);
  });

  function hideSelectElement(selectionElement) {
    selectionElement.classList.add('selectHidden');
  }

  function selectTheParentElement(selectionElement) {
    const parentElementOfTheSelectionDOM = selectionElement.parentElement;

    return parentElementOfTheSelectionDOM;
  }

  function showTheFirstSelectedItem(
    selectionElement,
    parentElementOfTheSelection
  ) {
    const ItemSelectedDOM = document.createElement('div');
    ItemSelectedDOM.classList.add('selectedItem');
    ItemSelectedDOM.textContent = selectionElement.children[0].textContent;

    parentElementOfTheSelection.appendChild(ItemSelectedDOM);

    return ItemSelectedDOM;
  }

  function createListOfOptions(parentElementOfTheSelection) {
    const listOfOptionDOM = document.createElement('ul');
    listOfOptionDOM.classList.add('listOfOptions');

    parentElementOfTheSelection.appendChild(listOfOptionDOM);

    return listOfOptionDOM;
  }

  function addOptions(listOfOptions, selectionElement, ItemSelected) {
    const totalNumberOfOptions = selectionElement.children.length;

    for (let i = 0; i < totalNumberOfOptions; i++) {
      const optionItem = document.createElement('li');
      optionItem.textContent = selectionElement.children[i].textContent;
      optionItem.setAttribute('rel', selectionElement.children[i].value);

      listOfOptions.appendChild(optionItem);

      if (selectionElement.children[i].selected) {
        optionItem.classList.add('selected');

        ItemSelected.textContent = selectionElement.children[i].textContent;
      }
    }
  }

  function addEventShowOrHideOptions(allOptions, listOfOptions, ItemSelected) {
    ItemSelected.addEventListener('click', (event) => {
      event.stopPropagation();

      listOfOptions.classList.toggle('listOfOptionsIsActivated');
    });
  }

  // * Lógica para mudar o tema do site

  // * Lógica para mudar as cores do site

  const colors = {
    primary__color: {
      base: '.primary__color',
      hover: '.primary__color--hover',
    },
    secondary__color: {
      base: '.secondary__color',
      hover: '.secondary__color--hover',
    },
    tertiary__color: {
      base: '.tertiary__color',
      hover: '.tertiary__color--hover',
    },
    quaternary__color: {
      base: '.quaternary__color',
      hover: '.quaternary__color--hover',
    },
    quinary__color: {
      base: '.quinary__color',
      hover: '.quinary__color--hover',
    },
  };

  const colorsBackground = {
    primary__backgroundColor: {
      base: '.primary__backgroundColor',
      lessLightHover: '.primary__backgroundColor--lessLightHover',
      selected: '.primary__backgroundColor--selected',
      menuHover: '.primary__backgroundColor--menuHover',
    },
    secondary__backgroundColor: {
      base: '.secondary__backgroundColor',
      lessLightHover: '.secondary__backgroundColor--lessLightHover',
      selected: '.secondary__backgroundColor--selected',
      menuHover: '.secondary__backgroundColor--menuHover',
    },
    tertiary__backgroundColor: {
      base: '.tertiary__backgroundColor',
      lessLightHover: '.tertiary__backgroundColor--lessLightHover',
      selected: '.tertiary__backgroundColor--selected',
      menuHover: '.tertiary__backgroundColor--menuHover',
    },
    quaternary__backgroundColor: {
      base: '.quaternary__backgroundColor',
      lessLightHover: '.quaternary__backgroundColor--lessLightHover',
      selected: '.quaternary__backgroundColor--selected',
      menuHover: '.quaternary__backgroundColor--menuHover',
    },
    quinary__backgroundColor: {
      base: '.quinary__backgroundColor',
      lessLightHover: '.quinary__backgroundColor--lessLightHover',
      selected: '.quinary__backgroundColor--selected',
      menuHover: '.quinary__backgroundColor--menuHover',
    },
  };

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

      setTimeout(() => {
        // insertProjectsDOM(ruanMoraesRepositories);
      }, 1 * 1000);
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
    loadingProjects.classList.add('primary__color');
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

    projectsCounter.innerHTML = `<p>Total de projetos: <strong class="primary__color">${ruanMoraesRepositories.length}</strong></p>`;
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
      page.setAttribute('href', '#myProjects');
      page.setAttribute('role', 'button');
      page.classList.add('projects__paginationItem');
      page.classList.add('primary__backgroundColor--lessLightHover');
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
          <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="primary__backgroundColor--hover">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <div class="separator--page"></div>
          <a href="${projectUrl}" target="_blank" rel="noopener noreferrer" class="primary__backgroundColor--hover">
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

    projectsPagination[0].classList.add('primary__backgroundColor--selected');
    projectsPages[0].classList.add('projects__pageIsDisplayed');
  }

  function whichPageToDisplayAcessibility(page) {
    const projectsPages = document.querySelectorAll('.projects__page');
    const projectsPagination = document.querySelectorAll(
      '.projects__paginationItem'
    );

    for (let i = 0; i < projectsPagination.length; i++) {
      projectsPagination[i].classList.remove(
        'primary__backgroundColor--selected'
      );
      projectsPages[i].classList.remove('projects__pageIsDisplayed');

      if (projectsPagination[i] === page) {
        projectsPagination[i].classList.add(
          'primary__backgroundColor--selected'
        );
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
            'primary__backgroundColor--selected'
          );
          projectsPages[i].classList.remove('projects__pageIsDisplayed');
        }

        projectsPagination[i].classList.add(
          'primary__backgroundColor--selected'
        );
        projectsPages[i].classList.add('projects__pageIsDisplayed');

        AOS.refresh();
      });
    }
  }

  function errorGitHubAPI() {
    const projectsContents = document.querySelector('.projects__contents');

    const errorMessage =
      '<h3>Ocorreu um problema ao tentar carregar projetos do GitHub! Por favor, tente mais tarde.</h3>';
    const errorIcon =
      '<i class="fas fa-exclamation-triangle primary__color"></i>';

    projectsContents.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
  }
});
