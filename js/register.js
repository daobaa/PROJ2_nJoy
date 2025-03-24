document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:8000/")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error a la resposta del servidor");
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("user").value = data.user;
        document.getElementById("fullname").value = data.ncompleto;
        document.getElementById("").value = data.fnacimiento;
        document.getElementById("passwd").value = contrasena;
    })
    .catch(error => {
        console.error("Error capturat:", error);
        alert("Error en el registro");
    });
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect the input values
        const user = document.getElementById('user').value;
        const ncompleto = document.getElementById('ncompleto').value;
        const fnacimiento = document.getElementById('fnacimiento').value;
        const contrasena = document.getElementById('contrasena').value;

        // Prepare the data to be sent in the request
        const registerData = {
            user: user,
            ncompleto: ncompleto,
            fnacimiento: fnacimiento,
            contrasena: contrasena
        };

        // Send the data to the API via a POST request
        fetch("http://127.0.0.1:8000/usuarios/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData) // Convert data to JSON string
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al registrar el usuario");
            }
            return response.json(); // Assuming the API responds with a JSON message
        })
        .then(responseData => {
            console.log("Usuario registrado con éxito", responseData);
            alert("Registro exitoso");
        })
        .catch(error => {
            console.error("Error al registrar:", error);
            alert("Error en el registro");
        });
    });
});

// document.addEventListener("DOMContentLoaded", function() {
//     const form = document.getElementById("regForm");
//     const password = document.getElementById("passwd");
//     const confirmPassword = document.getElementById("confirm_passwd");
//     const backLink = document.getElementById("backLink");

//     backLink.addEventListener("click", function(event) {
//         event.preventDefault();
//         window.location.href = "../html/index.html";
//     });

//     form.addEventListener("submit", function(event) {
//         if(password.value !== confirmPassword.value) {
//             event.preventDefault();
//             alert("Las contraseñas no coinciden. Intentalo de nuevo.");
//             confirmPassword.focus();
//         } else {
//             alert("¡se ha registrado con exito!");
//         }
//     });
// });