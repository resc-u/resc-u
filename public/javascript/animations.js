
const loadAnimations = () => {

    let menuIcon = document.getElementById("menu_icon")
    let closeMenu = document.getElementById("close_menu")
    let navMenu = document.querySelector("nav.menu")
    let flash = document.querySelector("flash")
    
    const isVisible = (element) => {
        console.log("HOLAAAA")
        
        let rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right + 100 <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }

    if (menuIcon && navMenu) {
        menuIcon.addEventListener('click', () => {
            navMenu.classList.add("open")
        })
    }

    if (closeMenu && navMenu) {
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove("open")
        })
    }

    if (flash && isVisible(flash)) {
        alert("hey, un flash!")
        
    }

}

window.addEventListener("load", loadAnimations)