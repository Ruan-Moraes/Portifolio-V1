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

  // * Lógica para cancelar as opções de configurações que foram alteradas

  const cancelSettings = document.querySelector('#settingsCancel');

  cancelSettings.addEventListener('click', () => {
    animationGear();
    showblurOnBody();
    showSettings();
    disableTextSelection();
    changePageScrollingState();
  });

  // function reset

  // * Lógica para os selects customizados

  const select = document.querySelectorAll('select');

  select.forEach((selectionElement) => {
    hideTheSelectionElement(selectionElement);

    const parentElementOfTheSelection =
      selectTheParentElement(selectionElement);
    const listOfOptions = createListOfOptions(parentElementOfTheSelection);

    addOptions(listOfOptions, selectionElement);
    AddShowOrHideEventInTheOptions(selectionElement);

    showFirstSelectedOption(selectionElement, parentElementOfTheSelection);

    addOptionSelectionEvent(listOfOptions);
  });

  addColorsToTheOptions();
  addEventToCloseSelect();

  function hideTheSelectionElement(selectionElement) {
    selectionElement.classList.add('selectHidden');
  }

  function selectTheParentElement(selectionElement) {
    const parentElementOfTheSelectionDOM = selectionElement.parentElement;
    parentElementOfTheSelectionDOM.setAttribute('tabindex', '0');

    // TODO - Adicionar a função de acessibilidade para o teclado

    return parentElementOfTheSelectionDOM;
  }

  function createListOfOptions(parentElementOfTheSelection) {
    const listOfOption = document.createElement('ul');
    listOfOption.classList.add('listOfOptions');

    parentElementOfTheSelection.appendChild(listOfOption);

    return listOfOption;
  }

  function showFirstSelectedOption(
    selectionElement,
    parentElementOfTheSelection
  ) {
    const firstOptionSelected = document.createElement('div');
    firstOptionSelected.classList.add('selectedItem');
    firstOptionSelected.textContent = selectionElement.children[0].textContent;

    parentElementOfTheSelection.appendChild(firstOptionSelected);
  }

  function addOptions(listOfOptions, selectionElement) {
    const totalNumberOfOptions = selectionElement.children.length;

    for (let i = 0; i < totalNumberOfOptions; i++) {
      const optionItem = document.createElement('li');
      optionItem.textContent = selectionElement.children[i].textContent;
      optionItem.setAttribute('tabindex', '0');

      listOfOptions.appendChild(optionItem);
    }
  }

  function AddShowOrHideEventInTheOptions(selectionElement) {
    selectionElement.parentElement.addEventListener('click', () => {
      selectionElement.parentElement.children[1].classList.toggle('show');
    });

    // TODO - Adicionar a função de acessibilidade para o teclado

    selectionElement.parentElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        selectionElement.parentElement.children[1].classList.toggle('show');
      }
    });
  }

  function addOptionSelectionEvent() {
    const options = document.querySelectorAll('.listOfOptions > li');

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const selectedItem = option.parentElement.parentElement.children[2];
        const selectedOption = option.textContent;

        selectedItem.textContent = selectedOption;
      });
    });

    options.forEach((option) => {
      option.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const selectedItem = option.parentElement.parentElement.children[2];
          const selectedOption = option.textContent;

          selectedItem.textContent = selectedOption;
        }
      });
    });
  }

  function addColorsToTheOptions() {
    const options = document.querySelectorAll('.listOfOptions > li');

    options.forEach((option) => {
      const optionText = option.textContent;
      const optionColor = optionText.match(/#[0-9A-Fa-f]{6}/g);

      option.style.color = optionColor;
    });
  }

  function addEventToCloseSelect() {
    const selects = document.querySelectorAll('.selectHidden');

    document.addEventListener('click', (event) => {
      selects.forEach((select) => {
        const selectParent = select.parentElement;
        const selectOptions = selectParent.children[1];

        if (
          selectOptions.classList.contains('show') &&
          !selectParent.contains(event.target)
        ) {
          selectOptions.classList.remove('show');
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          selects.forEach((select) => {
            const selectParent = select.parentElement;
            const selectOptions = selectParent.children[1];

            if (
              selectOptions.classList.contains('show') &&
              !selectParent.contains(event.target)
            ) {
              selectOptions.classList.remove('show');
            }
          });
        }
      });
    });
  }

  // * Capturar as configurações do usuário e aplicar no site

  const settingsApply = document.querySelector('#settingsApply');

  settingsApply.addEventListener('click', () => {
    const selectedOptions = document.querySelectorAll('.selectedItem');

    const selectedTheme = selectedOptions[0];
    const selectedColor = selectedOptions[1];
    const selectedLanguage = selectedOptions[2];

    const selectedThemeValue = selectedTheme.textContent;
    const selectedColorValue = selectedColor.textContent;
    const selectedLanguageValue = selectedLanguage.textContent;

    applyTheme(selectedThemeValue);
    applyColor(selectedColorValue);
    applyLanguage(selectedLanguageValue);
  });

  // * Lógica para mudar o tema do site
  // TODO - Andamento

  function applyTheme(selectedThemeValue) {}

  // * Lógica para mudar as cores do site

  function applyColor(selectedColorValue) {
    const selectedColor =
      whatIsTheHexadecimalColorInTheTable(selectedColorValue);
    const currentColor = whatIsTheCurrentColor();

    if (selectedColor === currentColor) {
      return;
    }

    if (selectedColor !== currentColor) {
      changeColors(selectedColor, currentColor);
      changeColorsBackground(selectedColor, currentColor);
    }
  }

  function whatIsTheHexadecimalColorInTheTable(selectedColorValue) {
    const colorTable = {
      '#FF5F5A': 'quaternary',
      '#FFBE2E': 'quinary',
      '#2ACA44': 'senary',
      '#2E60F2': 'septenary',
      '#662EF2': 'octonary',
    };

    const colorHexadecimal = treatValueOfSelectedColor(selectedColorValue);
    const colorName = colorTable[colorHexadecimal];

    return colorName;
  }

  function treatValueOfSelectedColor(selectedColorValue) {
    const colorHexadecimal = selectedColorValue.match(/#[0-9A-Fa-f]{6}/g);

    return colorHexadecimal[0];
  }

  function whatIsTheCurrentColor() {
    const quaternaryColor = document.querySelector('.quaternary__color')
      ? true
      : false;
    const quinaryColor = document.querySelector('.quinary__color')
      ? true
      : false;
    const senaryColor = document.querySelector('.senary__color') ? true : false;
    const septenaryColor = document.querySelector('.septenary__color')
      ? true
      : false;
    const octonaryColor = document.querySelector('.octonary__color')
      ? true
      : false;

    if (quaternaryColor) {
      return 'quaternary';
    }

    if (quinaryColor) {
      return 'quinary';
    }

    if (senaryColor) {
      return 'senary';
    }

    if (septenaryColor) {
      return 'septenary';
    }

    if (octonaryColor) {
      return 'octonary';
    }
  }

  function changeColors(selectedColor, currentColor) {
    const colorBase = document.querySelectorAll(`.${currentColor}__color`);
    const colorHover = document.querySelectorAll(
      `.${currentColor}__color--hover`
    );

    colorBase.forEach((element) => {
      element.classList.remove(`${currentColor}__color`);
      element.classList.add(`${selectedColor}__color`);
    });

    colorHover.forEach((element) => {
      element.classList.remove(`${currentColor}__color--hover`);
      element.classList.add(`${selectedColor}__color--hover`);
    });
  }

  function changeColorsBackground(selectedColor, currentColor) {
    const colorBackgroundBase = document.querySelectorAll(
      `.${currentColor}__backgroundColor`
    );
    const colorBackgroudHover = document.querySelectorAll(
      `.${currentColor}__backgroundColor--hover`
    );
    const colorBackgroundSelected = document.querySelectorAll(
      `.${currentColor}__backgroundColor--selected`
    );
    const colorBackgroundLessLightHover = document.querySelectorAll(
      `.${currentColor}__backgroundColor--lessLightHover`
    );
    const colorBackgroundMenuHover = document.querySelectorAll(
      `.${currentColor}__backgroundColor--menuHover`
    );
    const colorBackgroundMenuActive = document.querySelectorAll(
      `.${currentColor}__backgroundColor--menuActive`
    );

    colorBackgroundBase.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor`);
      element.classList.add(`${selectedColor}__backgroundColor`);
    });

    colorBackgroudHover.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor--hover`);
      element.classList.add(`${selectedColor}__backgroundColor--hover`);
    });

    colorBackgroundSelected.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor--selected`);
      element.classList.add(`${selectedColor}__backgroundColor--selected`);
    });

    colorBackgroundLessLightHover.forEach((element) => {
      element.classList.remove(
        `${currentColor}__backgroundColor--lessLightHover`
      );
      element.classList.add(
        `${selectedColor}__backgroundColor--lessLightHover`
      );
    });

    colorBackgroundMenuHover.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor--menuHover`);
      element.classList.add(`${selectedColor}__backgroundColor--menuHover`);
    });

    colorBackgroundMenuActive.forEach((element) => {
      element.classList.remove(`${currentColor}__backgroundColor--menuActive`);
      element.classList.add(`${selectedColor}__backgroundColor--menuActive`);
    });
  }

  // * Lógica para mudar o idioma do site
  // TODO - Andamento

  function applyLanguage(selectedLanguageValue) {}

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
