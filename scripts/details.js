    /// console.log("Estoy enlazado al details")
// capturar la info que guardé en el local storage pero me la trae en formato JSON
import { videosInformation } from "/scripts/data.js";
    console.log(videosInformation);
    /// se parsea la informacion para que no sea formato JSON y se pueda manipular
const idVideoStr= JSON.parse(localStorage.getItem ("idVideo"));
    /// parseamos la informacion 
const idVideo = Number (idVideoStr);
    console.log(idVideo);
    /// getItem recibe solo1 parámetro, el nombre de la propiedad 
// hacer la busqueda del video al que se le dio clic (.find retorna el primer elemento)
const video = videosInformation.find( video => video.id === idVideo)
    /// .find me recibe como parámetro un callback
    /// y el callback me recibe a su vez como parámetro cada uno de los elementos del array
    /// queremos que retorne el video que tenga el id exactamente igual al idVideo
    console.log(video);
// capturar el contenedor donde se van a pintar el video
    /// como es class hacemos con query (con punto para llamar la class)
const containerVideo = document.querySelector(".main__section__detalvideo");
    console.log(containerVideo);
// construir una función para pintar los videos en el contenedor
    /// necesito un contenedor como primer parámetro
    /// y la lista de videos como segundo parámetro
    /// esta lista la traigo desde el data (que lo importé arriba)
    const printVideo= (container, video) => {
// vaciar el contenedor para que solo tenga lo que yo incerto
    /// y nada desde el html
    container.innerHTML = "";
   /// += para que sea un acumulado de cada card en el container     
   container.innerHTML += `
   <article class="section__article">
        <iframe class="article__iframe" width="1280" height="720" src="${video.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen> </iframe>
        <section class="Information">
            <figure class="article__figure__author">
            <img src=${video.authorImage} alt=${video.author}>
            </figure>
                <section class= "InformationText">
                    <h3  name=${video.id} class= "article__h3"> ${video.name} </h3>
                    <h4 class= "article__h4"> ${video.author} </h4>
                    <h5 class= "article__h5"> Followers: ${video.followers} </h5>
                    <h5 class= "article__h6"> Likes: ${video.comments} </h5>
                </section>
        </section>
   </article>
   `
}; 
// la función se va a ejecutar cuando suceda el evento (recarga del DOM osea la página)
    /// parámetros: cual es el evento que se va a escuchar  y
    /// un callback sin parámetro
    document.addEventListener("DOMContentLoaded", () => {
        /// aqui estoy ejecutando la función que creé arriba 
        printVideo(containerVideo,video);
    });
// Capturar el contenedor de los otros videos 
const containerOtherVideos = document.querySelector(".main__section__videos");
// construir una función para pintar  las cards de  los videos en el contenedor
    /// necesito un contenedor como primer parámetro
    /// y la lista de videos como segundo parámetro
    // esta lista la traigo desde el data (que lo importé arriba)

 ////////////////filtrado para que no me salga este video///////

//  const videosSugeridos = videosList.filter(item => item.id !== video.id);
 const videosSugeridos = videosInformation.filter(video => video.id !== idVideo);
 console.log(videosSugeridos);
    const printVideos= ( containerOtherVideos, videosSugeridos) => {
        /// vaciar el contenedor para que solo tenga lo que yo incerto
        /// y nada desde el html
        containerOtherVideos.innerHTML = "";
    // recorrer el array y hacer uso de la imagen y del nombre ( lo que quiero mostrar)
    videosSugeridos.forEach(video => {
       /// por cada elemento de este array se va a ejecutar... 
       /// += para que sea un acumulado de cada card en el container     
       containerOtherVideos.innerHTML += `
        <article class="main__articles">
            <figure class="article__figures">
                <img class="figures__videosimg" data-card="videoimg" name=${video.id} src=${video.videoImage} alt=${video.name}>
            </figure>
            <h5 class= "articles__h5"> ${video.duration} </h5>
            <section class="OtherInformation">
                <figure class="article__figures__author">
                <img src=${video.authorImage} alt=${video.author}>
                </figure>
                <section class="OtherInformationText">
                    <h3 class="articles__h3"name=${video.id}> ${video.name} </h3>
                    <h4 class= "articles__h4"> ${video.author} </h4>
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
        /// aqui estoy ejecutando la función que creé arriba para que se inyecte la información detallada 
        printVideos(containerOtherVideos,videosSugeridos);
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
        if(event.target.classList.contains("figures__videosimg")||event.target.classList.contains("articles__h3") ){
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
        };
    }); 
// escuchar el clic en la imagen del logo para que me direccione al home 
document.addEventListener("click", (event) => {
    if(event.target.classList.contains("header__img")){
        window.location.href= "./index.html"
    };
});

///-----busqueda de videos en el input--------////
const filterByName= (termSearch, videosList) => {
    const videosFiltrados = videosList.filter((video)=> video.name.toLowerCase().includes(termSearch.toLowerCase()));
    const result = videosFiltrados.length ? videosFiltrados : videosList;
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
            printVideos(containerOtherVideos, searchResult.resultSearch);
            if(searchResult.messageSearch) {
                alert(searchResult.messageSearch);
            }
                } else {
                    alert("No has ingresado un termino de búsqueda");
                }
            }
        });