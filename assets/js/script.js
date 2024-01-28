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
    const line = document.querySelector(`.header__${lineClass}`);

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

const settings = document.querySelector('.settings');

settings.addEventListener('click', () => {
  animationGear()
});

function animationGear() {
  const gear = document.querySelector('.settings > .fa-gear');
  
  gear.style.transform = 'rotate(360deg)';
}
