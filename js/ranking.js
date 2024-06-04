addEventListener('load', function() {
    const divPuntuacions = document.getElementById("puntuacions");   
    const ranking = localStorage.getItem("ranking");
    console.log("Ranking:", ranking);

    const ul = document.createElement("ul");

    if (ranking === null || ranking === "[]") {
        console.log("No hi ha ranking");
        const text = document.createElement("text");
        text.textContent = "No hi ha puntuacions disponibles.";
        ul.appendChild(text);
    } 
    else {
        const listaRanking = JSON.parse(ranking);
        listaRanking.forEach((entry, index) => {
            const li = document.createElement("li");
            li.textContent = `${index + 1}: ${entry.nom} | ${entry.puntuacio} punts`;
            ul.appendChild(li);
        });
    }
    divPuntuacions.appendChild(ul);

    document.getElementById('exit').addEventListener('click', 
    function(){
    window.location.assign("../");
    });

    var audioPlayer = document.getElementById('audioPlayer');
    var audioIcon = document.getElementById('audioIcon');
    if (audioPlayer.paused) {
        audioPlayer.play();
        audioIcon.classList.remove('fa-volume-up');
        audioIcon.classList.add('fa-volume-mute'); 
    }
    

    document.getElementById('Audio').addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            audioIcon.classList.remove('fa-volume-mute');
            audioIcon.classList.add('fa-volume-up');
        }
        else{
            audioPlayer.pause();
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute'); 
        } 
    });
});
