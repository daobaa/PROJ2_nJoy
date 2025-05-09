document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const eventoId = params.get("id");

    if(!eventoId){
        document.getElementById("main-body").textContent = "No se especificó un evento.";
        return;
    }

    let currentDate = new Date().toISOString();
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let idUser = usuario.user_id;
    let metodo_pago = "";

    fetch(`http://127.0.0.1:8000/evento/${eventoId}`)
        .then(response => {
            if(!response.ok){
                throw new Error("Evento no encontrado");
            }
            return response.json();
        })
        .then(evento => {
            let priceType = 0;

            if(evento.categoria_precio == "Alta"){
                priceType = 15;
            } else if(evento.categoria_precio == "Media"){
                priceType = 10;
            } else if(evento.categoria_precio == "Baja"){
                priceType = 5;
            }

            const container = document.querySelector(".main-body");

            const minorcont = document.createElement("div");
            minorcont.classList.add("minorcont");

            const payment1 = document.createElement("button");
            payment1.id = "Visa";
            payment1.textContent = "Visa";

            const payment2 = document.createElement("button");
            payment2.id = "Mastercard";
            payment2.textContent = "Mastercard";

            const payment3 = document.createElement("button");
            payment3.id = "Paypal";
            payment3.textContent = "Paypal";

            const price = document.createElement("p");
            price.textContent = `Precio: ${priceType} €`;
            
            const assignedto = document.createElement("p");

            container.append(minorcont);
            minorcont.append(payment1, payment2, payment3, price, assignedto)

            payment1.addEventListener("click", function(){
                metodo_pago = "Visa";
                console.log("Metodod de pago seleccionado:", metodo_pago);
            });
            payment2.addEventListener("click", function(){
                metodo_pago = "Mastercard";
                console.log("Metodod de pago seleccionado:", metodo_pago);
            });
            payment3.addEventListener("click", function(){
                metodo_pago = "Paypal";
                console.log("Metodod de pago seleccionado:", metodo_pago);
            });

            const paymentButton = document.createElement("button");
            paymentButton.textContent = "Confirmar Pago";
            minorcont.append(paymentButton);



            paymentButton.addEventListener("click", function(){
                if(!metodo_pago){
                    alert("Por favor, selecciona un metodod de pago.")
                    return;
                }

                fetch("http://127.0.0.1:8000/ticket/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        evento_id: eventoId,
                        usuario_id: idUser,
                        activado: true
                    })
                })
                .then(response => {
                    if(!response.ok){
                        throw new Error("Error al crear el ticket");
                    }
                    return response.json();
                })
                .then(ticket => {
                    console.log("Ticket creado correctamente", ticket);

                    const ticketId = ticket.id;

                    fetch("http://127.0.0.1:8000/pago/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            usuario_id: idUser,
                            metodo_pago: metodo_pago,
                            total: priceType,
                            fecha: currentDate,
                            ticket_id: ticketId,
                        })
                    })
                    .then(response => {
                        if(!response.ok){
                            throw new Error("Error al procesar el pago");
                        }
                        return response.json();
                    })
                    .then(pago => {
                        console.log("Pago procesado correctamente", pago);
                    })
                    .catch(error => {
                        document.getElementById("main-body").textContent = "Error al procesar el pago";
                        console.error(error);
                    });
                })
                .catch(error => {
                    document.getElementsByClassName("main-body").textContent = "Error al procesar el ticket";
                    console.error(error);
                });
            });
        })
        .catch(error => {
            document.getElementsByClassName("main-body").textContent = "Error al cargar el evento.";
            console.error(error);
        });
});