
const loadAnimations = () => {

    document.getElementById("menu_icon").addEventListener('click', () => {

        document.querySelector("nav.menu").classList.add("open")

    })

}

window.addEventListener("load", loadAnimations)