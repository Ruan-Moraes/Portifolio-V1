AOS.init()

// Menu

const menu = document
    .querySelector('.header__menu')
    .addEventListener('click', openMenu)

function openMenu() {
    const showMenu = document.querySelector('.header__mobile')
    showMenu.classList.toggle('is-active')
}
