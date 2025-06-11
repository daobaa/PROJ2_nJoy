document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".main-body");
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if(!usuario){
        container.innerHTML = "";

        const mensaje = document.createElement("p");
        mensaje.textContent = "Inicia sesión para ver tu entrada.";

        const btnLogin = document.createElement("button");
        btnLogin.textContent = "Iniciar sesión";
        btnLogin.addEventListener("click", () => {
            window.location.href = "log_in.html";
        });

        container.append(mensaje, btnLogin);
        return;
    }

    let idUser = usuario.id;
    fetch("http://127.0.0.1:8000/ticket")
        .then(response => {
            if(!response.ok){
                throw new Error("Error en la lectura de tickets");
            }
            return response.json();
        })
        .then(tickets => {
            const userTickets = tickets.filter(ticket => ticket.usuario_id === idUser);

            if(userTickets.length === 0){
                const sinEntradas = document.createElement("p");
                sinEntradas.textContent = "No tienes entradas aún.";
                container.append(sinEntradas);
                return;
            }

            userTickets.forEach(ticket => {
                const ticketDiv = document.createElement("div");
                ticketDiv.classList.add("ticket");

                const leftInfo = document.createElement("div");
                leftInfo.classList.add("ticket-info");

                const rightNote = document.createElement("div");
                rightNote.classList.add("ticket-note");
                rightNote.textContent = "Entrega el QR con la app de nJoy";

                fetch(`http://127.0.0.1:8000/evento/${ticket.evento_id}`)
                    .then(response => {
                        if(!response.ok){
                            throw new Error("Error obteniendo el evento");
                        }
                        return response.json();
                    })
                    .then(evento => {
                        leftInfo.innerHTML = `
                            <h3>Entrada para ${evento.nombre}</h3>
                            <p>Estado: ${ticket.activado ? "Activo" : "Inactivo"}</p>
                        `;
                        
                        ticketDiv.append(leftInfo);
                        ticketDiv.append(rightNote);
                        container.append(ticketDiv);
                    })
                    .catch(error => {
                        console.error("Error al obtener el evento:", error);
                        const errorMsg = document.createElement("p");
                        errorMsg.textContent = "Error cargando información de tus entradas.";
                        container.append(errorMsg);
                    });
            });
        })
        .catch(error => {
            console.error("Error al procesar los tickets:", error);
            const errorMsg = document.createElement("p");
            errorMsg.textContent = "No se pudieron cargar tus entradas, intentalo mas tarde.";
            container.append(errorMsg);
        });
});