document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const eventoId = params.get("id");

    const container = document.querySelector(".main-body");


    if(!eventoId){
        document.querySelector(".main-body").textContent = "No se especificó un evento.";
        return;
    }
    let usuario = JSON.parse(localStorage.getItem("usuario"));

    if(!usuario){
        container.innerHTML = "";

        const mensaje = document.createElement("p");
        mensaje.textContent = "Inicia sesión para comprar tu entrada.";

        const btnLogin = document.createElement("button");
        btnLogin.textContent = "Iniciar sesión";
        btnLogin.addEventListener("click", () => {
            window.location.href = "log_in.html";
        });

        container.append(mensaje, btnLogin);
        return;
    }

    let idUser = usuario.id;
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

            let ticketCount = 1;
            let currentPrice = priceType;

            const ticketCountDisplay = document.createElement("p");
            ticketCountDisplay.textContent = `Nº de tickets: ${ticketCount}`;

            const increaseBtn = document.createElement("button");
            increaseBtn.textContent = "+";
            const decreaseBtn = document.createElement("button");
            decreaseBtn.textContent = "-";

            function updatePriceDisplay() {
                ticketCountDisplay.textContent = `Nº de tickets: ${ticketCount}`;
                price.textContent = `Precio: ${currentPrice * ticketCount} €`;
            }

            increaseBtn.addEventListener("click", () => {
                ticketCount++;
                updatePriceDisplay();
            });
            decreaseBtn.addEventListener("click", () => {
                if(ticketCount > 1){
                    ticketCount--;
                    updatePriceDisplay();
                }
            });
            
            const assignedto = document.createElement("p");
            assignedto.textContent = "Metodo seleccionado:";

            container.append(minorcont);
            minorcont.append(assignedto, payment1, payment2, payment3, price, ticketCountDisplay, decreaseBtn, increaseBtn)

            payment1.addEventListener("click", function(){
                metodo_pago = "Visa";
                console.log("Metodod de pago seleccionado:", metodo_pago);
                payment1.classList.add("selected");
                payment2.classList.remove("selected");
                payment3.classList.remove("selected");
            });
            payment2.addEventListener("click", function(){
                metodo_pago = "Mastercard";
                console.log("Metodod de pago seleccionado:", metodo_pago);
                payment1.classList.remove("selected");
                payment2.classList.add("selected");
                payment3.classList.remove("selected");
            });
            payment3.addEventListener("click", function(){
                metodo_pago = "Paypal";
                console.log("Metodod de pago seleccionado:", metodo_pago);
                payment1.classList.remove("selected");
                payment2.classList.remove("selected");
                payment3.classList.add("selected");
            });

            const paymentButton = document.createElement("button");
            paymentButton.textContent = "Confirmar Pago";
            minorcont.append(paymentButton);



            paymentButton.addEventListener("click", function(){
                let currentDate = new Date().toISOString();
                if(!metodo_pago){
                    alert("Por favor, selecciona un metodod de pago.")
                    return;
                }

                if(ticketCount > evento.plazas){
                    alert(`No hay suficientes plazas disponibles. Quedan solo ${evento.plazas} entradas.`);
                    return;
                }

                let ticketPromises = [];

                for(let i = 0; i < ticketCount; i++){
                    ticketPromises.push(
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
                        }).then(response => {
                            if(!response.ok){
                                return response.text().then(text => {
                                    throw new Error(`Error al crear el ticket: ${text}`);
                                });
                            }
                            return response.json();
                        })
                    );
                }

                Promise.all(ticketPromises)
                    .then(tickets => {
                        console.log("Tickets creados correctamente", tickets);

                        const ticketID = tickets[0].id;

                        return fetch(`http://127.0.0.1:8000/evento/${eventoId}`);
                    })
                    .then(response => {
                        if(!response.ok){
                            throw new Error("Error al procesar el pago");
                        }
                        return response.json();
                    })
                    .then(evento => {
                        const plazasRestantes = evento.plazas - ticketCount;

                        if(plazasRestantes < 0){
                            alert(`No hay suficientes plazas disponibles. Quedan solo ${evento.plazas} entradas.`);
                            return;
                        }

                        const eventoActualizado = {
                            ...evento,
                            plazas: plazasRestantes
                        };

                        return fetch(`http://127.0.0.1:8000/evento/${eventoId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(eventoActualizado)
                        });
                    })
                    .then(response => {
                        if(!response.ok){
                            throw new Error("Error al actualizar las plazas del evento");
                        }
                        return response.json();
                    })
                    .then(updatedEvento => {
                        console.log("Plazas actualizadas correctamente", updatedEvento);

                        container.innerHTML = "";

                        const paySuccesfuldiv = document.createElement("div");
                        paySuccesfuldiv.classList.add("paySuccesful");
                        const paySuccesfulp = document.createElement("p");
                        paySuccesfulp.classList.add("payMessage");
                        paySuccesfulp.textContent = "¡Gracias por comprar tu entrada!";
                            
                        paySuccesfuldiv.append(paySuccesfulp);
                        container.append(paySuccesfuldiv);
                    })
                    .catch(error => {
                        console.error("Error en el flujo del pago:", error);
                        container.textContent = "Ocurrió un error al procesar la compra";
                    });
        });
    });
});