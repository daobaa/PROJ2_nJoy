document.addEventListener("DOMContentLoaded", function () {
    // Primero, obtenemos los eventos
    fetch("http://127.0.0.1:8000/eventos/")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error con la conexión al servidor de eventos");
        }
        return response.json();
    })
    .then(eventos => {
        console.log("Eventos recibidos:", eventos);

        const generosDeEventos = new Set(eventos.map(evento => evento.genero));

        fetch("http://127.0.0.1:8000/generos")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los géneros");
            }
            return response.json();
        })
        .then(generos => {
            console.log("Generos recibidos:", generos);

            const generosFiltrados = generos.filter(genero => generosDeEventos.has(genero.id));

            const mainBodyDiv = document.querySelector(".main-body");

            generosFiltrados.forEach(genero => {
                console.log(`Añadiendo género: ${genero.nombre}`);

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

                const eventosGenero = eventos.filter(evento => evento.genero === genero.id);
                eventosGenero.forEach((evento, index) =>{
                    const img = document.createElement("img");
                    img.src = "../img/logo.png";
                    img.alt = `evento ${evento.id}`;
                    displayDiv.appendChild(img);
                });

                genDiv.append(displayDiv);
                genContainer.appendChild(genH2);
                genContainer.appendChild(genDiv);
                mainBodyDiv.appendChild(genContainer);

                const tracks = document.querySelectorAll(".concerts-display");
                const imgWidth = 176;
                const imgVisible = 5;

                tracks.forEach(track => {
                    let index = 0;
                    function moveCarrusel() {
                        index++;
                        if (index > eventosGenero.length - imgVisible) {
                            index = 0;
                        }
                        track.style.transform = `translateX(-${index * imgWidth}px)`;
                    }

                    (function startInterval() {
                        setInterval(moveCarrusel, 5000);
                    })();
                });
            });
        })
        .catch(error => {
            console.error("Error al leer géneros:", error);
        });
    })
    .catch(error => {
        console.error("Error con los eventos:", error);
    });
});