AOS.init()

// Menu

const menu = document
    .querySelector('.header__menu')
    .addEventListener('click', () => {
        const showMenu = document.querySelector('.header__links')
        showMenu.classList.toggle('menuIsActivated')
    })

// Settings

const settings = document
    .querySelector('.settings')
    .addEventListener('click', () => {
        const gear = document.querySelector('.settings > .fa-gear')
        gear.style.transform = 'rotate(360deg)'
        openSettings(gear)
    })

function openSettings(gear) {
    const gears = gear
}
