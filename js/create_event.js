document.addEventListener("DOMContentLoaded", async () => {
    const baseUrl = "http://127.0.0.1:8000";

    async function cargarLocalidades() {
        try {
            const response = await fetch(baseUrl + "/localidad");
            if (!response.ok) throw new Error("Error al cargar localidades");
            const datos = await response.json();
            const select = document.getElementById("localidad");
            datos.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.ciudad;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Error cargando localidades:", error);
        }
    }

    async function cargarGeneros() {
        try {
            const response = await fetch(baseUrl + "/genero");
            if (!response.ok) throw new Error("Error al cargar géneros");
            const datos = await response.json();
            const select = document.getElementById("genero");
            datos.forEach(item => {
                const option = document.createElement("option");
                option.value = item.id;
                option.textContent = item.nombre;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Error cargando géneros:", error);
        }
    }

    function cargarCategorias() {
        const categorias = ["Alta", "Media", "Baja"];
        const select = document.getElementById("categoria");
        categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat;
            option.textContent = cat;
            select.appendChild(option);
        });
    }

    function cargarTipos() {
        const tipos = ["Festival", "Concierto"];
        const select = document.getElementById("tipo");
        tipos.forEach(tipo => {
            const option = document.createElement("option");
            option.value = tipo;
            option.textContent = tipo;
            select.appendChild(option);
        });
    }

    await cargarLocalidades();
    await cargarGeneros();
    cargarCategorias();
    cargarTipos();

    const form = document.getElementById("create-event");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const rawValue = document.getElementById("fechahora").value;
        const formatted = rawValue.replace("T", " ") + ":00";

        const data = {
            nombre: document.getElementById("nombre").value,
            descripcion: document.getElementById("descripcion").value,
            localidad_id: parseInt(document.getElementById("localidad").value, 10),
            recinto: document.getElementById("recinto").value,
            plazas: parseInt(document.getElementById("plazas").value, 10),
            fechayhora: formatted,
            tipo: document.getElementById("tipo").value,
            categoria_precio: document.getElementById("categoria").value,
            genero_id: parseInt(document.getElementById("genero").value, 10),
            organizador_dni: document.getElementById("dni").value,
            imagen: null
        };

        try {
            const response = await fetch(baseUrl + "/evento/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error creando evento:", errorData);
                throw new Error(JSON.stringify(errorData.detail));
            }

            alert("Evento creado correctamente!");
            form.reset();
            window.location.href = "index.html";

        } catch (error) {
            alert("Error al crear evento, mira la consola");
            console.error("Error al crear evento", error);
        }
    });
});