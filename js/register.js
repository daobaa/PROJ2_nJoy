document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:8000/")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error a la resposta del servidor");
        }
        return response.json();
    })
    .then(data => {
        console.log("Received data from server:", data);

        if(data.user) document.getElementById("user").value = data.user;
        if(data.ncompleto) document.getElementById("fullname").value = data.ncompleto;
        if(data.fnacimiento){
            document.getElementById("bday").value = new Date(data.fnacimiento).toISOString().split("T")[0];
        }
        if(data.email) document.getElementById("mail").value = data.email;
        if(data.contrasena) document.getElementById("passwd").value = data.contrasena;
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
            user,
            ncompleto,
            email,
            fnacimiento,
            contrasena
        };
        console.log("Datos a enviar:", registerData);

        // Send the data to the API via a POST request
        fetch("http://127.0.0.1:8000/usuarios/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(registerData)
        })
        .then(async response => {
            const data = await response.json();
            console.error("FastAPI response:", JSON.stringify(data, null, 2));
            if (!response.ok) {
                throw new Error(`Error: ${JSON.stringify(data)}`);
            }
            return data;
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