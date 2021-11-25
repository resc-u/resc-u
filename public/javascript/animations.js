
const loadAnimations = () => {

    let menuIcon = document.getElementById("menu_icon")
    let closeMenu = document.getElementById("close_menu")
    let navMenu = document.querySelector("nav.menu")
    let flash = document.querySelector("flash")
    let imagesAnimal = document.querySelectorAll('img.pic-animal-small')
    let favHearts = document.querySelectorAll('svg.heart-icon')

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

    if (imagesAnimal && imagesAnimal.length > 0) {

        imagesAnimal.forEach( (pic) => {
            pic.addEventListener('click', () => {

                console.log("src fomr img clicked", pic.src)
                console.log("I clicked one")

                let imgContainer = document.getElementById('show-picture')
                let element = document.createElement('img')
                element.setAttribute("class", "pic-animal-big")
                element.setAttribute("src", pic.src)
                imgContainer.innerHTML = ""
                imgContainer.append(element)

                // disable the one 
                let smallImages = document.querySelectorAll('.pic-animal-small')
                smallImages.forEach( (smallPic) => {
                    if (pic.src === smallPic.src) smallPic.classList.add('disabled')
                    else smallPic.classList.remove('disabled')
                })

            })
        })
    }

    if (favHearts) {
        favHearts.forEach( (heart) => {
            heart.addEventListener('click', () => {

                let isFav = false
                let animalId = heart.id

                if (heart.classList.contains("notfav")) isFav = true
                
                if (isFav) window.location.href = `/animals/${animalId}/fav`
                else window.location.href = `/animals/${animalId}/unfav`
            
            })
        })
    }

    if (flash && isVisible(flash)) {
        alert("hey, un flash!")
        
    }
}

window.addEventListener("load", loadAnimations)