


// -----------------header------------------
class Header{
    constructor(){
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
                        <span class="card-title">${obj.title}</span><br><br><small>${obj.description}</small>
                    </div>
                    <div class="card-actions">
                            <a class="mas-info-card"><i class="fa-solid fa-circle-info fa-sm"></i></a>
                            <a class="add-to-my-list" movieid="${obj.id}" onclick=agregarAMiListaContent(this)><i class="fa-solid fa-heart-circle-plus fa-sm"></i></a>
                    </div>
                    
`
}

function agregarAMiListaContent(btn) {
    miLista.content.setChild(clonarTarjetaPadreDelBotton(btn))
}

function clonarTarjetaPadreDelBotton(btn) {
    const tarjetaNueva = document.createElement("div")
    const movieId = btn.getAttribute('movieid')
    const tarjetaACopiar = document.querySelector(`.movie-card.${movieId}`)
    tarjetaNueva.classList.add('favorite-movie-card')
    tarjetaNueva.setAttribute('favorite-id',movieId)
    tarjetaNueva.innerHTML = tarjetaACopiar.innerHTML
    
    tarjetaNueva.querySelector('.add-to-my-list').remove()
    tarjetaNueva.querySelector('.card-actions').innerHTML += `
                        <a class="remove-from-my-list" movieid="${movieId}" onclick=removeMeFromFavList(this)><i class="fa-solid fa-heart-circle-minus fa-sm"></i></a>`
    
                        console.log(tarjetaNueva)
    return tarjetaNueva
}

function conseguirLaTarjetaPadre(btn) {
    const movieId = btn.getAttribute('movieid')
    const movieCard = document.getElementById('movieId')
    console.log(movieCard)

}

function searchMovies(input) {
    fetch(`https://imdb-api.com/es/API/search/${apikey}/${input}`)
    .then(response => response.json())
    .then(data => data.results.forEach(element => crearNuevaTarjeta(element)));
    // pelis.results.forEach(element => crearNuevaTarjeta(element))
}

function removeMeFromFavList(element){
    document.querySelector(`[favorite-id="${element.getAttribute('movieId')}"]`).remove()
}



// ------------ comportamiento de mi lista -----------

class BajarListaBoton {
    constructor() {
        this.boton = document.querySelector('.bajar-lista')
    }

    mostrar() {
        this.boton.style.transform = 'translateY(200%)'
    }

    ocultar() {
        this.boton.style.transform = 'translateY(0%)'
    }
}


class MiLista {
    constructor() {
        this.div = document.querySelector('.mi-lista');
        this.aLaVista = false;
        this.subirListaBoton = new SubirListaBoton()
        this.bajarListaBoton = new BajarListaBoton()
        this.miListaBoton = new MiListaBoton()
        this.content = new MiListaContent()
    }

    mostrar() {
        this.div.style.transform = 'translateX(3%)';
        this.bajarListaBoton.mostrar();
        this.subirListaBoton.mostrar();
        this.aLaVista = !this.aLaVista;
    }
    ocultar() {
        this.div.style.transform = 'translateX(87%)';
        this.bajarListaBoton.ocultar();
        this.subirListaBoton.ocultar();
        this.aLaVista = !this.aLaVista;
    }

}

class MiListaContent{
    constructor(){
        this.div = document.querySelector('.mi-lista-content')
    }

    setChild(obj){
        this.div.appendChild(obj)
    }
}

class SubirListaBoton{
    constructor(){
        this.boton = document.querySelector('.subir-lista')
    }
    mostrar(){
        this.boton.style.transform = 'translateY(100%)'
    }
    ocultar(){
        this.boton.style.transform = 'translateY(0%)'
    }
}

class MiListaBoton{
    constructor(){
        this.boton = document.querySelector('.mi-lista-button')
        this.boton.addEventListener('click',()=>{
            if (miLista.aLaVista) {
                miLista.ocultar()
            } else {
                miLista.mostrar()
            }
        })
    } 

}
let miLista = new MiLista()

// ---------- Fin de seccion ---------------

let movies;

let apikey = 'k_t8q4da69'
let apikeys = ['k_bzkveqwr', 'k_t8q4da69']

const moviesDiv = document.querySelector('.movies')
// searchMovies()

const firstSearchForm = document.getElementById('first-search-form');

firstSearchForm.addEventListener('submit',function (event){
    event.preventDefault();

    const searchInput = firstSearchForm.elements['first-search-input'].value
    if (searchInput.trim() === ""){
        console.log("Error con el input de la busqueda")
    }else{
        searchMovies(searchInput);
        firstSearchForm.parentNode.remove()
    }
})