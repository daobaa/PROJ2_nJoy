document.addEventListener("DOMContentLoaded", function() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const normalNav = document.querySelector(".main-header");
    const authLinks = document.getElementById("auth-links");

    if(usuario.email == "admin@admin.com"){
        normalNav.innerHTML = "";
        normalNav.style.backgroundColor = "pink";

        const logoGroup = document.createElement("a");
        logoGroup.href = "index.html";
        const logoGroupDiv = document.createElement("div");
        logoGroupDiv.classList.add("header-logo");
        const logoIMG = document.createElement("img");
        logoIMG.src = "../img/logo.png";
        logoIMG.id = "logo";
        logoIMG.alt = "logo-njoy";
        const logoH1 = document.createElement("h1");
        logoH1.textContent = "nJoy";

        const navDiv = document.createElement("div");
        navDiv.classList.add("header-links");
        const createEvent = document.createElement("a");
        createEvent.href = "create_event.html";
        const textEvent = document.createElement("h3");
        textEvent.textContent = "Crear Evento";
   
        const userProfile = document.createElement("div");
        userProfile.id = "user-profile";

        logoGroupDiv.append(logoIMG, logoH1);
        logoGroup.append(logoGroupDiv);
        createEvent.append(textEvent);
        navDiv.append(createEvent, userProfile);
        normalNav.append(logoGroup, navDiv);

        const dropDown = document.createElement("div");
        dropDown.classList.add("dropdown-menu");

        const logoutOption = document.createElement("a");
        logoutOption.href = "#";
        const logoutText = document.createElement("h3");
        logoutText.textContent = "Cerrar sesión";
        logoutOption.append(logoutText);
        logoutOption.addEventListener("click", () =>{
            localStorage.removeItem("usuario");
            window.location.href = "index.html";
        });

        dropDown.appendChild(logoutOption);

        const profileLink = document.createElement("a");
        profileLink.href = "#";
        const profileText = document.createElement("h3");
        profileText.textContent = usuario.email;
        profileLink.append(profileText)
        userProfile.append(profileLink);
        userProfile.append(dropDown);

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
        const userProfile = document.getElementById("user-profile");
        if(userProfile){
            userProfile.style.display = "none";
        }
    }
});