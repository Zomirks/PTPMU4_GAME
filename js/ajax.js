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

            //id.appendChild(i);



            retour.score.forEach(function(article) {
                var elt = document.createElement("li");

                var id = document.createElement("div");
                id.className = "classementPosition";
				id.id = "position"+i;
                id.append(i+'.');
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
        }
    })
});
