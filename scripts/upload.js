import { videosInformation } from "/scripts/data.js";
    /// escuchar el click del logo de la página
    //  const logo = document.querySelector("header__img");
    // logo.addEventListener("click",()) =>
    /// const linkActive = document.querySelector("")

// capturo el formulario
const form= document.getElementById("form");
    /// escucho el evento submit del formulario 
form.addEventListener("submit",(e)=> {
    e.preventDefault();
    console.log("Quiero crear un nuevo video");
    /// necesito un array con los elementos hijos del formulario
    /// convertir el html collection en array    
    const formChildren= Array.from(form.children);
    /// solo quiero los input y selecet entonces los filtro con el localName
    const arrayInput = formChildren.filter((item)=> (item.localName === "input" || item.localName === "select" ));
    console.log(arrayInput);
    console.log(form.children);
});
    /// construyo un objeto con la misma estructura 
    const newVideo = {
        id: "",
        name: "",
        author: "",
        authorImage:"",
        videoImage:"",
        // video: "",
        followers: "",
        // duration: "",
        // comments: "",
        filter: "",
    },
    /// recorro cada una de las propiedades del objeto newVideo
    for ( const key in newVideo ) {
    // primero valido el tipo de dato del valor de la propiedad
    // para asignarle el valor que se le dio a traves de los input
    if (typeof newVideo[key]=== "object") {
    for (const propertyName in newVideo [key]){
        const input = arrayInput.find (item => item.id == propertyName)
        newVideo[key][propertyName] = input.value
        }
    } else {
    /// que la key corresponda al id
    /// el valor del input va a ser 
//         const input = arrayInput.find ((item) => item.id == key);
//         newVideo[key] = input.value;
//     }
//     }
//     // validamos que sea un objeto 
//     console.log(typeof newVideo);
//     console.log(newVideo);
//     // pushear el nuevo video
//     const validateCampos = validateInputs(newVideo);
//     if(validateCampos) {
//         newVideo.id = videosInformation.length + 1;
//         videosInformation.push(newVideo);
//         sessionStorage.setItem("")
//     }
//     console.log(videosInformation)
// } );
// /// para validar que todos los campos son requeridos 
// const validateInputs =(objetoData) => {
//     let camposVacios =""
//     for ( const key in objetoData) {
//         if (typeof objetoData[key]=== "object")
//         {
//             for (const propertyName in objetoData[key]){
//                 const valueProperty = objetoData[key][propertyName]
//                 camposVacios+= !valueProperty ? `${propertyName}`:"";
//             }
//         } else {
//                 const valueProperty = objetoData[key][propertyName]
//                 camposVacios+= !valueProperty ? `${key}` :"";
//         }
//     }
//     if (camposVacios) {
//         `Hay campos vación: ${camposVacios}`;
//         return;
//     } else {
//     return true;
//     }
// }
// escuchar el clic en la imagen del logo para que me direccione al home 
document.addEventListener("click", (event) => {
    if(event.target.classList.contains("header__img")){
        window.location.href= "./index.html"
    };
});