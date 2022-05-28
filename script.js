

// -----------------header------------------
class Header {
    constructor() {
        this.contacto = document.querySelector('.nav-contacto')
    }
}

// --------------------------------------------

let pelis = {
    "searchType": "Title",
    "expression": "lord of the rings",
    "results": [
        {
            "id": "tt7631058",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BOTUzYTMwYjAtNzMzMS00YjhmLWEwOGQtY2MxZGEyMzMwZDI0XkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_Ratio0.7273_AL_.jpg",
            "title": "The Lord of the Rings: The Rings of Power",
            "description": "(2022) (TV Series)"
        },
        {
            "id": "tt0120737",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_Ratio0.7273_AL_.jpg",
            "title": "The Lord of the Rings: The Fellowship of the Ring",
            "description": "(2001)"
        },
        {
            "id": "tt0331560",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BMTk3ODI5Nzk4Nl5BMl5BanBnXkFtZTcwMDE5MTcyMQ@@._V1_Ratio0.7727_AL_.jpg",
            "title": "Lord of the Piercing",
            "description": "(2002) (TV Short) aka \"Lord of the Rings: Lord of the Piercing\""
        },
        {
            "id": "tt64482606",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BZTAxYzViYzUtZTU2My00MTUyLWJhMjAtYTE1NzMyMDc1MWRjXkEyXkFqcGdeQXVyNDc3Mzc3NTM@._V1_Ratio0.7273_AL_.jpg",
            "title": "Lord of the Rings (by Spring)",
            "description": "(2017) (Short)"
        },
        {
            "id": "tt131169172",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BOTlhZGI4MDItMTAxOC00ZDNlLWJmNmItYjU2YmE1M2UxNmYyXkEyXkFqcGdeQXVyMTIzNjk1NjM1._V1_Ratio1.7273_AL_.jpg",
            "title": "Lord of the Rings Re-enacted by Ponies",
            "description": "(2012) (Video)"
        },
        {
            "id": "tt00757869",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BOGMyNWJhZmYtNGQxYi00Y2ZjLWJmNjktNTgzZWJjOTg4YjM3L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_Ratio0.7273_AL_.jpg",
            "title": "The Lord of the Rings",
            "description": "(1978)"
        },
        {
            "id": "tt01673260",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7273_AL_.jpg",
            "title": "The Lord of the Rings: The Return of the King",
            "description": "(2003)"
        },
        {
            "id": "tt131194172",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BOTlhZGI4MDItMTAxOC00ZDNlLWJmNmItYjU2YmE1M2UxNmYyXkEyXkFqcGdeQXVyMTIzNjk1NjM1._V1_Ratio1.7273_AL_.jpg",
            "title": "Lord of the Rings Re-enacted by Ponies",
            "description": "(2012) (Video)"
        },
        {
            "id": "tt050767869",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BOGMyNWJhZmYtNGQxYi00Y2ZjLWJmNjktNTgzZWJjOTg4YjM3L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_Ratio0.7273_AL_.jpg",
            "title": "The Lord of the Rings",
            "description": "(1978)"
        },
        {
            "id": "tt01647260",
            "resultType": "Title",
            "image": "https://imdb-api.com/images/original/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_Ratio0.7273_AL_.jpg",
            "title": "The Lord of the Rings: The Return of the King",
            "description": "(2003)"
        }
    ],
    "errorMessage": ""
}

function crearNuevaTarjeta(obj) {
    const nuevaTarjeta = document.createElement('div')
    nuevaTarjeta.classList.add(`movie-card`)
    nuevaTarjeta.classList.add(obj.id)
    moviesDiv.appendChild(nuevaTarjeta)
    nuevaTarjeta.innerHTML = `

                    <div class="img-card">
                        <img src="${obj.image}" alt="imagen de la pelicula">
                    </div>
                    <div class="info-card">
                        <span class="card-title">${obj.title}</span><br><small>${obj.description}</small>
                    </div>
                    <div class="card-actions">
                            <a class="mas-info-card"><i class="fa-solid fa-circle-info fa-sm"></i></a>
                            <a class="add-to-my-list" movieid="${obj.id}" onclick=agregarAMiListaContent(this)><i class="fa-solid fa-heart-circle-plus fa-sm"></i></a>
                    </div>
                    
`
}

