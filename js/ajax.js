var menu = document.getElementById("menu");
var controler = document.getElementById("control");
var newGame = document.getElementById("newGame");
var scriptJeu = document.createElement("script");
var myBody = document.getElementById("body");
scriptJeu.src = "./js/script.js";

//		Lance une nouvelle partie
document.addEventListener("DOMContentLoaded", function(event) {
    newGame.addEventListener("click", function() {
        menu.style.display = "none";
        controler.style.display = "flex";
        gameStart();
    });
});

//		Affiche le classement des joueurs
document.getElementById('ajax_button').addEventListener('click', function() {
    $.ajax({
        // URL du script coté serveur
        url: "./php/select.php",

        // Le format pour recevoir les données
        dataType: "json",

        // La fonction a exécuter en cas de réussite
        success: function(retour) {
            $('#title').text("Classement");
            $('ul').remove();
            var ulClassement = document.createElement("ul");
            ulClassement.id = "ulClassement";
            $('#menu').append(ulClassement);

            var i = 1;
            retour.score.forEach(function(article) {
                var elt = document.createElement("li");

                var id = document.createElement("div");
                id.className = "classementPosition";
                id.id = "position" + i;
                id.append(i + '.');
                elt.append(id);

                var name = document.createElement("div");
                name.className = "classementName";
                name.innerHTML = article.name;
                elt.appendChild(name);

                var score = document.createElement("div");
                score.className = "classementScore";
                score.innerHTML = article.score;
                elt.appendChild(score);

                ulClassement.appendChild(elt);
                i += 1;
            });

            var retourMenu = document.createElement("div");
            retourMenu.id = "retourMenu";
            retourMenu.innerHTML = "Retour";
            $('#menu').append(retourMenu);

			//			Permet de retourner au menu 
            document.getElementById('retourMenu').addEventListener('click', function() {
                $('#title').text("Game");
                $('ul').remove();
                retourMenu.remove();
                var ulMenu = document.createElement("ul");
                ulMenu.id = "ulMenu";
                $('#menu').append(ulMenu);

                var newGame = document.createElement("li");
                newGame.id = "newGame";
                newGame.innerHTML = "Nouvelle partie";
                ulMenu.append(newGame);

                var classement = document.createElement("li");
                classement.id = "ajax_button";
                classement.innerHTML = "Classement";
                ulMenu.append(classement);

                var credit = document.createElement("li");
                credit.id = "credit";
                credit.innerHTML = "Crédits";
                ulMenu.append(credit);

                newGame.addEventListener("click", function() {
                    menu.style.display = "none";
                    controler.style.display = "flex";
                    gameStart();
                });
            });
        }
    })
});



