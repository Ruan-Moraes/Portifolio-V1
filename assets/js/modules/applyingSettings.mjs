'use strict';

import { changePageScrollingState, showBlurOnBody } from './others.mjs';
import {
  animationGear,
  showSettings,
  disableTextSelection,
} from './settings.mjs';
import { whatIsTheCurrentColor } from './others.mjs';

window.addEventListener('DOMContentLoaded', () => {
  const settings = JSON.parse(localStorage.getItem('settings'));

  if (!settings) {
    return;
  }

  const selectedThemeValue = settings[0];
  const selectedColorValue = settings[1];
  const selectedLanguageValue = settings[2];

  applyTheme(selectedThemeValue);
  applyColor(selectedColorValue);
  applyLanguage(selectedLanguageValue);
});

export default function applyingSettings() {
  const settingsApplyDOM = document.querySelector('#settingsApply');

  settingsApplyDOM.addEventListener('click', () => {
    const selectedOptions = document.querySelectorAll('.selectedItem');

    const selectedTheme = selectedOptions[0].textContent;
    const selectedColor = selectedOptions[1].textContent;
    const selectedLanguage = selectedOptions[2].textContent;

    savingToLocalStorage(selectedTheme, selectedColor, selectedLanguage);

    applyTheme(selectedTheme);
    applyColor(selectedColor);
    applyLanguage(selectedLanguage);

    animationGear();
    showBlurOnBody();
    showSettings();
    disableTextSelection();
    changePageScrollingState();
  });
}

function savingToLocalStorage(selectedTheme, selectedColor, selectedLanguage) {
  const settings = [selectedTheme, selectedColor, selectedLanguage];

  localStorage.setItem('settings', JSON.stringify(settings));

  return JSON.parse(localStorage.getItem('settings'));
}

// * Lógica para mudar o tema do site

function applyTheme(selectedThemeValue) {} // TODO - Andamento

// * Lógica para mudar as cores do site

