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

    fetch("http://127.0.0.1:8000/pagos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario_id: idUser,
            metodo_pago: "ejemplo",
            total: paymentMethod,
            fecha: currentDate,
            ticket_id: 1,
        })
    })
        .then(response => {
            if(!response.ok){
                throw new Error("Evento no encontrado");
            }
            return response.json();
        })
        .then(pago =>{
            let paymentMethod;

            fetch(`http://127.0.0.1:8000/eventos/${eventoId}`)
            .then(response => {
                if(!response.ok){
                    throw new Error("Evento no encontrado");
                }
                return response.json();
            })
                .then(evento => {
                    if(evento.categoria_precio == "Económico"){
                        paymentMethod = 5;
                    } else if(evento.categoria_precio == "Básico"){
                        paymentMethod = 10;
                    } else if(evento.categoria_precio == "Estándar"){
                        paymentMethod = 15;
                    } else if(evento.categoria_precio == "Premium"){
                        paymentMethod = 20;
                    } else if(evento.categoria_precio == "VIP"){
                        paymentMethod = 25;
                    }
                })
                
            const container = document.getElementById("main-body");
            
            const minorcont = document.createElement("div");
            minorcont.classList.add("minorcont");

            const payment1 = document.createElement("button");
            payment1.id = "Visa";
            const payment2 = document.createElement("button");
            payment2.id = "MasterCard";
            const payment3 = document.createElement("button");
            payment3.id = "Paypal";

            const price = document.createElement("p");
            price.textContent = `Precio: ${paymentMethod}€`;

            const assignedto = document.createElement("p");


            container.append(minorcont);
            minorcont.append(payment1, payment2, payment3, price, assignedto);
            payment1.addEventListener("click", function(){
                
            });
        })
        .catch(error => {
            document.getElementById("main-body").textContent = "Error al cargar el pago.";
            console.error(error);
        });
});