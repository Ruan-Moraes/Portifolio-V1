'use strict';

import translateDynamicTexts from '../../translateAPI.mjs';
import {
  saveTextsInPortugueseInLocalStorage,
  setValuesInLocalStorage,
} from '../../others.mjs';

export default async function changeEachTextToEnglish() {
  document.querySelector('html').setAttribute('lang', 'en-US');

  await changeHeaderText();
  await changeFooterNavigationLinksText();
  await changeFooterContactsText();
  await changeFooterCopyText();
  await changeSettingsText();

  await changeIndexText();
  await changeMyHistoryText();
  await changeCertificatesText();

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

  function changeSettingsText() {
    document.querySelector(
      '.settings > .settings__header > div:nth-child(2) > h2'
    ).textContent = 'Settings';

    document.querySelector(
      '.settings > .settings__body > div:nth-child(1) > h3'
    ).textContent = 'Change Theme - Progress';

    setTimeout(() => {
      document.querySelector(
        '.settings > .settings__body > div:nth-child(1) > .elementOfSelections > .listOfOptions > li:nth-child(1)'
      ).textContent = 'System Theme';
    }, 2000);

    // document.querySelector(
    //   '.settings > .settings__body > div:nth-child(1) > .elementOfSelections > ul > li:nth-child(2)'
    // ).textContent = 'Dark Theme';
    // document.querySelector(
    //   '.settings > .settings__body > div:nth-child(1) > .elementOfSelections > ul > li:nth-child(3)'
    // ).textContent = 'Light Theme';

    // document.querySelector(
    //   '.settings > .settings__body > div:nth-child(2) > h3'
    // ).textContent = 'Change Colors';

    // document.querySelector(
    //   '.settings > .settings__body > div:nth-child(3) > h3'
    // ).textContent = 'Change The Language';
    // document.querySelector(
    //   '.settings > .settings__body > div:nth-child(3) > .elementOfSelections > ul > li:nth-child(1)'
    // ).textContent = 'Default Language';
    // document.querySelector(
    //   '.settings > .settings__body > div:nth-child(3) > .elementOfSelections > ul > li:nth-child(2)'
    // ).textContent = 'Portuguese';
    // document.querySelector(
    //   '.settings > .settings__body > div:nth-child(3) > .elementOfSelections > ul > li:nth-child(3)'
    // ).textContent = 'English';
  }

  // * Funções para mudar o texto de cada página para inglês

  async function changeIndexText() {
    if (
      !window.location.pathname.includes('/index.html') ||
      !window.location.pathname.includes('/')
    ) {
      return;
    }

    await changeApresentationText();
    await changeAboutMeText();
    await changeProjectsText();
    await changeServicesText();

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

    async function changeProjectsText() {
      translateStaticTexts();

      async function translateStaticTexts() {
        document.querySelector(
          '.main__projects > .container > .sectionTitle > h2'
        ).textContent = 'My Projects';

        document.querySelector(
          '.main__projects > .container > .projects > .projects__pagesContainer > div > p'
        ).textContent = 'Total projects:';
        await setTimeout(() => {
          document
            .querySelectorAll(
              '.main__projects > .container > .projects > .projects__pagination a span'
            )
            .forEach((element, index) => {
              element.textContent = `Page ${index + 1}`;
            });
        }, 1100);

        const loadingProjectsDOM = document.querySelector(
          '.main__projects > .container > .projects > .projects__loadingProjects'
        );

        if (loadingProjectsDOM) {
          await setTimeout(() => {
            loadingProjects.innerHTML = `<p>Loading Projects...</p>`;
          }, 0);
        }
      }

      if (localStorage.getItem('translationsProjectsInEnglish')) {
        const allTranslations = JSON.parse(
          localStorage.getItem('translationsProjectsInEnglish')
        );

        const intervalId = setInterval(() => {
          if (document.querySelectorAll('[data-translate]').length !== 0) {
            Array.from(document.querySelectorAll('[data-translate]')).map(
              (element, index) => (element.textContent = allTranslations[index])
            );

            clearInterval(intervalId);
          }
        }, 1000);

        return;
      }

      saveTextsInPortugueseInLocalStorage('translationsProjectsInPortuguese');

      await setValuesInLocalStorage(
        'translationsProjectsInEnglish',
        ...(await translateDynamicTexts('PT', 'EN'))
      );
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

  async function changeMyHistoryText() {
    if (!window.location.pathname.includes('pages/myhistory.html')) return;

    await changeTitleTextOfMyHistory();
    await changeSubTitleText();
    await changeContentText();

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
        'You could say that my journey with technology began when I was 8 to 9 years old. At that time, my father had a computer that he used for work, but every now and then I could touch it to watch videos. I really liked watching Minecraft videos on YouTube. I watched videos of VenomExtreme, Monark and so on. It was around this time that a small passion was born in me, not for computers, but for games';

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__text > p:nth-child(1)'
      ).innerHTML =
        "When I was 10 years old, my parents got a computer, with an Intel Celeron 1007u processor, 2GB of RAM and a 320GB HD. The computer came with Windows 8 pre-installed, and the performance was so poor that it took about 15 to 45 seconds just to open Google Chrome. That's when I started my search for ways to improve the computer. I tried everything... I downloaded cleaning programs, defragmented the disk, made changes to Windows regedit and even tried downloading a virtual video card (yes, I downloaded it), but obviously nothing fixed what was unfixable. Over time, under a lot of stress, I ended up learning a lot about computers, and that's when I started to like computers.";
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(2) > .myHistory__text > p:nth-child(2)'
      ).innerHTML =
        "When I was about 12 years old, I had my first contact with programming in a Python course by Gustavo Guanabara that I saw on YouTube. I took a few classes and learned the basics of Python, but as the IDEs were too heavy for my computer, I couldn't continue with the course. After that, I became a bit disinterested in programming, or rather, technology in general. However, in my class I had a colleague and then friend who was really into games, hardware, computers and so on, and talking to him, I became more and more interested in hardware, and that's when I started researching more and ended up discovering Various channels that talked about the subject, such as: MW Informática, Adrenaline, ChipArt and so on.";

      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__text > p:nth-child(1)'
      ).innerHTML =
        "As time went by, I learned more and more about computers, I started formatting friends' and family members' computers, and with that I gained experience. Around the time of the pandemic, the famous Xeons started appearing on the second-hand market and I became very interested in these processors, as they were very cheap and had very good performance. That's when I started saving money to buy a computer, and halfway through my third year of high school, with the help of my father, I bought my first computer, a computer I built myself, with a Xeon E5-2650v2, 16GB of RAM and a GTX 1660TI.";
      document.querySelector(
        '.main__myHistory > .container > .myHistory > .myHistory__body > .myHistory__section:nth-child(3) > .myHistory__text > p:nth-child(2)'
      ).innerHTML =
        "I spent the rest of 2022 playing, but as I was a bearded 18-year-old, I started to think about what I wanted out of life. That's when I started looking into areas I could work in and I learned about programming. I confess that I got into it because of the hype about high salaries and home offices, but over time I really enjoyed coding and it became one of my hobbies. Programming isn't the coolest thing I like to do, but it's something I can do for most of my life (maybe even all my life) without complaining.";
    }
  }

  async function changeCertificatesText() {
    if (!window.location.pathname.includes('pages/certificates.html')) return;

    translateStaticTexts();

    async function translateStaticTexts() {
      document.querySelector('[data-translate-title]').innerText =
        'My Certificates';

      await Array.from(
        document.querySelectorAll('[data-translate-topicsCovered]')
      ).forEach((element) => {
        element.innerText = 'Topics Covered:';
      });

      await Array.from(
        document.querySelectorAll('[data-translate-conclusion]')
      ).forEach((element) => {
        element.innerText = 'Conclusion:';
      });

      const monthTranslations = {
        'Janeiro de': 'January',
        'Fevereiro de': 'February',
        'Março de': 'March',
        'Abril de': 'April',
        'Maio de': 'May',
        'Junho de': 'June',
        'Julho de': 'July',
        'Agosto de': 'August',
        'Setembro de': 'September',
        'Outubro de': 'October',
        'Novembro de': 'November',
        'Dezembro de': 'December',
      };

      await Array.from(
        document.querySelectorAll('[data-translate-monthOfConclusion]')
      ).forEach((element) => {
        element.textContent = monthTranslations[element.textContent];
      });

      await Array.from(
        document.querySelectorAll('[data-translate-duration]')
      ).forEach((element) => {
        element.textContent = 'Duration:';
      });

      await Array.from(
        document.querySelectorAll('[data-translate-hours]')
      ).forEach((element) => {
        element.textContent = 'hours';
      });

      await Array.from(
        document.querySelectorAll('[data-translate-viewCertificate]')
      ).forEach((element) => {
        element.textContent = 'View Certificate';
      });
    }

    if (localStorage.getItem('translationsCertificatesInEnglish')) {
      const allTranslations = JSON.parse(
        localStorage.getItem('translationsCertificatesInEnglish')
      );

      Array.from(document.querySelectorAll('[data-translate]')).map(
        (element, index) => (element.textContent = allTranslations[index])
      );

      return;
    }

    saveTextsInPortugueseInLocalStorage('translationsCertificatesInPortuguese');

    await setValuesInLocalStorage(
      'translationsCertificatesInEnglish',
      ...(await translateDynamicTexts('PT', 'EN'))
    );
  }
}