function agregarAMiListaContent(btn) {
    if (!miLista.content.consultarSiIniciado()) {
        miLista.content.iniciarPorPrimeraVez()
    }
    miLista.content.setChild(clonarTarjetaPadreDelBotton(btn));
    miLista.guardarEnStorage();
}

function clonarTarjetaPadreDelBotton(btn) {
    const tarjetaNueva = document.createElement("div")
    const movieId = btn.getAttribute('movieid')
    const tarjetaACopiar = document.querySelector(`.movie-card.${movieId}`)
    tarjetaNueva.classList.add('favorite-movie-card')
    tarjetaNueva.setAttribute('favorite-id', movieId)
    tarjetaNueva.innerHTML = tarjetaACopiar.innerHTML

    tarjetaNueva.querySelector('.add-to-my-list').remove()
    tarjetaNueva.querySelector('.card-actions').innerHTML += `
                        <a class="remove-from-my-list" movieid="${movieId}" onclick=removeMeFromFavList(this)><i class="fa-solid fa-heart-circle-minus fa-sm"></i></a>`
    return tarjetaNueva
}

function conseguirLaTarjetaPadre(btn) {
    const movieId = btn.getAttribute('movieid')
    const movieCard = document.getElementById('movieId')
    console.log(movieCard)

}