function applyColor(selectedColorValue) {
  const selectedColor = whatIsTheHexadecimalColorInTheTable(selectedColorValue);
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
    element.classList.add(`${selectedColor}__backgroundColor--lessLightHover`);
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

function applyLanguage(selectedLanguageValue) {
  const languageTable = {
    Português: 'pt-BR',
    Inglês: 'en-US',
  };

  const selectedLanguage = languageTable[selectedLanguageValue];

  changeTextToSelectedLanguage(selectedLanguage);
}

function changeTextToSelectedLanguage(selectedLanguage) {
  document.querySelector('html').setAttribute('lang', selectedLanguage);

  if (selectedLanguage === 'pt-BR') {
    changeEachTextToPortuguese();
  }

  if (selectedLanguage === 'en-US') {
    changeEachTextToEnglish();
  }
}

function changeEachTextToEnglish() {
  // site vai hospedado no github pages, por isso o pathname é diferente
  // verifique se a url é igual a do github pages
  // https://ruan-moraes.github.io/Portifolio-V1/

  console.log(window.location.href);

  if (
    window.location.href ===
    'https://ruan-moraes.github.io/Portifolio-V1/myhistory.html'
  ) {
    changeMyHistoryText();
  }

  if (
    window.location.href ===
    'https://ruan-moraes.github.io/Portifolio-V1/certificates.html'
  ) {
    changeCertificatesText();
  }

  if (
    window.location.href === 'https://ruan-moraes.github.io/Portifolio-V1/' ||
    window.location.href ===
      'https://ruan-moraes.github.io/Portifolio-V1/index.html' ||
    window.location.href ===
      'https://ruan-moraes.github.io/Portifolio-V1/index.html#myProjects'
  ) {
    changeTextIndex();
  }

  function changeMyHistoryText() {
    changeHeaderText();
    changeFooterNavigationLinksText();
    changeFooterContactsText();
    changeFooterCopyText();
  }

  function changeCertificatesText() {
    changeHeaderText();
    changeFooterNavigationLinksText();
    changeFooterContactsText();
    changeFooterCopyText();
  }

  function changeTextIndex() {
    changeHeaderText();
    changeFooterNavigationLinksText();
    changeFooterContactsText();
    changeFooterCopyText();

    changeApresentationText();
    changeAboutMeText();
    changeProjectsText();
    changeServicesText();

    function changeApresentationText() {
      document.querySelector('.apresentation > h2').innerHTML =
        'Hi, I&lsquo;m a future <span class="quaternary__color">Full-Stack Developer</span>';
      document.querySelector('.apresentation > p').innerHTML = `
          Looking for my first opportunity as a developer <strong class="quaternary__color">full-stack</strong> or even as an <strong class="quaternary__color">intern</strong>, my focus is on specializing in <strong class="quaternary__color">web development</strong> and <strong class="quaternary__color">mobile</strong>, in addition to acquiring knowledge in <strong class="quaternary__color">cybersecurity</strong>.
          `;
      document.querySelector('.apresentation > a').textContent = 'Download CV';
    }

    function changeAboutMeText() {
      document
        .querySelectorAll('.aboutMe__lines > span > span')
        .forEach((element) => {
          element.textContent = 'Line';
        });
      document.querySelector(
        '.aboutMe__content > div:nth-child(1) > h2'
      ).textContent = 'myPerson';
      document.querySelector(
        '.aboutMe__content > p:nth-child(2) > span:nth-child(1)'
      ).textContent = 'name:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(3) > span:nth-child(1)'
      ).textContent = 'yearOfBirth:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(4) > span:nth-child(1)'
      ).textContent = 'availableForWork:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(5) > span:nth-child(1)'
      ).textContent = 'technologies:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(6) > span:nth-child(1)'
      ).textContent = 'tools:';
    }

    function changeProjectsText() {
      document.querySelector(
        '.main__projects > .container > .sectionTitle > h2'
      ).textContent = 'My Projects';
      document.querySelector(
        '.main__projects > .container > .projects > .projects__pagesContainer > div > p'
      ).textContent = 'Total projects:';
      setTimeout(() => {
        document
          .querySelectorAll(
            '.main__projects > .container > .projects > .projects__pagination a span'
          )
          .forEach((element, index) => {
            element.textContent = `Page ${index + 1}`;
          });
      }, 1100);
    }

    function changeServicesText() {
      document.querySelector(
        '.main__services > .container > .sectionTitle > h2'
      ).textContent = 'My services';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__header > .services__title > h3'
      ).textContent = 'Web Development';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__body > .services__description p'
      ).textContent =
        'Development of responsive and optimized websites and web systems.';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__header > .services__title > h3'
      ).textContent = 'Mobile Development';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__body > .services__description p'
      ).textContent =
        'Development of mobile applications for Android and IOS using Flutter.';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__header > .services__title > h3'
      ).textContent = 'Cybersecurity';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__body > .services__description p'
      ).textContent =
        'Vulnerability analysis, intrusion testing and data protection.';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__header > .services__title > h3'
      ).textContent = 'API Development and Maintenance';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__body > .services__description p'
      ).textContent =
        'Development and maintenance of APIs for integration with other systems.';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__header > .services__title > h3'
      ).textContent = 'Database Management';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__body > .services__description p'
      ).textContent =
        'Development, maintenance and optimization of relational (SQL) and non-relational (NoSQL) databases.';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__header > .services__title > h3'
      ).textContent = 'Systems Maintenance';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__body > .services__description p'
      ).textContent =
        'Performing maintenance, refactoring / optimization, technology migration and error correction on various types of systems.';

      document
        .querySelectorAll(
          '.main__services > .container > .services > .services__item > .services__footer > a'
        )
        .forEach((element) => {
          element.textContent = 'Resquet Service';
        });
    }
  }

  function changeHeaderText() {
    document.querySelector('.header__title > h1 > a').textContent =
      '< Portfolio />';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(1)'
    ).textContent = 'History';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(2)'
    ).textContent = 'Certificates';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(3)'
    ).textContent = 'Projects';
    document.querySelector('.header__navigationTitle > h2').textContent =
      'More About Me';
    document.querySelector('.header__contactsTitle > h2').textContent =
      'My Contacts';
  }

  function changeFooterNavigationLinksText() {
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__title h2'
    ).textContent = 'Navigation Links';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(1)'
    ).textContent = 'History';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(2)'
    ).textContent = 'Certificates';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(3)'
    ).textContent = 'Projects';
  }

  function changeFooterContactsText() {
    document.querySelector(
      '.footer > .container > .footer__contacts > .footer__title h2'
    ).textContent = 'Contacts Information';
    document.querySelector(
      '.footer > .container > .footer__contacts > .footer__tel > h3'
    ).textContent = 'Telephone';
  }

  function changeFooterCopyText() {
    document.querySelector(
      '.footer > .container > .footer__copy > .footer__title h2'
    ).innerHTML = 'Ruan Moraes Santos Barbosa&lsquo;s portfolio';
    document.querySelector(
      '.footer > .container > .footer__copy > div:nth-child(2) > p:nth-child(1) > span:nth-child(2)'
    ).textContent = 'All rights reserved';
    document.querySelector(
      '.footer > .container > .footer__copy > div:nth-child(2) > p:nth-child(2) > span:nth-child(1)'
    ).textContent = 'Developed by';
  }
}

function changeEachTextToPortuguese() {
  try {
  } catch (error) {
    console.error(error);
  }
}
