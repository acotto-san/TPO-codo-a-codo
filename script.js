let apikey = 'k_bzkveqwr'
let apikeys = ['k_bzkveqwr', 'k_t8q4da69']

let aside;
let miLista;
let nav;

let thisPage;
let slideIndex = 1;
let movieObject={};

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}


function agregarAMiListaContent(btn) {
    if (!miLista.content.consultarSiIniciado()) {
        miLista.content.iniciarPorPrimeraVez()
    }
    miLista.content.setChild(clonarTarjetaPadreDelBotton(btn));
    miLista.guardarEnStorage();
}

function loadMasInfo(btn) {
    const movieId = btn.getAttribute('movieid')
    localStorage.setItem('moreInfoId', movieId)
    location.assign(location.origin + '/more-info.html')
}

function removeMeFromFavList(element) {
    document.querySelector(`[favorite-id="${element.getAttribute('movieId')}"]`).remove()
    miLista.guardarEnStorage()
    if (document.querySelector('.mi-lista-content').childElementCount == 0) {
        miLista.content.marcarComoNoIniciado()
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
class Loader {
    constructor() {
        const item = document.createElement('div')
        item.classList.add('lds-roller')
        item.innerHTML = `<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`
        return item
    }
}


// ------------------Elementos comunes a todas las paginas-----------------------------------

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
        const asideElement = document.querySelector('aside')
        asideElement.appendChild(this.obj)
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
        this.obj.style.transform = 'translateX(-100%)';
        this.bajarListaBoton.mostrar();
        this.subirListaBoton.mostrar();
        this.aLaVista = !this.aLaVista;
    }
    ocultar() {
        this.obj.style.transform = 'translateX(0%)';
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

    consultarSiIniciado() {
        return localStorage.getItem('miListaInitStatus') == "true"
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
        localStorage.setItem('miListaInitStatus', 'false')

    }

    iniciarPorPrimeraVez() {
        this.obj.classList.remove('mi-lista-not-init')
        this.obj.innerHTML = ""
        localStorage.setItem('miListaInitStatus', 'true')
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


// ---------- Navbar ---------------


class NavBar {
    constructor() {
        this.inicializarNav();
        this.insertarUlContent();
        // this.agregarEventosEnUl();
        this.agregarEventosEnNavForm();
    }

    inicializarNav() {
        this.ul = document.getElementById('nav-ul')
        this.form = document.getElementById('nav-search-form')
    }

    insertarUlContent() {
        this.ul.innerHTML = ` <li>
                                <a href="./" id="home" class="nav-a"> <i class="fa-solid fa-house"></i><span>Home</span></a>
                            </li>                
                            <li>
                                <a href="./mi-lista.html" id="mi-lista" class="nav-a"><i class="fa-solid fa-heart"></i> <span>Mi Lista</span></a>
                            </li>
                            <li>
                                <a href="./coming-soon.html" id="comming-soon" class="nav-a"> <i class="fa-solid fa-podcast"></i><span>Coming Soon</span></a>
                            </li>
                            <li>
                                <a href="./random.html" id="random" class="nav-a"> <i class="fa-solid fa-shuffle" onclick=nav.saludar()></i><span>Random</span></a>
                            </li>
                            <li>
                                <a href="./contacto.html" id="contacto" class="nav-a"><i class="fa-solid fa-square-envelope"></i><span>Contacto</span></a>
                            </li>`
    }

    // agregarEventosEnUl() {
    //     const aTagCollection = document.getElementsByClassName('nav-a')
    //     for (let i = 0; i < aTagCollection.length; i++) {
    //         let a = aTagCollection[i];
    //         a.addEventListener('click',)
    //     }
    // }


    agregarEventosEnNavForm() {

        const navForm = document.getElementById('nav-search-form')
        navForm.addEventListener('submit', function (event) {
            event.preventDefault();


            const searchInput = navForm.elements['nav-search-input'].value
            if (searchInput.trim() === "") {
                console.log("Error con el input de la busqueda")
            } else {
                if (location.pathname !== "/") {
                    location.assign(location.origin)
                    localStorage.setItem('searchRedirection', 'true')
                    localStorage.setItem('searchRedirectionPayload', searchInput)
                } else {
                    searchMovies(searchInput);
                }
            }
        })
    }

}

// ---------------Elementos de  index------------------

let firstSearchForm;
let moviesDiv

function onloadIndex() {
    inicializarPrimerSearch();
    aside = document.querySelector('aside')
    miLista = new MiLista()
    chequearSiEsRedireccion();

}

function inicializarPrimerSearch() {
    firstSearchForm = document.getElementById('first-search-form');

    if (firstSearchForm) {
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
    }

}

function searchMovies(input) {
    moviesDiv = document.querySelector('.movies')
    removeAllChildNodes(moviesDiv)
    const animacion = new Loader()
    moviesDiv.appendChild(animacion)
    fetch(`https://imdb-api.com/es/API/search/${apikey}/${input}`)
        .then(response => response.json())
        .then(data => data.results.forEach(element => crearNuevaTarjeta(element)))
        .then(() => animacion.remove())
        .then(() => { inicializarBotonesDeMasInfo() });
    // pelis.results.forEach(element => crearNuevaTarjeta(element))
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
                        <span class="card-title">${obj.title}</span><small>${obj.description}</small>
                    </div>
                    <div class="card-actions">
                            <a class="mas-info-card" movieid="${obj.id}" onclick=loadMasInfo(this)><i class="fa-solid fa-circle-info fa-sm"></i></a>
                            <a class="add-to-my-list" movieid="${obj.id}" onclick=agregarAMiListaContent(this)><i class="fa-solid fa-heart-circle-plus fa-sm"></i></a>
                    </div>
                    
`
}

function conseguirLaTarjetaPadre(btn) {
    const movieId = btn.getAttribute('movieid')
    const movieCard = document.getElementById('movieId')
    console.log(movieCard)

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

function chequearSiEsRedireccion() {
    if (localStorage.getItem('searchRedirection') == 'true') {
        searchMovies(localStorage.getItem('searchRedirectionPayload'))
        localStorage.setItem('searchRedirection', 'false')
    }
}


// -----------------elmentos de more info---------------------------



function onloadMoreInfo() {
    thisPage = new LoadMasInfoPage()
    buscarMoreInfoDataEnLocalStorage();
    // miLista = new MiLista()
    
}


function buscarMoreInfoDataEnLocalStorage() {
    if (localStorage.getItem('moreInfoId')) {
        return localStorage.getItem('moreInfoId')
    } else {
        location.assign(location.origin)
    }
}

function conseguirDataDePelicula(id) {

    // https://imdb-api.com/es/API/ExternalSites/k_bzkveqwr/tt1375666
    // https://imdb-api.com/es/API/Title/k_bzkveqwr/tt1375666/Images
    // https://imdb-api.com/en/API/YouTubeTrailer/k_bzkveqwr/tt1375666

}




class LoadMasInfoPage{
    constructor(){
        
        this.searchMovieData(localStorage.getItem('moreInfoId'))
        
        this.agregarImagenes();
    }


    crearItem(){
        const item = document.createElement('section')
        item.id = 'section-more-info'
        item.innerHTML = `
        <article class="more-info-container">

            <div class="visual">
                <div class="poster"><img src="${movieObject.image}" alt=""></div>
                <div class="imagenes">
                    <div class="imagen-previous" onclick="plusSlides(-1)"><i class="fa-solid fa-chevron-left fa-2xl"></i>
                    </div>
                    <div class="imagen-content">
                        <iframe class="mySlides" src="https://www.youtube.com/embed/${movieObject.ytTrailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                    </div>
                    <a class="imagen-next" onclick="plusSlides(1)"><i class="fa-solid fa-chevron-right fa-2xl"></i></a>
                </div>
            </div>
            <div class="sinopsis">
                <h2>${movieObject.title}</h2>
                <p>${movieObject.sinopsis}</p>
            </div>
            <div class="data">
                <button><a href="${movieObject.officialWebsite}">Sitio oficial</a></button>
                <button><a href="">Agregar a Mi Lista</a></button>
                
            </div>
            

        </article>
`
        const main = document.querySelector('main')
        main.appendChild(item)
        const body = document.getElementsByTagName('body')
        const aside = document.createElement('aside')
        main.appendChild(aside)
    }
    agregarImagenes(){
        const container = document.querySelector('.imagen-content')
        for (item in movieObject.imagenes){
            const img = document.createElement('img')
            img.src = item.image
            container.appendChild(img)
        } 

    }

    searchMovieData(movieId){

        fetch(`https://imdb-api.com/es/API/Title/${apikey}/${movieId}/Images`)
            .then(response => response.json())
            .then(data => {
                movieObject.id = data.id;
                movieObject.title = data.title;
                movieObject.image = data.image;
                movieObject.sinopsis = data.plotLocal;
                movieObject.imagenes = data.images.items;
                movieObject.metacritic = data.metacriticRating;
            })
            .then(()=>{
                fetch(`https://imdb-api.com/es/API/ExternalSites/${apikey}/${movieId}`)
                    .then(response => response.json())
                    .then(data => {
                        movieObject.officialWebsite = data.officialWebsite;
                    })
                    .then(()=>{
                        fetch(` https://imdb-api.com/en/API/YouTubeTrailer/${apikey}/${movieId}`)
                            .then(response => response.json())
                            .then(data => {
                                movieObject.ytTrailer = data.videoId
                            })
                            .then(()=>this.crearItem())
                    })
            })
    }
}








function inicializarBotonesDeMasInfo() {
    console.log("listo")
}











nav = new NavBar()
function onload() {

    switch (location.pathname) {
        case '/':
            onloadIndex();
            break;
        case '/contacto.html':
            onloadContacto();
            break;
        case '/more-info.html':
            onloadMoreInfo();
            break;
    }
}
// function mainLoad(){
//     if(location.pathname == '/more-info.html'){
//         onloadMoreInfo()
//     }
// }
// mainLoad()
