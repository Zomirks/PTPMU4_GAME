<?php
//      Class Player avec un id, un nom et un score
class Player {
    private $id;
	private $name;
	private $score;
	
	function __construct() {
		$this->id = 0;
		$this->name = 'inconnu';
		$this->score = 0;
	}
    
    //      On charge les données envoyées par formulaire avec la méthode POST
    function chargePOST() {
		$ok = true;
		$message = '';
		if (isset($_POST['id']) && !empty($_POST['id']))
			$this->id = intval($_POST['id']);
		if (isset($_POST['name']) && !empty($_POST['name']))
			$this->name = $_POST['name'];
		else {
			$ok = false;
			$message .= '<p>name manquant</p>';
		}
		if (isset($_POST['score']) && !empty($_POST['score']))
			$this->score = $_POST['score'];
		else {
			$ok = false;
			$message .= '<p>score manquant</p>';
		}
 
		$result = array('ok' => $ok, 'message' => $message, 'html' => '');
		return $result;
	}
    
    //      Permet après avoir utilisé la fonction chargePost() d'insérer dans la base de donnée le nom et score de l'utilisateur (l'id se fait automatiquement)
    function insertIntoDB() {
        try {
            $pdo = new PDO('mysql:host=base.iha.unistra.fr;dbname=jscrew;charset=utf8', 'jscrew', 'fgnUsUt9toikTIls');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // construction de la requête
            $sql = 'insert into tableauScore (name, score)
                            values (\''.$this->name.'\', \''.$this->score.'\');';
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

        //return json_encode($result); // si c'est une fonction
        $json = json_encode($result); // si ce code produit le JSON
        echo $json;
    }
}

//      On crée un nouvel objet player, on charge les données envoyées par la méthode POST dans des variables et ensuite on les insert dans la base de donnée
 
$player = new Player();
$result = $player->chargePOST();
if ($result['ok']) {
    $player->insertIntoDB();
}
$json = json_encode($result);
echo $json;

