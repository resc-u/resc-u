
const loadAnimations = () => {

    document.getElementById("menu_icon").addEventListener('click', () => {
        document.querySelector("nav.menu").classList.add("open")
    })

    document.getElementById("close_menu").addEventListener('click', () => {
        document.querySelector("nav.menu").classList.remove("open")
    })

}

window.addEventListener("load", loadAnimations)