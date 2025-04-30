document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const eventoId = params.get("id");

    if(!eventoId){
        document.getElementById("main-body").textContent = "No se especificó un evento.";
        return;
    }
    
    fetch(`http://127.0.0.1:8000/eventos/${eventoId}`)
        .then(response => {
            if(!response.ok){
                throw new Error("Evento no encontrado");
            }
            return response.json();
        })
        .then(evento => {
            const container = document.getElementById("main-body");

            const titulo = document.createElement("h1");
            titulo.textContent = evento.nombre;

            const fecha = document.createElement("p");
            fecha.textContent = `Fecha: ${evento.fechayhora}`;

            const lugar = document.createElement("p");
            lugar.textContent = `Lugar: ${evento.recinto}`;

            const descripcion = document.createElement("p");
            descripcion.textContent = evento.descripcion || "Sin descripción";

            container.append(titulo, fecha, lugar, descripcion);
        })
        .catch(error => {
            document.getElementById("main-body").textContent = "Error al cargar el evento.";
            console.error(error);
        });
});