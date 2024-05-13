addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', function(){
        window.location.assign("./html/phasergame.html");
    });

    document.getElementById('ranking').addEventListener('click', function(){
        window.location.assign("./html/ranking.html");
    });

    document.getElementById('exit').addEventListener('click', function(){
        console.warn("No es pot sortir!");
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

