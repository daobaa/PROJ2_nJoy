document.addEventListener("DOMContentLoaded", function () {
    function BackEventListener(){
        const backLink = document.getElementById("backLink");
    
        backLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "../html/index.html";
        });
    }
    window.addEventListener("load", BackEventListener);
    
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

            fetch("https://3.228.133.52:8000/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    contrasena: contrasena
                })
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
            .catch(error => {
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