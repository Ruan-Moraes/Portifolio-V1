AOS.init()

// Menu

const menu = document
    .querySelector('.header__menu')
    .addEventListener('click', () => {
        const showMenu = document.querySelector('.header__links')
        showMenu.classList.toggle('menuIsActivated')
    })
