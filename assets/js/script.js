// Initialize AOS

AOS.init();

// Menu

const menu = document.querySelector(".header__menu");

menu.addEventListener("click", () => {
  animationMenu();
  showBlurMenu();

  const showMenu = document.querySelector(".header__links");

  showMenu.classList.toggle("menuIsActivated");
});

function animationMenu() {
  const lineOne = document.querySelector(".header__lineOne");
  const lineTwo = document.querySelector(".header__lineTwo");
  const lineThree = document.querySelector(".header__lineThree");

  lineOne.classList.toggle("lineOneIsActivated");
  lineTwo.classList.toggle("lineTwoIsActivated");
  lineThree.classList.toggle("lineThreeIsActivated");
}

function showBlurMenu() {
  const fade = document.querySelector(".fadeInMain");

  fade.classList.toggle("fadeIsActivated");
}

// Settings

const settings = document.querySelector(".settings");

settings.addEventListener("click", () => {
  const gear = document.querySelector(".settings > .fa-gear");

  gear.style.transform = "rotate(360deg)";
});
