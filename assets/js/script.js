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
    const blurOnMain = document.querySelector('.blurOnMain');

    blurOnMain.classList.toggle('blurOnMainIsActivated');
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
  const blurOnBody = document.querySelector('.blurOnBody');
  const exitSettingsButton = document.querySelector(
    '.settings__header > .fa-xmark'
  );

  [gear, blurOnBody, exitSettingsButton].forEach((element) => {
    element.addEventListener('click', () => {
      CheckIfMenuIsActive();
      animationGear();
      showblurOnBody();
      showSettings();
      disableTextSelection();
      changePageScrollingState();
    });

    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        CheckIfMenuIsActive();
        animationGear();
        showblurOnBody();
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

  function showblurOnBody() {
    blurOnBody.classList.toggle('blurOnBodyIsActivated');
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

  document.querySelectorAll('select').forEach((selectionElement) => {
    hideTheSelectionElement(selectionElement);

    const parentElementOfTheSelection =
      selectTheParentElement(selectionElement);
    const listOfOptions = createListOfOptions(parentElementOfTheSelection);

    showFirstSelectedOption(selectionElement, parentElementOfTheSelection);
    addOptions(listOfOptions, selectionElement);
    addEventShowOrHideOptions(selectionElement);
    addOptionColor();

    checkIfNoSelectionIsOpen();

    changeTheSelectedOption(listOfOptions);
  });

  function hideTheSelectionElement(selectionElement) {
    selectionElement.classList.add('selectHidden');
  }

  function selectTheParentElement(selectionElement) {
    const parentElementOfTheSelectionDOM = selectionElement.parentElement;
    parentElementOfTheSelectionDOM.setAttribute('tabindex', '0');

    // TODO - Adicionar a função de acessibilidade para o teclado

    return parentElementOfTheSelectionDOM;
  }

  function showFirstSelectedOption(
    selectionElement,
    parentElementOfTheSelection
  ) {
    const firstOptionSelected = document.createElement('div');
    firstOptionSelected.classList.add('selectedItem');
    firstOptionSelected.textContent = selectionElement.children[0].textContent;

    parentElementOfTheSelection.appendChild(firstOptionSelected);

    return firstOptionSelected;
  }

  function createListOfOptions(parentElementOfTheSelection) {
    const listOfOptionDOM = document.createElement('ul');
    listOfOptionDOM.classList.add('listOfOptions');

    parentElementOfTheSelection.appendChild(listOfOptionDOM);

    return listOfOptionDOM;
  }

  function addOptions(listOfOptions, selectionElement) {
    const totalNumberOfOptions = selectionElement.children.length;

    for (let i = 0; i < totalNumberOfOptions; i++) {
      const optionItem = document.createElement('li');
      optionItem.textContent = selectionElement.children[i].textContent;

      listOfOptions.appendChild(optionItem);

      if (selectionElement.children[i].selected) {
        optionItem.classList.add('selected');
      }
    }
  }

  function addOptionColor() {
    const options = document.querySelectorAll('.listOfOptions > li');

    options.forEach((option) => {
      const optionText = option.textContent;
      const optionColor = optionText.match(/#[0-9A-Fa-f]{6}/g);

      if (optionColor) {
        option.style.color = optionColor;
      }
    });
  }

  function addEventShowOrHideOptions(selectionElement) {
    console.log(selectionElement.parentElement);
    selectionElement.parentElement.addEventListener('click', () => {
      selectionElement.parentElement.children[1].classList.toggle('show');
    });

    // TODO - Adicionar a função de acessibilidade para o teclado
  }

  // TODO -  Criar a lógica para fechar o select ao clicar em outro select ou fora do select

  function checkIfNoSelectionIsOpen() {}

  function changeTheSelectedOption() {
    const options = document.querySelectorAll('.listOfOptions > li');

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const selectedOption = option.textContent;
        const selectedItem = option.parentElement.parentElement.children[2];

        selectedItem.textContent = selectedOption;
      });
    });
  }

  // * Lógica para mudar o tema do site

  // * Lógica para mudar as cores do site

  const colors = {
    quaternary__color: {
      base: '.quaternary__color',
      hover: '.quaternary__color--hover',
    },
    quinary__color: {
      base: '.quinary__color',
      hover: '.quinary__color--hover',
    },
    senary__color: {
      base: '.senary__color',
      hover: '.senary__color--hover',
    },
    septenary__color: {
      base: '.septenary__color',
      hover: '.septenary__color--hover',
    },
    octonary__color: {
      base: '.octonary__color',
      hover: '.octonary__color--hover',
    },
  };

  const colorsBackground = {
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
    },
    senary__backgroundColor: {
      base: '.senary__backgroundColor',
      lessLightHover: '.senary__backgroundColor--lessLightHover',
      selected: '.senary__backgroundColor--selected',
    },
    septenary__backgroundColor: {
      base: '.septenary__backgroundColor',
      lessLightHover: '.septenary__backgroundColor--lessLightHover',
      selected: '.septenary__backgroundColor--selected',
    },
    octonary__backgroundColor: {
      base: '.octonary__backgroundColor',
      lessLightHover: '.octonary__backgroundColor--lessLightHover',
      selected: '.octonary__backgroundColor--selected',
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
        showblurOnBody();
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
        showblurOnBody();
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
        insertProjectsDOM(ruanMoraesRepositories);
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
    loadingProjects.classList.add('quaternary__color');
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

    projectsCounter.innerHTML = `<p>Total de projetos: <strong class="quaternary__color">${ruanMoraesRepositories.length}</strong></p>`;
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
      page.classList.add('quaternary__backgroundColor--lessLightHover');
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
          <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="quaternary__backgroundColor--hover">
            <i class="fab fa-github"></i>
            <span>GitHub</span>
          </a>
          <div class="separator--page"></div>
          <a href="${projectUrl}" target="_blank" rel="noopener noreferrer" class="quaternary__backgroundColor--hover">
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

    projectsPagination[0].classList.add(
      'quaternary__backgroundColor--selected'
    );
    projectsPages[0].classList.add('projects__pageIsDisplayed');
  }

  function whichPageToDisplayAcessibility(page) {
    const projectsPages = document.querySelectorAll('.projects__page');
    const projectsPagination = document.querySelectorAll(
      '.projects__paginationItem'
    );

    for (let i = 0; i < projectsPagination.length; i++) {
      projectsPagination[i].classList.remove(
        'quaternary__backgroundColor--selected'
      );
      projectsPages[i].classList.remove('projects__pageIsDisplayed');

      if (projectsPagination[i] === page) {
        projectsPagination[i].classList.add(
          'quaternary__backgroundColor--selected'
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
            'quaternary__backgroundColor--selected'
          );
          projectsPages[i].classList.remove('projects__pageIsDisplayed');
        }

        projectsPagination[i].classList.add(
          'quaternary__backgroundColor--selected'
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
      '<i class="fas fa-exclamation-triangle quaternary__color"></i>';

    projectsContents.innerHTML = `<div class="error">${errorIcon} ${errorMessage}</div>`;
  }
});
