addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', function(){
        window.location.assign("./html/phasergame.html");
    });

    document.getElementById('exit').addEventListener('click', function(){
        console.warn("No es pot sortir!");
    });
});