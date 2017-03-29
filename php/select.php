<?php
//  On sélectionne le nom et le score dans la table tableauScore dans la base de donnée et on le retourne en json pour le réutiliser dans ajax.js
try {
    $pdo = new PDO('mysql:host=base.iha.unistra.fr;dbname=jscrew;charset=utf8', 'jscrew', 'fgnUsUt9toikTIls');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	// construction de la requête
	$sql = 'select name, score from tableauScore order by score desc;';
	// exécution de la requête
	$query = $pdo->query($sql);

	$tab = array();
	// boucle construisant le résultat
	while ( $objet = $query->fetch(PDO::FETCH_OBJ) ) {
		array_push($tab, $objet);
	}
    //echo $chaine;
	$result = array('name', 'score' => $tab);
	$pdo = null;
}
catch (Exception $e) {
	// code exécuté si une erreur à lieu dans le bloc try
	$result = array(null);
}
//var_dump($result);
//return json_encode($result); // si c'est une fonction
$json = json_encode($result); // si ce code produit le JSON
echo $json;
//var_dump($json);	// fin de la connexion
