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
  // if (
  //   window.location.href ===
  //   'https://ruan-moraes.github.io/Portifolio-V1/myhistory.html'
  // ) {
  //   changeMyHistoryText();
  // }

  // if (
  //   window.location.href ===
  //   'https://ruan-moraes.github.io/Portifolio-V1/certificates.html'
  // ) {
  //   changeCertificatesText();
  // }

  // if (
  //   window.location.href === 'https://ruan-moraes.github.io/Portifolio-V1/' ||
  //   window.location.href ===
  //     'https://ruan-moraes.github.io/Portifolio-V1/index.html' ||
  //   window.location.href ===
  //     'https://ruan-moraes.github.io/Portifolio-V1/index.html#myProjects'
  // ) {
  //   changeTextIndex();
  // }

  if (window.location.href === 'http://127.0.0.1:5500/myhistory.html') {
    changeMyHistoryText();
  }

  if (window.location.href === 'http://127.0.0.1:5500/certificates.html') {
    changeCertificatesText();
  }

  if (
    window.location.href === 'http://127.0.0.1:5500/' ||
    window.location.href === 'http://127.0.0.1:5500/index.html' ||
    window.location.href === 'http://127.0.0.1:5500/index.html#myProjects'
  ) {
    changeTextIndex();
  }

  function changeMyHistoryText() {
    changeHeaderText();
    changeFooterNavigationLinksText();
    changeFooterContactsText();
    changeFooterCopyText();

    changeTitleTextOfMyHistory();
    changeSubTitleText();
    changeContentText();

    function changeTitleTextOfMyHistory() {
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__header > .myHistory__title > h2'
      ).textContent = 'My History';
    }

    function changeSubTitleText() {
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(1) > .myHistory__subTitle > h3'
      ).textContent = 'First Contact with Technology';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__subTitle > h3'
      ).textContent = 'First Steps';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__subTitle > h3'
      ).textContent =
        'Buying my First Computer and an Interest in Programming ';
    }

    function changeContentText() {
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(1) > .myHistory__text > p'
      ).innerHTML =
        'My journey into technology began when I was 8 years old. At that time, my father had a computer that he used for work, but occasionally I could play on the computer. I really enjoyed watching Minecraft videos on YouTube. I loved watching VenonExtreme, Monark, TrazeCraft, and other Minecraft YouTubers. That&lsquo;s when I started getting interested in games, and through games, I started getting interested in computers.';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__text > p:nth-child(1)'
      ).innerHTML =
        'When I was 9 to 10 years old, my parents had the misfortune of buying a Positivo computer (Intel Celeron 1007u, 2GB RAM, 320GB HD) with Windows 8 pre-installed. The performance was so bad that it took 30 seconds to a minute just to open Google Chrome. That&lsquo;s when I started looking for ways to improve my computer. I tried everything: I downloaded cleaning programs, defragmented the disk, made changes to Windows regedit and even tried downloading a virtual video card (yes, I did), but obviously nothing worked. Over time, I learned more and more about computers. ';
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__text > p:nth-child(2)'
      ).innerHTML =
        'At the end of my 11 years, I had my first contact with programming in a Python course by Gustavo Guanabara that I saw on YouTube. I took a few classes and learned the basics of Python, but as the IDEs were too heavy for my computer, I couldn&lsquo;t continue with the course. That&lsquo;s when I started wanting to have a better computer and be able to program without any problems. It was around this time that I started to like hardware, because I had a friend who also liked computers, and he taught me a lot about hardware, and that&lsquo;s when I started to like hardware.';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__text > p:nth-child(1)'
      ).innerHTML =
        'As time passed and I kept learning more about computers, I began to format computers for friends and family, thus gaining experience. However, it wasn&lsquo;t until 2022, pooling all my savings and with the help of my father, that I managed to buy my first computer, a computer I assembled myself, featuring a Xeon E5-2650v2, 16GB of RAM, and a GTX 1660TI. It was a huge joy for me because I not only bought a computer but also assembled it. It was a real sense of accomplishment. I spent a lot of time gaming on this computer, and it was during this period that I started to regain interest in programming.';
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__text > p:nth-child(2)'
      ).innerHTML =
        'I have to confess that the salary for programming is very attractive and the possibility of working from home is very good - these factors attracted me to the technology market. I started studying with these aspects in mind, but over time I became more and more interested in programming. Today, I always like to learn something new. I intend to be a somewhat generalist professional, but my main focus is working with web development (Front-End and Back-End) and mobile.';
    }
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
      '.footer > .container > .footer__copy > .footer__title h2 span'
    ).innerHTML = 'Portfolio Of';
    document.querySelector(
      '.footer > .container > .footer__copy > div:nth-child(2) > p > span:nth-child(1)'
    ).textContent = 'All rights reserved';
  }
}

function changeEachTextToPortuguese() {
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
}