function inicializarBotonesDeMasInfo(){
    console.log("listo")
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
class Loader{
    constructor(){
        const item = document.createElement('div')
        item.classList.add('lds-roller') 
        item.innerHTML = `<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`
        return item
    }
}

function searchMovies(input) {
    removeAllChildNodes(moviesDiv)
    const animacion = new Loader()
    moviesDiv.appendChild(animacion)
    fetch(`https://imdb-api.com/es/API/search/${apikey}/${input}`)
        .then(response => response.json())
        .then(data => data.results.forEach(element => crearNuevaTarjeta(element)))
        .then(()=> animacion.remove())
        .then(()=>{inicializarBotonesDeMasInfo()});
    // pelis.results.forEach(element => crearNuevaTarjeta(element))
}

function removeMeFromFavList(element) {
    document.querySelector(`[favorite-id="${element.getAttribute('movieId')}"]`).remove()
    miLista.guardarEnStorage()
    if (document.querySelector('.mi-lista-content').childElementCount == 0) {
        miLista.content.marcarComoNoIniciado()
    }
}



// ------------ comportamiento de mi lista -----------

class BajarListaBoton {
    constructor() {
        this.boton = document.querySelector('.bajar-lista')
    }

    mostrar() {
        this.boton.style.transform = 'translate(-100%,200%)';
    }

    ocultar() {
        this.boton.style.transform = 'translate(-100%,0%)'
    }
}

class MiLista {
    constructor() {

        this.obj = document.createElement('div')
        this.obj.classList.add('mi-lista')
        this.obj.innerHTML = `<div class="botonera">
        <button class="mi-lista-button"><i class="fa-solid fa-heart"></i></button>
        <button class="bajar-lista"><i class="fa-solid fa-floppy-disk"></i></button>
        <button class="subir-lista"><i class="fa-solid fa-cloud-arrow-up"></i></button>
        </div>`
        aside.appendChild(this.obj)
        this.aLaVista = false;
        this.subirListaBoton = new SubirListaBoton()
        this.bajarListaBoton = new BajarListaBoton()
        this.miListaBoton = new MiListaBoton()
        this.content = new MiListaContent()
        this.setChild(this.content.getObj())

    }
    getObj() {
        return this.obj
    }

    mostrar() {
        this.obj.style.transform = 'translateX(0%)';
        this.bajarListaBoton.mostrar();
        this.subirListaBoton.mostrar();
        this.aLaVista = !this.aLaVista;
    }
    ocultar() {
        this.obj.style.transform = 'translateX(99.5%)';
        this.bajarListaBoton.ocultar();
        this.subirListaBoton.ocultar();
        this.aLaVista = !this.aLaVista;
    }

    getContent() {
        return this.content
    }

    setChild(element) {
        this.obj.appendChild(element)
    }


    guardarEnStorage() {
        let miListaContent = document.querySelector('.mi-lista-content')
        localStorage.setItem('miListaContentInnerHtml', miListaContent.innerHTML)
    }


}

class MiListaContent {
    constructor(element = null) {

        
        if (this.consultarSiIniciado()) {
            this.obj = document.createElement('div')
            this.obj.className = 'mi-lista-content'
            this.obj.innerHTML = localStorage.getItem('miListaContentInnerHtml')
            console.log('lista encontrada')
            console.log(this.obj)
        } else {
            this.obj = document.createElement('div')
            this.obj.classList.add('mi-lista-content')
            this.marcarComoNoIniciado()
        }

    }

    consultarSiIniciado(){
        return localStorage.getItem('miListaInitStatus')=="true"
    }

    setObj(element) {
        this.obj = element
    }

    getObj() {
        return this.obj
    }

    setChild(element) {
        this.obj.appendChild(element)
    }

    marcarComoNoIniciado() {
        this.obj.classList.add('mi-lista-not-init')
        this.obj.innerHTML = `<div><img src="./assets/lista-guia.png"></div>`
        localStorage.setItem('miListaInitStatus','false')

    }

    iniciarPorPrimeraVez() {
        this.obj.classList.remove('mi-lista-not-init')
        this.obj.innerHTML = ""
        localStorage.setItem('miListaInitStatus','true')
    }

}

class SubirListaBoton {
    constructor() {
        this.boton = document.querySelector('.subir-lista')
    }
    mostrar() {
        this.boton.style.transform = 'translate(-100%,100%)';
    }
    ocultar() {
        this.boton.style.transform = 'translate(-100%,0%)'
    }
}

class MiListaBoton {
    constructor() {
        this.boton = document.querySelector('.mi-lista-button')
        this.boton.addEventListener('click', () => {
            if (miLista.aLaVista) {
                miLista.ocultar()
            } else {
                miLista.mostrar()
            }
        })
    }

}


// ---------- Fin de seccion ---------------


class NavBar {
    constructor() {
        this.inicializarNav();
        this.insertarUlContent();
        this.agregarEventosEnUl();
        this.agregarEventosEnForm();
    }

    inicializarNav() {
        this.ul = document.getElementById('nav-ul')
        this.form = document.getElementById('nav-search-form')
    }

    insertarUlContent() {
        this.ul.innerHTML = ` <li>
                                <a href="" id="home" class="nav-a"> <i class="fa-solid fa-house"></i><span>Home</span></a>
                            </li>                
                            <li>
                                <a href="" id="mi-lista" class="nav-a"><i class="fa-solid fa-heart"></i> <span>Mi Lista</span></a>
                            </li>
                            <li>
                                <a href="" id="comming-soon" class="nav-a"> <i class="fa-solid fa-podcast"></i><span>Coming Soon</span></a>
                            </li>
                            <li>
                                <a href="" id="random" class="nav-a"> <i class="fa-solid fa-shuffle" onclick=nav.saludar()></i><span>Random</span></a>
                            </li>
                            <li>
                                <a href="./contacto.html" id="contacto" class="nav-a"><i class="fa-solid fa-square-envelope"></i><span>Contacto</span></a>
                            </li>`
    }

    agregarEventosEnUl() {
        const aTagCollection = document.getElementsByClassName('nav-a')
        for (let i = 0; i < aTagCollection.length; i++) {
            let a = aTagCollection[i];
            a.addEventListener('mouseover', miLista.guardarEnStorage)
        }
    }


    agregarEventosEnForm(){

        const navForm = document.getElementById('nav-search-form')
        navForm.addEventListener('submit', function (event) {
            event.preventDefault();

        
            const searchInput = navForm.elements['nav-search-input'].value
            if (searchInput.trim() === "") {
                console.log("Error con el input de la busqueda")
            } else {
                searchMovies(searchInput);
                firstSearchForm.parentNode.remove()
            }
        })
    }

}

let movies;

let apikey = 'k_t8q4da69'
let apikeys = ['k_bzkveqwr', 'k_t8q4da69']

const moviesDiv = document.querySelector('.movies')

const firstSearchForm = document.getElementById('first-search-form');

firstSearchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchInput = firstSearchForm.elements['first-search-input'].value
    if (searchInput.trim() === "") {
        console.log("Error con el input de la busqueda")
    } else {
        searchMovies(searchInput);
        firstSearchForm.parentNode.remove()
    }
})

function sal() {
    console.log(miLista.content.getObj())
}

let aside = document.querySelector('aside')

let miLista = new MiLista()
const nav = new NavBar()


