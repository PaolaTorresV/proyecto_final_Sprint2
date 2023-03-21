console.log("Estoy enlazado al canal")
// capturar la info que guardé en el local storage pero me la trae en formato JSON
import { videosInformation } from "/scripts/data.js";
    console.log(videosInformation);


// escuchar el clic en la imagen del logo para que me direccione al home 
document.addEventListener("click", (event) => {
    if(event.target.classList.contains("header__img")){
        window.location.href= "./index.html"
    };
});