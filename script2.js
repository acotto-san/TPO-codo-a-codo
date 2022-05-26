window.onload = function() {
    console.log("asd")
    searchMovies()
    crearTarjeta(peli)

};
let movies

let apikey = 'k_bzkveqwr'


function searchMovies(){
    fetch(`https://imdb-api.com/es/API/search/${apikey}/batman `)
    .then(response => response.json())
    .then(data => movies=data );
}

let peli = {
    "id": "tt1877830",
    "resultType": "Title",
    "image": "https://imdb-api.com/images/original/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_Ratio0.7273_AL_.jpg",
    "title": "The Batman",
    "description": "(2022)"
}


function crearTarjeta(obj){
    const moviesDiv = document.querySelector('.movies');
    const div = document.createElement("div");
    // div.class = "movie-card";
    div.innerHTML = `
                    <div class="header-card">
                        <h3>${obj.title}</h3>
                        <p>${obj.description}</p>
                    </div>
                    <div class="img-card">
                        <img src="${obj.image}" alt="imagen de la pelicula">
                    </div>
                    <div class="card-actions">
                        <button class="mas-info-card">Mas info</button>
                        <button class="add-to-my-list">Agregar</button>
                    </div>
                    `;
    div.innerText = 'asd';
    
    const img2 = document.createElement("img");
    img2.src = "https://josefacchin.com/wp-content/uploads/2020/02/como-quitar-el-fondo-de-una-imagen.png"
    moviesDiv.innerHTML = div;
    console.log(div);
    moviesDiv.innerText = "asddddd"
}