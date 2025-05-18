document.addEventListener("DOMContentLoaded", function () {
    fetch("https://3.228.133.52:8000/evento/")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error con la conexión al servidor de eventos");
        }
        return response.json();
    })
    .then(eventos => {
        console.log("Eventos recibidos:", eventos);

        const conciertos = eventos.filter(evento => evento.tipo === "Concierto");
        const generosDeEventos = new Set(conciertos.map(evento => evento.genero_id));

        fetch("https://3.228.133.52:8000/genero")
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
                genH2.textContent = genero.nombre;

                const genLink = document.createElement("a");
                genLink.href = `./generos.html#${genero.id}`;

                const genDiv = document.createElement("div");
                genDiv.className = "concerts-container";

                const displayDiv = document.createElement("div");
                displayDiv.className = "concerts-display";

                const eventosGenero = conciertos.filter(evento => evento.genero_id === genero.id);
                eventosGenero.forEach((evento, index) =>{
                    const imgLink = document.createElement("a");
                    imgLink.href = `./eventoID.html?id=${evento.id}`;

                    const img = document.createElement("img");
                    img.src = "../img/logo.png";
                    img.alt = `evento ${evento.id}`;

                    imgLink.appendChild(img);
                    displayDiv.appendChild(imgLink);
                });

                genDiv.append(displayDiv);
                genContainer.appendChild(genLink);
                genLink.appendChild(genH2);
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
});