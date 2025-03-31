document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".concerts-display");
    let index = 0;
    const imgWidth = 110;
    const imgVisible = 5;
    const imgTotal = 10;
    
    function moveCarrusel(){
        index++;
        if(index > imgTotal - imgVisible){
            index = 0;
        }
        track.style.transform = `translateX(-${index * imgWidth}px)`;
    }
    
    setInterval(moveCarrusel, 5000);
});