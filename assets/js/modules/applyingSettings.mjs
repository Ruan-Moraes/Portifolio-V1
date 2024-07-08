'use strict';

import {
  changePageScrollingState,
  showBlurOnBody,
  getSelectedOptionLocalStorage,
  setSelectedOptionLocalStorage,
} from './others.mjs';
import {
  animationGear,
  showSettings,
  disableTextSelection,
} from './settings.mjs';
import { whatIsTheCurrentColor } from './others.mjs';

window.addEventListener('DOMContentLoaded', () => {
  const selectedOptions = getSelectedOptionLocalStorage();

  if (!selectedOptions) {
    return;
  }

  const selectedThemeValue = selectedOptions[0];
  const selectedColorValue = selectedOptions[1];
  const selectedLanguageValue = selectedOptions[2];

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

    applyTheme(selectedTheme);
    applyColor(selectedColor);
    applyLanguage(selectedLanguage);

    setSelectedOptionLocalStorage(
      selectedTheme,
      selectedColor,
      selectedLanguage
    );

    animationGear();
    showBlurOnBody();
    showSettings();
    disableTextSelection();
    changePageScrollingState();
  });
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

  return colorTable[colorHexadecimal];
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
  changeHeaderText();
  changeFooterNavigationLinksText();
  changeFooterContactsText();
  changeFooterCopyText();

  try {
    changeTextIndex();
  } catch (error) {
    console.clear();
  }

  try {
    changeMyHistoryText();
  } catch (error) {
    console.clear();
  }

  try {
    changeCertificatesText();
  } catch (error) {
    console.clear();
  }

  function changeTextIndex() {
    changeApresentationText();
    changeAboutMeText();
    changeProjectsText();
    changeServicesText();

    function changeApresentationText() {
      document.querySelector('.apresentation > h2 > span').textContent =
        'Hi, I am a future';
      document.querySelector('.apresentation > h2 > strong').textContent =
        'Full-Stack Developer';

      document.querySelector(
        '.apresentation > p > span:nth-child(1)'
      ).textContent = 'Looking for my first opportunity as a';
      document.querySelector(
        '.apresentation > p > strong:nth-child(2)'
      ).textContent = 'Intern,';
      document.querySelector(
        '.apresentation > p > span:nth-child(3)'
      ).textContent = 'or even as an ';
      document.querySelector(
        '.apresentation > p > strong:nth-child(4)'
      ).textContent = 'full-stack developer,';
      document.querySelector(
        '.apresentation > p > span:nth-child(5)'
      ).textContent = 'my focus is on specializing in';
      document.querySelector(
        '.apresentation > p > strong:nth-child(6)'
      ).textContent = 'web';
      document.querySelector(
        '.apresentation > p > span:nth-child(7)'
      ).textContent = 'and ';
      document.querySelector(
        '.apresentation > p > strong:nth-child(8)'
      ).textContent = 'mobile development,';
      document.querySelector(
        '.apresentation > p > span:nth-child(9)'
      ).textContent = ' as well as acquiring knowledge in';
      document.querySelector(
        '.apresentation > p > strong:nth-child(10)'
      ).textContent = 'cybersecurity.';

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

      const loadingProjects = document.querySelector(
        '.main__projects > .container > .projects > .projects__loadingProjects'
      );

      if (loadingProjects) {
        setTimeout(() => {
          loadingProjects.innerHTML = `<p>Loading Projects...</p>`;
        }, 0);
      }
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
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__footer a'
      ).href =
        "https://wa.me/5531993112958?text=Hello%2C%20I'm%20interested%20in%20Web%20Development%20services%20and%20would%20like%20to%20know%20if%20you%20do%20this%20type%20of%20work.%20If%20so%2C%20would%20you%20be%20available%20to%20start%20and%20what%20would%20be%20the%20estimated%20time%3F";

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__header > .services__title > h3'
      ).textContent = 'Mobile Development';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__body > .services__description p'
      ).textContent =
        'Development of mobile applications for Android and IOS using Flutter.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__footer a'
      ).href =
        "https://wa.me/5531993112958?text=Hello%2C%20I'm%20looking%20for%20Mobile%20Development%20services%20and%20would%20like%20to%20know%20if%20you%20do%20this%20type%20of%20work.%20If%20so%2C%20would%20you%20be%20available%20to%20start%20and%20what%20would%20be%20the%20estimated%20time%3F";

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__header > .services__title > h3'
      ).textContent = 'Cybersecurity';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__body > .services__description p'
      ).textContent =
        'Vulnerability analysis, intrusion testing and data protection.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Hello%2C%20I%20am%20interested%20in%20Cybersecurity%20services%20and%20would%20like%20to%20know%20if%20you%20offer%20this%20type%20of%20work.%20If%20so%2C%20could%20you%20provide%20me%20with%20more%20information%20about%20your%20services%20and%20what%20approach%20you%20would%20use%20in%20my%20case%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__header > .services__title > h3'
      ).textContent = 'API Development and Maintenance';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__body > .services__description p'
      ).textContent =
        'Development and maintenance of APIs for integration with other systems.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Hello%2C%20I%20am%20interested%20in%20API%20Development%20and%20Maintenance%20services%20and%20would%20like%20to%20know%20if%20you%20offer%20this%20type%20of%20work.%20If%20so%2C%20could%20you%20provide%20me%20with%20more%20information%20about%20your%20services%20and%20what%20approach%20you%20would%20use%20in%20my%20case%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__header > .services__title > h3'
      ).textContent = 'Database Management';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__body > .services__description p'
      ).textContent =
        'Development, maintenance and optimization of relational (SQL) and non-relational (NoSQL) databases.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__footer a'
      ).href =
        "https://wa.me/5531993112958?text=Hi%2C%20I'm%20interested%20in%20Relational%20and%20Non-Relational%20Database%20Development%20and%20Maintenance%20services.%20Could%20you%20provide%20me%20with%20more%20information%20about%20the%20services%20you%20offer%20in%20this%20area%3F";

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__header > .services__title > h3'
      ).textContent = 'Systems Maintenance';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__body > .services__description p'
      ).textContent =
        'Performing maintenance, refactoring / optimization, technology migration and error correction on various types of systems.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__footer a'
      ).href =
        "https://wa.me/5531993112958?text=Hello%2C%20I'm%20interested%20in%20the%20service%20of%20Web%20and%20Mobile%20Systems%20Maintenance%2C%20Bug%20Fixing%20and%20Updates.%20Could%20you%20give%20me%20more%20information%20about%20how%20you%20handle%20these%20tasks%20and%20what%20the%20work%20process%20is%3F";

      document
        .querySelectorAll(
          '.main__services > .container > .services > .services__item > .services__footer > a'
        )
        .forEach((element) => {
          element.textContent = 'Resquet Service';
        });
    }
  }

  function changeMyHistoryText() {
    changeTitleTextOfMyHistory();
    changeSubTitleText();
    changeContentText();

    function changeTitleTextOfMyHistory() {
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__header > .myHistory__title > h2'
      ).textContent = 'A Little About Me';
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
        'It could be said that my journey with technology began at the age of 8 to 9, at that time my father had a computer which he used for work, but from time to time I could the computer to watch videos. I really liked watching Minecraft videos on YouTube. I really liked watching VenonExtreme, Monark and so on. It was around this time that a small passion was born, not for computers, but forgames.';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__text > p:nth-child(1)'
      ).innerHTML =
        "When I was 10 years old, my parents fell for a sales assistant at casas bahia and bought me a big positivo with an Intel Celeron 1007u processor, 2GB of RAM and a 320GB hard drive. The computer came with Windows 8 pre-installed, and the performance was so bad that it took 15 to 45 seconds just to open Google Chrome. That's when I started looking for ways to improve the computer. I tried everything: I downloaded cleaning programs, defragmented the disk, made changes to Windows regedit and even tried downloading a virtual video card (yes, I did), but obviously nothing worked. Over time, in all this stress, I ended up learning a lot about computers, and that's when I started to like computers.";
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__text > p:nth-child(2)'
      ).innerHTML =
        "When I was about 12 years old, I had my first contact with programming in a Python course by Gustavo Guanabara (very brave) that I saw on YouTube. I took a few classes and learned the basics of Python, but as the IDEs were too heavy for my computer, I couldn't continue with the course. After that, I became a bit disinterested in programming, or rather, technology in general. However, there was a friend in my class who liked computers, and it was he who taught me a lot about hardware, and that's when I started to like hardware. So I started following hardware channels on YouTube, MW Informática, Adrenaline and so on.";

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__text > p:nth-child(1)'
      ).innerHTML =
        "As time went by and I learned more and more about computers, I started formatting friends' and family members' computers, which gave me a lot of experience. It was around this time that the famous Xeons started appearing on the second-hand market, and I became very interested in these processors, as they were very cheap and had very good performance. That's when I started saving money to buy a computer, and halfway through high school, with my father's help, I bought my first computer, a computer I built myself, with a Xeon E5-2650v2, 16GB of RAM and a GTX 1660TI. I was so happy that I didn't go to class for almost a week and my mother found out and it almost went wrong.";
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__text > p:nth-child(2)'
      ).innerHTML =
        "I spent the rest of 2022 playing, but as I was a bearded 18-year-old, I started to think about what I wanted out of life. That's when I started looking for areas I could work in and I found out about programming. I confess that I got into it because of the hype about high salaries and home office, but over time I really enjoyed coding, and it became one of my hobbies.";
    }
  }

  function changeCertificatesText() {
    translateText('pt', 'en');
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

  async function translateText(source, target) {
    const elements = document.querySelectorAll('[data-translate]');
    const elementsText = Array.from(elements).map((element) =>
      element.textContent.trim()
    );

    try {
      const response = await fetch('http://localhost:8080/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ source, target, elementsText }),
      }).then((response) => response.json());

      const translatedText = await textTreatment(response.translated);

      elements.forEach((element, index) => {
        element.textContent = translatedText[index];
      });
    } catch (error) {
      console.error(
        `Ocorreu um erro ao traduzir os elementos: ${error.message}`
      );
    }
  }

  async function textTreatment(text) {
    return await text.map((text) => text.replace(/\n|\t|\nof/g, ' ').trim());
  }
}

