//      Définition des variables
var menu = document.getElementById("menu");
var controler = document.getElementById("control");
var newGame = document.getElementById("newGame");
var scriptJeu = document.createElement("script");
var myBody = document.getElementById("body");
scriptJeu.src = "./js/script.js";

//		Lance une nouvelle partie lorsque la page est chargée
document.addEventListener("DOMContentLoaded", function(event) {
    newGame.addEventListener("click", function() {
        menu.style.display = "none";
        controler.style.display = "flex";
        gameStart();
    });
});

//		Affiche le classement des joueurs lors du click sur "classement" dans le menu
document.getElementById('ajax_button').addEventListener('click', function() {
    $.ajax({
        // URL du script coté serveur
        url: "./php/select.php",

        // Le format pour recevoir les données
        dataType: "json",

        // La fonction a exécuter en cas de réussite
        success: function(retour) {
            //  Pour chaque éléments dans la base de donnée on crée un li contenu dans un ul avec classe "ulClassement"
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
            
            //      Création d'un bouton retour pour retourner au menu principal
            var retourMenu = document.createElement("div");
            retourMenu.id = "retourMenu";
            retourMenu.innerHTML = "Retour";
            $('#menu').append(retourMenu);

			//		Au clic sur le bouton retour lorsqu'on est dans classement on regénère le menu avec du js
            document.getElementById('retourMenu').addEventListener('click', function() {
                $('#title').text("");
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

                //      Permet de relancer une nouvelle partie après avoir regarder le classement, être retourné dans le menu et avoir click sur "Nouvelle partie"
                newGame.addEventListener("click", function() {
                    menu.style.display = "none";
                    controler.style.display = "flex";
                    gameStart();
                });
                //		Affiche le classement des joueurs lors du click sur "classement" dans le menu
                document.getElementById('ajax_button').addEventListener('click', function() {
                    $.ajax({
                        // URL du script coté serveur
                        url: "./php/select.php",

                        // Le format pour recevoir les données
                        dataType: "json",

                        // La fonction a exécuter en cas de réussite
                        success: function(retour) {
                            //  Pour chaque éléments dans la base de donnée on crée un li contenu dans un ul avec classe "ulClassement"
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

                            //      Création d'un bouton retour pour retourner au menu principal
                            var retourMenu = document.createElement("div");
                            retourMenu.id = "retourMenu";
                            retourMenu.innerHTML = "Retour";
                            $('#menu').append(retourMenu);

                            //		Au clic sur le bouton retour lorsqu'on est dans classement on regénère le menu avec du js
                            document.getElementById('retourMenu').addEventListener('click', function() {
                                $('#title').text("");
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

                                //      Permet de relancer une nouvelle partie après avoir regarder le classement, être retourné dans le menu et avoir click sur "Nouvelle partie"
                                newGame.addEventListener("click", function() {
                                    menu.style.display = "none";
                                    controler.style.display = "flex";
                                    gameStart();
                                });
                            });
                        }
                    })
                });    
            });
        }
    })
});



