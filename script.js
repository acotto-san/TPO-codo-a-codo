let apikey = 'k_bzkveqwr'
let apikeys = ['k_bzkveqwr', 'k_t8q4da69']

let aside;
let miLista;
let nav;

let thisPage;
let slideIndex = 1;
let movieObject = {};

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

class MovieObj{
    constructor(element){
        if(element.parentNode.parentNode.getAttribute('class')=='movie-card'){
            
            this.generateFromMovieCard(element)
        }else if (element.getAttribute('class')=='more-info-btn'){
            this.generateFromMoreInfo(element)
        }
    }

    generateFromMovieCard(element){
        const div = element.parentNode.parentNode
        this.id = div.getAttribute('card-id')
        this.image = div.querySelector('img').getAttribute('src')
        this.title = div.querySelector('.card-title').innerText
        this.description = div.querySelector('.card-description').innerText
    }

    generateFromMoreInfo(element=movieObject){
        this.id = movieObject.id
        this.image = movieObject.image
        this.description = '('
        this.title = movieObject.title
        const temp = movieObject.title.split('(')
        this.title = temp[0]
        this.description += temp[1]
        // [this.title,this.tempdescription] = movieObject.title.split("(")
        // this.description = this.description.concat(this.tempdescription)
    }
}


function agregarAMiListaContent(btn) {
    if (!miLista.content.consultarSiIniciado()) {
        miLista.content.iniciarPorPrimeraVez()
    }
    const tarjetaFav = new TarjetaFavorita(new MovieObj(btn));
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
        this.crearParent()

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

    crearParent() {
        const main = document.querySelector('main')
        const aside = document.createElement('aside')
        main.appendChild(aside)
        aside.appendChild(this.obj)
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

    eliminarDeLaLista(element){
        document.querySelector(`[favorite-card-id="${element.getAttribute('movieId')}"]`).remove()
        miLista.guardarEnStorage()
        if (document.querySelector('.mi-lista-content').childElementCount == 0) {
            this.marcarComoNoIniciado()
        }
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
        .then(data => data.results.forEach(element => new Tarjeta(element)))
        .then(() => animacion.remove())
        .then(() => { inicializarBotonesDeMasInfo() });
    // pelis.results.forEach(element => crearNuevaTarjeta(element))
}

class Tarjeta {
    constructor(obj) {
        const nuevaTarjeta = document.createElement('div')
        nuevaTarjeta.classList.add(`movie-card`)
        nuevaTarjeta.setAttribute('card-id', obj.id)
        moviesDiv.appendChild(nuevaTarjeta)
        nuevaTarjeta.innerHTML = `

                    <div class="img-card">
                        <img src="${obj.image}" alt="imagen de la pelicula">
                    </div>
                    <div class="info-card">
                        <span class="card-title">${obj.title}</span><small class="card-description">${obj.description}</small>
                    </div>
                    <div class="card-actions">
                            <a class="mas-info-card" movieid="${obj.id}" onclick=loadMasInfo(this)><i class="fa-solid fa-circle-info fa-sm"></i></a>
                            <a class="add-to-my-list" movieid="${obj.id}" onclick=agregarAMiListaContent(this)><i class="fa-solid fa-heart-circle-plus fa-sm"></i></a>
                    </div>
                    
`
    }
}

class TarjetaFavorita {
    constructor(obj) {
        const nuevaTarjeta = document.createElement('div')
        nuevaTarjeta.classList.add(`favorite-movie-card`)
        nuevaTarjeta.setAttribute('favorite-card-id',obj.id)
        miLista.content.setChild(nuevaTarjeta)
        nuevaTarjeta.innerHTML = `

                    <div class="img-card">
                        <img src="${obj.image}" alt="imagen de la pelicula">
                    </div>
                    <div class="info-card">
                        <span class="card-title">${obj.title}</span><small class="card-description">${obj.description}</small>
                    </div>
                    <div class="card-actions">
                            <a class="mas-info-card" movieid="${obj.id}" onclick=loadMasInfo(this)><i class="fa-solid fa-circle-info fa-sm"></i></a>
                            <a class="add-to-my-list" movieid="${obj.id}" onclick=miLista.content.eliminarDeLaLista(this)><i class="fa-solid fa-heart-circle-minus fa-sm"></i></a>
                    </div>
                    
`
    }
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
                        <a class="remove-from-my-list" movieid="${movieId}" onclick=miLista.content.eliminarDeLaLista(this)><i class="fa-solid fa-heart-circle-minus fa-sm"></i></a>`
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
    thisPage = new LoadMasInfoPage(localStorage.getItem('moreInfoId'))
    buscarMoreInfoDataEnLocalStorage();


}

function onloadRandom(){

    function randomIntFromInterval(min=1, max=250) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    } 
    
    let random
    fetch(`https://imdb-api.com/en/API/Top250Movies/${apikey}`)
        .then(response => response.json())
        .then(data => {
            thisPage = new LoadMasInfoPage(data.items[randomIntFromInterval()].id)
        } )
    
}


function buscarMoreInfoDataEnLocalStorage() {
    if (localStorage.getItem('moreInfoId')) {
        return localStorage.getItem('moreInfoId')
    } else {
        location.assign(location.origin)
    }
}





class LoadMasInfoPage {
    constructor(id) {

        this.searchMovieData(id)

        // this.agregarImagenes();
        this.slideIndex = 1;

    }


    crearItem() {
        const item = document.createElement('section')
        item.id = 'section-more-info'
        item.innerHTML = `
        <article class="more-info-container">

            <div class="visual">
                <div class="poster"><img class="movie-poster" src="${movieObject.image}" alt=""></div>
                <div class="imagenes">
                    <div class="imagen-previous" onclick="plusSlides(-1)"><i class="fa-solid fa-chevron-left fa-2xl"></i>
                    </div>
                    <div class="imagen-content">
                        <iframe class="mySlides" src="https://www.youtube.com/embed/${movieObject.ytTrailer}" title="YouTube video player" style='display:none;'frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                    </div>
                    <a class="imagen-next" onclick="plusSlides(1)"><i class="fa-solid fa-chevron-right fa-2xl"></i></a>
                </div>
            </div>
            <div class="sinopsis">
                <h2 class="movie-title">${movieObject.title}</h2>
                <p>${movieObject.sinopsis}</p>
            </div>
            <div class="data">
                <button><a href="${movieObject.officialWebsite}">Sitio oficial</a></button>
                <button movieid="${movieObject.id}" class="more-info-btn" onclick=agregarAMiListaContent(this)>Agregar a Mi Lista</button>
                
            </div>
            

        </article>
`
        const main = document.querySelector('main')
        main.appendChild(item)
        const body = document.getElementsByTagName('body')
        miLista = new MiLista()
        // const aside = document.createElement('aside')
        // main.appendChild(aside)
    }
    agregarImagenes() {
        const container = document.querySelector('.imagen-content')
        for (let i = 0; i < movieObject.imagenes.length; i++) {
            const img = document.createElement('img')
            img.src = movieObject.imagenes[i].image
            img.classList.add('mySlides')
            container.appendChild(img)
        }
        this.showSlides(this.slideIndex)


    }

    searchMovieData(movieId) {
        const animacion = new Loader()
        document.querySelector('main').appendChild(animacion)
        fetch(`https://imdb-api.com/es/API/Title/${apikey}/${movieId}/Images`)
            .then(response => response.json())
            .then(data => {
                movieObject.id = data.id;
                movieObject.title = data.fullTitle;
                movieObject.image = data.image;
                movieObject.sinopsis = data.plotLocal;
                movieObject.imagenes = data.images.items;
                movieObject.metacritic = data.metacriticRating;
            })
            .then(() => {
                fetch(`https://imdb-api.com/es/API/ExternalSites/${apikey}/${movieId}`)
                    .then(response => response.json())
                    .then(data => {
                        movieObject.officialWebsite = data.officialWebsite;
                    })
                    .then(() => {
                        fetch(` https://imdb-api.com/en/API/YouTubeTrailer/${apikey}/${movieId}`)
                            .then(response => response.json())
                            .then(data => {
                                movieObject.ytTrailer = data.videoId
                            })
                            .then(() => this.crearItem())
                            .then(() => this.agregarImagenes())
                            .then(()=> animacion.remove())
                    })
            })
    }

    showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }
}








function inicializarBotonesDeMasInfo() {
    console.log("listo")
}











nav = new NavBar()
// function onload() {

//     switch (location.pathname) {
//         case '/':
//             onloadIndex();
//             break;
//         case '/contacto.html':
//             onloadContacto();
//             break;
//         case '/more-info.html':
//             onloadMoreInfo();
//             break;
//     }
// }

function mainLoad(){
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
                case '/random.html':
                    onloadRandom();
                    break;
            }
}
mainLoad()
