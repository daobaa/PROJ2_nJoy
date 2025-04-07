document.addEventListener("DOMContentLoaded", function () {
    const tracks = document.querySelectorAll(".concerts-display");
    const imgWidth = 110;
    const imgVisible = 5;
    const imgTotal = 10;
    
    tracks.forEach(track => {
        let index = 0;
        function moveCarrusel(){
            index++;
            if(index > imgTotal - imgVisible){
                index = 0;
            }
            track.style.transform = `translateX(-${index * imgWidth}px)`;
        }
        
        (function startInterval(){
            setInterval(moveCarrusel, 2000);
        })();
    });

});