document.addEventListener("DOMContentLoaded", function () {
    function BackEventListener(){
        const backLink = document.getElementById("backLink");
    
        backLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "../html/index.html";
        });
    }
    window.addEventListener("load", BackEventListener);

    fetch("http://127.0.0.1:8000/")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error with server connection");
            }
            return response.json();
        })
        .then(data => {
            console.log("Received data from server:", data);

            if(data.email) document.getElementById("mail").value = data.email;
            if(data.contrasena) document.getElementById("passwd").value = data.contrasena;
        })
        .catch(error => {
            console.error("Error capturat:", error);
        });
    
    const loginForm = document.getElementById("logForm");
    if(loginForm){
        loginForm.addEventListener("submit", function(event){
            event.preventDefault();

            const email = document.getElementById("mail")?.value;
            const contrasena = document.getElementById('passwd')?.value;

            if(!email || !contrasena){
                alert("Por favor, ingrese su email y contraseña.");
                return;
            }

            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", contrasena);

            fetch("http://127.0.0.1:8000/usuarios/login", {
                method: 'POST',
                body: formData
            })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(`Error: ${JSON.stringify(data)}`);
                }
                return data;
            })
            .then(responseData => {
                console.log("Usuario accedido con éxito", responseData);

                localStorage.setItem("usuario", JSON.stringify(responseData));

                alert("Inicio de sesión exitoso");
                window.location.href = "../html/index.html";
            })
            .catch(async error => {
                console.error("Error al registrar:", error);
                try {
                    const errorData = JSON.parse(error.message);
                    if(errorData?.detail){
                        alert(errorData.detail);
                        return;
                    }
                } catch (e) {
                    console.error("Error parsing response:", e);
                }
            
                alert("Error en el inicio de sesión.");
            });
        });
    }
});