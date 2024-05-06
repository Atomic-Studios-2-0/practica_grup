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

    document.getElementById('return').addEventListener('click', 
    function(){
    window.location.assign("../");
    });
});
