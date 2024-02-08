// Initialize AOS

AOS.init();

// Menu

const menu = document.querySelector('.header__menu');

menu.addEventListener('click', () => {
  animationMenu();
  activateMenu();
  showBlurMenu();
  changePageScrollingState();
});

function activateMenu() {
  const showMenu = document.querySelector('.header__links');

  showMenu.classList.toggle('menuIsActivated');
}

function animationMenu() {
  ['lineOne', 'lineTwo', 'lineThree'].forEach((lineClass) => {
    const line = document.querySelector(`.menu__${lineClass}`);

    line.classList.toggle(`${lineClass}IsActivated`);
  });
}

function showBlurMenu() {
  const blurOnMain = document.querySelector('.BlurOnMain');

  blurOnMain.classList.toggle('BlurOnMainIsActivated');
}

function changePageScrollingState() {
  const bodyHTML = document.querySelector('body');
  const cssProperties = getComputedStyle(bodyHTML);
  const overflowProperty = cssProperties.getPropertyValue('overflow-y');

  overflowProperty === 'visible'
    ? (bodyHTML.style.overflowY = 'hidden')
    : (bodyHTML.style.overflowY = 'visible');
}

// Settings

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
  [document.querySelector('.header'), document.querySelector('.main')].forEach(
    (element) => {
      element.style.userSelect === 'none'
        ? (element.style.userSelect = 'text')
        : (element.style.userSelect = 'none');
    }
  );
}
