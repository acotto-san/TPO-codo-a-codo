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
    getObj(){
        return this.obj
    }

    mostrar() {
        this.obj.style.transform = 'translateX(3%)';
        this.bajarListaBoton.mostrar();
        this.subirListaBoton.mostrar();
        this.aLaVista = !this.aLaVista;
    }
    ocultar() {
        this.obj.style.transform = 'translateX(87%)';
        this.bajarListaBoton.ocultar();
        this.subirListaBoton.ocultar();
        this.aLaVista = !this.aLaVista;
    }

    getContent(){
        return this.content
    }

    setChild(element){
        this.obj.appendChild(element)
    }

    
    guardarEnStorage(){
        let miListaContent = document.querySelector('.mi-lista-content')
        localStorage.setItem('miListaContentInnerHtml',miListaContent.innerHTML)
    }


}

class MiListaContent{
    constructor(element = null){
        if (localStorage.getItem('miListaContentInnerHtml') && localStorage.getItem('miListaContentInnerHtml')!=="undefined"){
            this.obj = document.createElement('div')
            this.obj.className = 'mi-lista-content'
            this.obj.innerHTML = localStorage.getItem('miListaContentInnerHtml')
            console.log('lista encontrada')
            console.log(this.obj)
        }else{
            this.obj = document.createElement('div')
            this.obj.className = 'mi-lista-content'
            console.log('nueva lista')
            this.obj.innerHTML = ""
            console.log(this.obj.innerHTML)
        }
        
    }

    setObj(element){
        this.obj = element
    }

    getObj(){
        return this.obj
    }

    setChild(element){
        this.obj.appendChild(element)
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


// ---------- Fin de seccion ---------------

class NavBar{
    constructor(){
        this.inicializarNav();
        this.insertarBotones();
        this.agregarEvent();
    }

    inicializarNav(){
        this.element = document.getElementById('nav-ul')
    }

    insertarBotones(){
        this.element.innerHTML = ` <li>
                                <a href="" id="home" class="nav-a"> <i class="fa-solid fa-house"></i><span>Home</span></a>
                            </li>                
                            <li>
                                <a href="" id="mi-lista" class="nav-a"> <i class="fa-solid fa-layer-group"></i> <span>Mi Lista</span></a>
                            </li>
                            <li>
                                <a href="" id="comming-soon" class="nav-a"> <i class="fa-solid fa-podcast"></i><span>Coming Soon</span></a>
                            </li>
                            <li>
                                <a href="" id="random" class="nav-a"> <i class="fa-solid fa-shuffle" onclick=nav.saludar()></i><span>Random</span></a>
                            </li>
                            <li>
                                <a href="" id="contacto" class="nav-a"><i class="fa-solid fa-square-envelope"></i><span>Contacto</span></a>
                            </li>`
    }

    agregarEvent(){
        const aTagCollection = document.getElementsByClassName('nav-a')
        for(let i=0 ; i< aTagCollection.length ; i++){
            let a = aTagCollection[i];
            a.addEventListener('mouseover',miLista.guardarEnStorage)
        }
    }

}

// ------------------------------------
let aside = document.querySelector('aside')
let miLista = new MiLista()
const nav =  new NavBar()
