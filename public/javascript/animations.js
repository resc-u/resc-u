
const loadAnimations = () => {

    let menuIcon = document.getElementById("menu_icon")
    let closeMenu = document.getElementById("close_menu")
    let navMenu = document.querySelector("nav.menu")

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navMenu.classList.add("open")
        })
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove("open")
        })
    }
}

window.addEventListener("load", loadAnimations)