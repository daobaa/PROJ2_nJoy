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
        document.getElementById("bday").value = data.fnacimiento;
        document.getElementById("mail").value = data.email;
        document.getElementById("passwd").value = data.contrasena;
    })
    .catch(error => {
        console.error("Error capturat:", error);
        alert("Error en el registro");
    });
    document.getElementById('regForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect the input values
        const user = document.getElementById('user').value;
        const ncompleto = document.getElementById('fullname').value;
        const fnacimiento = document.getElementById('bday').value;
        const email = document.getElementById('mail').value;
        const contrasena = document.getElementById('passwd').value;

        // Prepare the data to be sent in the request
        const registerData = {
            user: user,
            ncompleto: ncompleto,
            email: email,
            fnacimiento: fnacimiento,
            contrasena: contrasena
        };
        console.log("Datos a enviar:", registerData);

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