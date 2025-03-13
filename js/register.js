// document.addEventListener("DOMContentLoaded", function () {
//     fetch("http://127.0.0.1:8000/usuarios/register") /* Falta implementar */
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
    const form = document.getElementById("regForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;

        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(function(input) {
            if(!input.value) {
                isValid = false;
                alert(`¡El campo ${input.name} es obligatorio!`);
            }
        });

        if(isValid) {
            alert("¡Se ha registrado con exito!");
        }
    });
});