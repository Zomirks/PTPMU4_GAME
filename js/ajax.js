document.getElementById('ajax_button').addEventListener('click', function () {
	$.ajax({
		// URL du script coté serveur
		url: "./php/select.php",
 
		// Le format pour recevoir les données
		dataType : "json",
 
		// La fonction a exécuter en cas de réussite
		success: function(retour) {    
 			var requete = document.getElementById('classement');
            requete.innerHTML = "";
			retour.score.forEach(function (article) {
				var elt = document.createElement("p");
				elt.innerHTML = article.id+' '+article.name+' '+article.score;
				requete.appendChild(elt);
            });
		}
	})
});