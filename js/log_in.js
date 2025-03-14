// document.addEventListener("DOMContentLoaded", function () {
//     fetch("http://127.0.0.1:8000/usuarios/login") /* Falta implementar */
//     .then(response =>{
//         if (!response.ok) {
//             throw new Error("Error a la resposta del servidor");
//         }
//         return response.json();
//     })
//     .then(data => {

//     })
//     .catch(error => {
//         console.error("Error capturat:", error);
//         alert("Error en el registro");
//     });
// });
document.addEventListener("DOMContentLoaded", function() {
    const backLink = document.getElementById("backLink");

    backLink.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "../html/index.html";
    });
});