function changeEachTextToPortuguese() {
  changeHeaderText();
  changeFooterNavigationLinksText();
  changeFooterContactsText();
  changeFooterCopyText();

  try {
    changeTextIndex();
  } catch (error) {
    console.clear();
  }

  try {
    changeMyHistoryText();
  } catch (error) {
    console.clear();
  }

  try {
    changeCertificatesText();
  } catch (error) {
    console.clear();
  }

  function changeTextIndex() {
    changeApresentationText();
    changeAboutMeText();
    changeProjectsText();
    changeServicesText();

    function changeApresentationText() {
      document.querySelector('.apresentation > h2 > span').textContent =
        'Olá, eu sou um futuro';
      document.querySelector('.apresentation > h2 > strong').textContent =
        'Desenvolvedor Full-Stack';

      document.querySelector(
        '.apresentation > p > span:nth-child(1)'
      ).textContent = 'Buscando minha primeira oportunidade como';
      document.querySelector(
        '.apresentation > p > strong:nth-child(2)'
      ).textContent = 'estagiário,';
      document.querySelector(
        '.apresentation > p > span:nth-child(3)'
      ).textContent = 'ou até mesmo como';
      document.querySelector(
        '.apresentation > p > strong:nth-child(4)'
      ).textContent = 'desenvolvedor full-stack,';
      document.querySelector(
        '.apresentation > p > span:nth-child(5)'
      ).textContent = 'meu foco está em me especializar em';
      document.querySelector(
        '.apresentation > p > strong:nth-child(6)'
      ).textContent = 'desenvolvimento web';
      document.querySelector(
        '.apresentation > p > span:nth-child(7)'
      ).textContent = 'e';
      document.querySelector(
        '.apresentation > p > strong:nth-child(8)'
      ).textContent = ' mobile,';
      document.querySelector(
        '.apresentation > p > span:nth-child(9)'
      ).textContent = ' além de adquirir conhecimentos em';
      document.querySelector(
        '.apresentation > p > strong:nth-child(10)'
      ).textContent = 'cibersegurança.';

      document.querySelector('.apresentation > a').textContent = 'Baixar CV';
    }

    function changeAboutMeText() {
      document
        .querySelectorAll('.aboutMe__lines > span > span')
        .forEach((element) => {
          element.textContent = 'Linha';
        });
      document.querySelector(
        '.aboutMe__content > div:nth-child(1) > h2'
      ).textContent = 'minhaPessoa';
      document.querySelector(
        '.aboutMe__content > p:nth-child(2) > span:nth-child(1)'
      ).textContent = 'nome:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(3) > span:nth-child(1)'
      ).textContent = 'anoDeNascimento:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(4) > span:nth-child(1)'
      ).textContent = 'disponivelParaTrabalho:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(5) > span:nth-child(1)'
      ).textContent = 'tecnologias:';
      document.querySelector(
        '.aboutMe__content > p:nth-child(6) > span:nth-child(1)'
      ).textContent = 'ferramentas:';
    }

    function changeProjectsText() {
      document.querySelector(
        '.main__projects > .container > .sectionTitle > h2'
      ).textContent = 'Meus Projetos';

      document.querySelector(
        '.main__projects > .container > .projects > .projects__pagesContainer > div > p'
      ).textContent = 'Total de projetos:';
      setTimeout(() => {
        document
          .querySelectorAll(
            '.main__projects > .container > .projects > .projects__pagination a span'
          )
          .forEach((element, index) => {
            element.textContent = `Página ${index + 1}`;
          });
      }, 1100);

      const loadingProjects = document.querySelector(
        '.main__projects > .container > .projects > .projects__loadingProjects'
      );

      if (loadingProjects) {
        setTimeout(() => {
          loadingProjects.innerHTML = `<p>Carregando Projetos...</p>`;
        }, 0);
      }
    }

    function changeServicesText() {
      document.querySelector(
        '.main__services > .container > .sectionTitle > h2'
      ).textContent = 'Meus serviços';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__header > .services__title > h3'
      ).textContent = 'Desenvolvimento Web';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__body > .services__description p'
      ).textContent =
        'Desenvolvimento de landing pages, sites institucionais, e-commerces e etc.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(1) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20em%20servi%C3%A7os%20de%20Desenvolvimento%20Web%20e%20gostaria%20de%20saber%20se%20voc%C3%AA%20realiza%20esse%20tipo%20de%20trabalho.%20Se%20sim%2C%20estaria%20dispon%C3%ADvel%20para%20iniciar%20e%20qual%20seria%20o%20prazo%20estimado%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__header > .services__title > h3'
      ).textContent = 'Desenvolvimento Mobile';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__body > .services__description p'
      ).textContent =
        'Desenvolvimento de aplicativos mobile para Android e IOS utilizando Flutter.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(2) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20buscando%20servi%C3%A7os%20de%20Desenvolvimento%20Mobile%20e%20gostaria%20de%20saber%20se%20voc%C3%AA%20realiza%20esse%20tipo%20de%20trabalho.%20Se%20sim%2C%20estaria%20dispon%C3%ADvel%20para%20iniciar%20e%20qual%20seria%20o%20prazo%20estimado%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__header > .services__title > h3'
      ).textContent = 'Cibersegurança';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__body > .services__description p'
      ).textContent =
        'Análise de vulnerabilidades, testes de invasão e proteção de dados.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(3) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20em%20servi%C3%A7os%20de%20Ciberseguran%C3%A7a%20e%20gostaria%20de%20saber%20se%20voc%C3%AA%20oferece%20esse%20tipo%20de%20trabalho.%20Se%20sim%2C%20poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20servi%C3%A7os%20e%20qual%20seria%20a%20abordagem%20que%20voc%C3%AA%20usaria%20no%20meu%20caso%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__header > .services__title > h3'
      ).textContent = 'Desenvolvimento e Manuntenção de API';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__body > .services__description p'
      ).textContent =
        'Desenvolvimento e manutenção de APIs para integração com outros sistemas.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(4) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20em%20servi%C3%A7os%20de%20Desenvolvimento%20e%20Manuten%C3%A7%C3%A3o%20de%20API%20e%20gostaria%20de%20saber%20se%20voc%C3%AA%20oferece%20esse%20tipo%20de%20trabalho.%20Se%20sim%2C%20poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es%20sobre%20seus%20servi%C3%A7os%20e%20qual%20seria%20a%20abordagem%20que%20voc%C3%AA%20usaria%20no%20meu%20caso%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__header > .services__title > h3'
      ).textContent = 'Gereciamento de Banco de Dados';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__body > .services__description p'
      ).textContent =
        'Desenvolvimento, manuntenção e otimização de Banco de Dados relacionais (SQL) e não relacionais (NoSQL).';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(5) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20em%20servi%C3%A7os%20de%20Desenvolvimento%20e%20Manuten%C3%A7%C3%A3o%20de%20Bancos%20de%20Dados%20Relacionais%20e%20N%C3%A3o-Relacionais.%20Voc%C3%AA%20poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20que%20voc%C3%AA%20oferece%20nesse%20%C3%A2mbito%3F';

      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__header > .services__title > h3'
      ).textContent = 'Manutenção de Sistemas';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__body > .services__description p'
      ).textContent =
        'Realização de manutenção, refatoração / otimização, migração de tecnologias e correção de erros em vários tipos de sistemas.';
      document.querySelector(
        '.main__services > .container > .services > .services__item:nth-child(6) > .services__footer a'
      ).href =
        'https://wa.me/5531993112958?text=Ol%C3%A1%2C%20estou%20interessado%20no%20servi%C3%A7o%20de%20Manuten%C3%A7%C3%A3o%20de%20Sistemas%20Web%20e%20Mobile%2C%20Corre%C3%A7%C3%A3o%20de%20Bugs%20e%20Atualiza%C3%A7%C3%B5es.%20Voc%C3%AA%20poderia%20me%20fornecer%20mais%20informa%C3%A7%C3%B5es%20sobre%20como%20voc%C3%AA%20lida%20com%20essas%20tarefas%20e%20qual%20%C3%A9%20o%20processo%20de%20trabalho%3F';

      document
        .querySelectorAll(
          '.main__services > .container > .services > .services__item > .services__footer > a'
        )
        .forEach((element) => {
          element.textContent = 'Solicitar Serviço';
        });
    }
  }

  function changeHeaderText() {
    document.querySelector('.header__title > h1 > a').textContent =
      '< Portfólio />';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(1)'
    ).textContent = 'História';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(2)'
    ).textContent = 'Certificados';
    document.querySelector(
      '.header__navigationLinks > a:nth-child(3)'
    ).textContent = 'Projetos';
    document.querySelector('.header__navigationTitle > h2').textContent =
      'Mais Sobre Mim';
    document.querySelector('.header__contactsTitle > h2').textContent =
      'Meus Contatos';
  }

  function changeFooterNavigationLinksText() {
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__title h2'
    ).textContent = 'Links de Navegação';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(1)'
    ).textContent = 'História';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(2)'
    ).textContent = 'Certificados';
    document.querySelector(
      '.footer > .container > .footer__navigationLinks > .footer__links > a:nth-child(3)'
    ).textContent = 'Projetos';
  }

  function changeFooterContactsText() {
    document.querySelector(
      '.footer > .container > .footer__contacts > .footer__title h2'
    ).textContent = 'Informações de Contatos';
    document.querySelector(
      '.footer > .container > .footer__contacts > .footer__tel > h3'
    ).textContent = 'Telefone';
  }

  function changeFooterCopyText() {
    document.querySelector(
      '.footer > .container > .footer__copy > .footer__title h2 span'
    ).innerHTML = 'Portfólio de';
    document.querySelector(
      '.footer > .container > .footer__copy > div:nth-child(2) > p > span:nth-child(1)'
    ).textContent = 'Todos os direitos reservados';
  }
}
