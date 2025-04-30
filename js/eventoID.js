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

            const recinto = document.createElement("p");
            recinto.textContent = `Lugar: ${evento.recinto}`;

            const descripcion = document.createElement("p");
            descripcion.textContent = evento.descripcion || "Sin descripción";
            
            const plazas = document.createElement("p");
            plazas.textContent = `Plazas disponibles: ${evento.plazas}`;

            container.append(titulo, fecha, recinto, descripcion, plazas);

            fetch(`http://127.0.0.1:8000/localidades/${evento.localidad_id}`)
                .then(response => {
                    if(!response.ok){
                        throw new Error("Localidad no encontrada");
                    }
                    return response.json();
                })
                .then(localidad => {
                    const lugar = document.createElement("p");
                    lugar.textContent = `Localidad: ${localidad.ciudad}`;
                    container.appendChild(lugar);

                    const paymentBoton = document.createElement("button");
                    paymentBoton.textContent = "Comprar Entrada";
                    paymentBoton.addEventListener("click", () => {
                        window.location.href = `pago.html?id=${evento.id}`;
                    });
                    container.appendChild(paymentBoton);
                })
                .catch(error => {
                    console.error("Error al obtener la localidad:", error);
                })
        })
        .catch(error => {
            document.getElementById("main-body").textContent = "Error al cargar el evento.";
            console.error(error);
        });
});