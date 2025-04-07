document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:8000/")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error with server connection");
        }
        return response.json();
    })
    .then(data => {
        console.log("Received data from server:", data);
    })
    .catch(error => {
        console.error("Error capturat:", error);
    });

    const mainBodyDiv = document.querySelector(".main-body");

    if(mainBodyDiv){
        fetch("http://127.0.0.1:8000/generos")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}}`);
            }
            return response.json();
        })
        .then(generos => {
            console.log("Generos recibidos:", generos);

            generos.forEach(genero => {
                console.log(`Añadiendo genero: ${genero.nombre}`);

                const genContainer = document.createElement("div");
                genContainer.className = "major-container";

                const genH2 = document.createElement("h2");

                const genLink = document.createElement("a");
                genLink.href = `./generos.html#${genero.id}`;
                genLink.textContent = genero.nombre;
                genH2.appendChild(genLink);



                const genDiv = document.createElement("div");
                genDiv.className = "concerts-container";

                const displayDiv = document.createElement("div");
                displayDiv.className = "concerts-display";

                for(let i = 0; i < 10; i++){
                    const img = document.createElement("img");
                    img.src = "../img/logo.png";
                    img.alt = `imagen${i+1}`;
                    displayDiv.appendChild(img);
                }

                genDiv.append(displayDiv);
                genContainer.appendChild(genH2);
                genContainer.appendChild(genDiv);
                mainBodyDiv.appendChild(genContainer);

                const tracks = document.querySelectorAll(".concerts-display");
                const imgWidth = 176;
                const imgVisible = 5;
                const imgTotal = 10;
            
                tracks.forEach(track => {
                    let index = 0;
                    function moveCarrusel(){
                        index++;
                        if(index > imgTotal - imgVisible){
                            index = 0;
                        }
                        track.style.transform = `translateX(-${index * imgWidth}px)`;
                    }
                    
                    (function startInterval(){
                        setInterval(moveCarrusel, 5000);
                    })();
                });
            });
        })
        .catch(error => {
            console.error("Error al leer generos:", error);
            try {
                const errorData = JSON.parse(error.message);
                if(errorData?.detail){
                    alert(errorData.detail);
                    return;
                }
            } catch (e) {
                console.error("Error parsing response:", e);
            }
        });
    }
});