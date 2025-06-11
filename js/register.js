document.addEventListener("DOMContentLoaded", function () {
    function BackEventListener(){
        const backLink = document.getElementById("backLink");
    
        backLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "../html/index.html";
        });
    }
    window.addEventListener("load", BackEventListener);

    document.getElementById('regForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect the input values
        const user = document.getElementById('user').value;
        const ncompleto = document.getElementById('fullname').value;
        const fnacimiento = document.getElementById('bday').value;
        const email = document.getElementById('mail').value;
        const contrasena = document.getElementById('passwd').value;

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailPattern.test(email)){
            alert("Por favor, introduce un correo válido");
            return;
        }

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
        fetch("http://127.0.0.1:8000/register", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(registerData)
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error: ${JSON.stringify(data)}`);
            }
            return data;
        })
        .then(responseData => {
            console.log("Usuario registrado con éxito", responseData);
            alert("Registro exitoso");

            window.location.href = "../html/log_in.html";
        })
        .catch(async error => {
            console.error("Error al registrar:", error);
            try {
                errorData = JSON.parse(error.message.replace("Error: ", ""));
        
                if(errorData?.detail === "Username already registered"){
                    alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
                    return;
                }

                const passwordError = errorData.detail?.find(err => err.loc.includes("contrasena") && err.type === "string_too_short");

                if (passwordError) {
                    alert("La contraseña ha de tener un mínimo de 8 caracteres.");
                    return;
                }
            } catch (e) {
                console.error("Error parsing response:", e);
            }
        
            alert("Error en el registro");
        });
    });
    document.getElementById("confirm_passwd").addEventListener('input', function() {
        const passwd = document.getElementById("passwd").value;
        const confirmPassword = this.value;

        if(passwd != confirmPassword){
            this.setCustomValidity("Las contraseñas no coinciden");
        } else{
            this.setCustomValidity("");
        }
    });
});