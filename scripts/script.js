import { videosInformation } from "/scripts/data.js";
//capturar la información
console.log(videosInformation);
// mostrar los videos enlistados en cards
    /// capturar el contenedor donde se van a pintar las cards
    /// como es class hacemos con query (con punto para llamar la class)
const containerCards = document.querySelector(".main__cards");
console.log(containerCards);
// construir una función para pintar  las cards de  los videos en el contenedor
    /// necesito un contenedor como primer parámetro
    /// y la lista de videos como segundo parámetro
    // esta lista la traigo desde el data (que lo importé arriba)
const printVideos= (container, videosList) => {
    /// vaciar el contenedor para que solo tenga lo que yo incerto
    /// y nada desde el html
    container.innerHTML = "";
// recorrer el array y hacer uso de la imagen y del nombre ( lo que quiero mostrar)
    videosList.forEach(video => {
   /// por cada elemento de este array se va a ejecutar... 
   /// += para que sea un acumulado de cada card en el container     
   container.innerHTML += `
    <article class="main__article">
        <figure class="article__figure">
            <img class="figure__videoimg"data-card="videoimg" name=${video.id} src=${video.videoImage} alt=${video.name}>
        </figure>
        <h5 class= "article__h5"> ${video.duration} </h5>
        <section class="Information">
            <figure class="article__figure__author">
            <img src=${video.authorImage} alt=${video.author}>
            </figure>
            <section class="InformationText">
            <h3 class= "article__h3" name=${video.id} > ${video.name} </h3>
            <h4 class= "article__h4"> ${video.author} </h4>
            </section>
        </section>
            </article>
   `
}); 
};

// la función se va a ejecutar cuando suceda el evento (recarga del DOM osea la página)
    /// parámetros: cual es el evento que se va a escuchar  y
    /// un callback sin parámetro
document.addEventListener("DOMContentLoaded", () => {
    /// aqui estoy ejecutando la función que creé arriba 
    printVideos(containerCards,videosInformation);
});
// escuchar el evento click en las cards de los videos 
    /// teniendo en cuenta que las cards estan siendo pintadas dinámicamente desde aquí
    /// no se pueden capturar desde el html
document.addEventListener("click", (event) => {
    /// me escucha todos los clics del documento
        /// console.log("Hice clic aquí");
        /// event es un objeto grande con muchas propiedades 
        /// buscamos especificamente la propiedad target (etiqueta a la que le hice clic)
        ///console.log(event);
    /// vamos a condicionar que el clic sea en la imagen o en el nombre del video
        if(event.target.classList.contains("figure__videoimg")||event.target.classList.contains("article__h3") ){
    /// classList es una propiedad (método) donde hacemos referencia a la lista de clases
    /// de una etiqueta (en este caso img)
        /// console.log("Quiero ir a details");
        /// console.log(event.target);
        // console.log(event.target.getAttribute("name"));
        const id= event.target.getAttribute("name");
        ///usamos set para guardar la información
        /// get me recibe dos parametros la key (propiedad idVideo) y el value (valor del id que se capturo arriba)
        /// el valor se convierte a JSON con stringify
        /// así me guarda el valor del id en el local storage
        localStorage.setItem("idVideo", JSON.stringify(id));
            window.location.href= "./details.html";
        }
    });    
//////////-------------------------- FILTROS--------------------------///////
//Crear un array con las categorias de los personajes 
const categories = ["All"];
videosInformation.forEach(item => {
    ///Este forEach recibe un callback que recorre cada item de este array
if(!categories.includes(item.filter)) {
     ///includes es un metodo de array
     categories.push(item.filter);
};
});
    ///me muestra el array de categories 
console.log(categories);
    ///por cada elemento del array me capture el boton que tenga ese name
categories.forEach((item) => {
    const botonFiltrado= document.getElementsByName(item)[0];
    ///get name devuelve una lista de nodos se coloca [0] para que devuelva el primer elemento
    botonFiltrado.addEventListener("click", () => {
/// escuchamos el clic en el boton
    console.log(botonFiltrado);
    const videosFiltrados = item ==="All"
    /// si el item es exactamente igual a all    
    ? videosInformation
    /// videos filtrados va a ser igual a todo el array
    : videosInformation .filter ((element) => element.filter === item);
    /// si no se va a filtrar 
    console.log(videosFiltrados);
    printVideos(containerCards,videosFiltrados);
    });
});
///-----busqueda de videos en el input--------////
const filterByName= (termSearch, videosList) => {
const videosFiltrados = videosList.filter((video)=> video.name.toLowerCase().includes(termSearch.toLowerCase()));
const result = videosFiltrados.length ? videosFiltrados : videosList;
    /// si hay elementos en el array 
const messageResult= videosFiltrados.length ? false : "Video no encontrado"
return { 
    /// return palabra clave que dice que me deve retornar algo (que la función termine pero me devuelva algo)
    /// me retorna una propiedad que es un arreglo con el resultado de la busqueda 
    /// y lo otro que me retorna es el mensaje que e true
    resultSearch: result, 
    messageSearch: messageResult, 
};
};
    ///capturar el input 
    const formSearch= document.getElementById("nav__input");
    /// asegurarse que se capture correctamente el elemento
    console.log(formSearch);
    /// escuchar el evento enter 
    formSearch.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
          console.log("buscar");
            const inputValor = document.getElementById("nav__input").value;
            // console.log(formSearch.children);
            // html collection hijos del formulario
            // const formChildren= array.from(formSearch.children);
            /// se convierte en array para buscarlo 
            // const inputSearch= formChildren.find((item) => item.localName === "input");
            // console.log(inputSearch);
            console.log(inputValor);
            if (inputValor) {
                const searchResult= filterByName(inputValor, videosInformation );
                console.log(searchResult);
    /// llamamos a la función que nos imprime las cards 
        printVideos(containerCards, searchResult.resultSearch);
                if(searchResult.messageSearch) {
                    alert(searchResult.messageSearch);
                }
            } else {
                alert("No has ingresado un termino de búsqueda");
            }
        }
    });

