document.addEventListener("DOMContentLoaded", function() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    console.log(usuario);
    const authLinks = document.getElementById("auth-links");
    const userProfileElement = document.getElementById("user-profile");

    if(usuario){
        const profileLink = document.createElement("a");
        profileLink.href = "#";
        const profileText = document.createElement("h3");
        profileText.textContent = `Hola, ${usuario.ncompleto}`;
        profileLink.appendChild(profileText);
        profileLink.classList.add("profile-link");

        const dropDown = document.createElement("div");
        dropDown.classList.add("dropdown-menu");

        const ticketPageOption = document.createElement("a");
        ticketPageOption.href = "tickets.html";
        const  ticketPageText = document.createElement("h3");
        ticketPageText.textContent = "Ver mis tickets";
        ticketPageOption.append(ticketPageText)

        dropDown.appendChild(ticketPageOption)

        const logoutOption = document.createElement("a");
        logoutOption.href = "#";
        const logoutText = document.createElement("h3");
        logoutText.textContent = "Cerrar sesión";
        logoutOption.appendChild(logoutText);
        logoutOption.addEventListener("click", () =>{
            localStorage.removeItem("usuario");
            window.location.href = "index.html";
        });

        dropDown.appendChild(logoutOption);

        authLinks.style.display = "none";
        userProfileElement.appendChild(profileLink);
        userProfileElement.appendChild(dropDown);

        let timeout;
        profileLink.addEventListener("mouseenter", () => {
            clearTimeout(timeout);
            dropDown.style.display = 'block';
        });
        profileLink.addEventListener("mouseleave", () => {
            timeout = setTimeout(() => {
                dropDown.style.display = "none";
            }, 250);
        });
        dropDown.addEventListener("mouseenter", () => {
            clearTimeout(timeout);
            dropDown.style.display = "block";
        });
        dropDown.addEventListener("mouseleave", () => {
            timeout = setTimeout(() => {
                dropDown.style.display = "none";
            }, 250);
        });

    } else{
        authLinks.style.display = "flex";
        userProfileElement.style.display = "none";
    }
});