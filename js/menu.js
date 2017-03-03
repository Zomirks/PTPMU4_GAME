document.addEventListener("DOMContentLoaded", function(event){
    var menu = document.getElementById("menu");
    var newGame = document.getElementById("newGame");
    var scriptJeu = document.createElement("script");
    var myBody = document.getElementById("body");
    scriptJeu.src = "./js/script.js"
    newGame.addEventListener("click", function(){
        menu.style.display = "none";
        gameStart();
    });
});
