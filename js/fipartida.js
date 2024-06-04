addEventListener('load', function() {
    const score = localStorage.getItem('PuntFinal');
    document.getElementById('score').innerText = 'Puntuación final: ' + score;

    console.log("Puntuacio:", score);

    document.getElementById('exit').addEventListener('click', 
    function(){
        const nom = document.getElementById('playerName').value;
        if(nom){
            // Obtenir el ranking del localStorage 
            let ranking = localStorage.getItem("ranking");   
            if (ranking === null) {
                ranking = [];
            } else {
                ranking = JSON.parse(ranking);
            }

            // Afegir el nom i puntuacio al ranking
            ranking.push({nom , score});

            // Ordenar el ranking
            ranking.sort((a, b) => b.score - a.score);

            // Deixar només les 10 primeres puntuacions
            if (ranking.length > 10) {
                ranking.pop();
            }

            // Guardar el ranking
            localStorage.setItem("ranking", JSON.stringify(ranking));

            // Tornar al menú principal
            window.location.assign("../");
        }
        else{
            alert('Por favor, ingresa tu nombre.');
        }
    
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