function gameStart() {
    // Variables de l'interface graphique du jeu
    var gameCanvas = document.getElementById("graphics");
    var ctx = gameCanvas.getContext('2d');

    // Activer la visualisation des barrières
    var showInvisibleBlocks = false;
    // Activer la vue des informations par défaut (appuyer sur "i" pour activer/désactiver)
    var showInformation = false;
    var deathScreen = false;
    var AnimationLoop;
    var isPause = false;



      /* ---------------------------------------------- */
      /* ---------- Déclaration des objets ------------ */
      /* ---------------------------------------------- */

      // ------- Héros ---------
      var hero = new Object("src/characters/hero_fix.png", 30, 30, 44, 32);
      var weapon = new Object("src/weapons/weapon_right1.png", -10000, -10000, 10, 26);
      var chest = new Object("src/terrain/chest.png", 1120+10*28, 220, 30, 38);
      var score = 0;

      // ------- Blocs ---------
      // plateformes normales solides, avec des tiles graphiques
      var blocks = new Array();
      blocks[0] = new Object("src/terrain/p1.png", 30, 300, 30, 10*28);
      blocks[1] = new Object("src/terrain/p3.png", 30, 200, 30, 30);
      blocks[2] = new Object("src/terrain/p3.png", 120, 250, 30, 30);
      blocks[3] = new Object("src/terrain/p3.png", 120, -50, 30, 30);
      blocks[4] = new Object("src/terrain/p3.png", 250, 150, 30, 6*28);
      blocks[5] = new Object("src/terrain/p1.png", 350, 250, 30, 10*28);
      blocks[6] = new Object("src/terrain/p3.png", 460, 220, 30, 30);
      blocks[7] = new Object("src/terrain/door.png", 600-4, 166, 84, 30);
      blocks[8] = new Object("src/terrain/p1.png", 600, 136, 30, 30);
      blocks[9] = new Object("src/terrain/p1.png", 600, 106, 30, 30);
      blocks[10] = new Object("src/terrain/p1.png", 600, 76, 30, 30);
      blocks[11] = new Object("src/terrain/p1.png", 600, 46, 30, 32*28);
      blocks[12] = new Object("src/terrain/p1.png", 600, 250, 30, 7*28);
      blocks[13] = new Object("src/terrain/p1.png", 900, 250, 30, 5*28);
      blocks[14] = new Object("src/terrain/p1.png", 1120, 250, 30, 14*28);
      blocks[15] = new Object("src/terrain/p1.png", 1120+13*28, 220, 30, 30);
      blocks[16] = new Object("src/terrain/p1.png", 1120+13*28, 190, 30, 30);
      blocks[17] = new Object("src/terrain/p1.png", 1120+13*28, 160, 30, 30);
      blocks[18] = new Object("src/terrain/p1.png", 1120+13*28, 130, 30, 30);
      blocks[19] = new Object("src/terrain/p1.png", 1120+13*28, 100, 30, 30);
      blocks[20] = new Object("src/terrain/p1.png", 1120+13*28, 70, 30, 30);
      blocks[21] = new Object("src/terrain/p1.png", 1120+13*28, 46, 30, 30);
      // blocs provoquant des dommages (piques)
      var damageBlocks = new Array();
      damageBlocks[0] = new Object("src/terrain/sp1.png", 490, 221, 30, 2*30);
      damageBlocks[1] = new Object("src/terrain/sp1.png", 1180, 221, 30, 2*28);
      // blocs unicolores solides
      var fillBlocks = new Array();
      fillBlocks[0] = new Object("src/terrain/p1.png", 250, 180, 300, 6*28+2); fillBlocks[0].color = '#586730';
      fillBlocks[1] = new Object("src/terrain/p1.png", 30, 330, 100, 10*28+2); fillBlocks[1].color = '#55412F';
      fillBlocks[2] = new Object("src/terrain/p1.png", 350, 280, 300, 10*28+2); fillBlocks[2].color = '#55412F';
      fillBlocks[3] = new Object("src/terrain/p1.png", 600, 76, 400, 32*28+2); fillBlocks[3].color = '#795E42';
      fillBlocks[4] = new Object("src/terrain/p1.png", 600, 250, 300, 7*28+2); fillBlocks[4].color = '#55412F';
      fillBlocks[5] = new Object("src/terrain/p1.png", 900, 250, 300, 5*28+2); fillBlocks[5].color = '#55412F';
      fillBlocks[6] = new Object("src/terrain/p1.png", 1120, 250, 300, 14*28+2); fillBlocks[5].color = '#55412F';
      // blocs mobiles
      var test = blocks.slice() ;
      test.splice(3,1);  // créer un tableau sans le bloc 11
      // Initiation du mode d'affichage des blocs invisibles (en cas d'activation directe)
        if (showInvisibleBlocks == true)
            invisibleBlockSprite = "show_p_inv";
        else
            invisibleBlockSprite = "p_inv";
      /* blocs invisibles */
      invisibleBlocks = new Array();
      invisibleBlocks[0] = new Object("src/terrain/"+invisibleBlockSprite+".png", 310, 270, 30, 30);
      invisibleBlocks[1] = new Object("src/terrain/"+invisibleBlockSprite+".png", 220, 120, 30, 30);
      invisibleBlocks[2] = new Object("src/terrain/"+invisibleBlockSprite+".png", 220+7*28, 120, 30, 30);
      invisibleBlocks[3] = new Object("src/terrain/"+invisibleBlockSprite+".png", 870, 220, 30, 30);
      invisibleBlocks[4] = new Object("src/terrain/"+invisibleBlockSprite+".png", 900+5*28+2, 220, 30, 30);
      invisibleBlocks[5] = new Object("src/terrain/"+invisibleBlockSprite+".png", 1090, 220, 30, 30);
      // liste de tout les blocs solides
      allblocks = blocks.concat(invisibleBlocks);
      console.log(allblocks);
      // ------- Monstres ---------
      var monsters = new Array();
      monsters[0] = new Object("src/monsters/gr_slime_left.png", 190, 220, 28, 30); monsters[0].mtype = 'gr_slime';
      monsters[1] = new Object("src/monsters/gr_slime_right.png", 160, 270, 28, 30); monsters[1].mtype = 'gr_slime';
      monsters[2] = new Object("src/monsters/gr_slime_right.png", 274, 106, 28, 30); monsters[2].mtype = 'gr_slime';
      monsters[3] = new Object("src/monsters/rodeur_left.png", 930, 220-42, 42, 34); monsters[3].mtype = 'rodeur';
      monsters[4] = new Object("src/monsters/rodeur_left.png", 1300, 250-42, 42, 34); monsters[4].mtype = 'rodeur';
      // ------ Effets ---------
      var killAnimations = new Array();

      // Variables concernant l'initation des attributs des objets
      hero.velocity_x = 0;
      hero.velocity_y = 3;
      hero.gravity = 3;
      hero.weight = 0.3;
      hero.pv = 5;

      blocks[3].gravity = 1;
      blocks[3].weight = 0.3;
      blocks[3].velocity_y = 3;

      for (i=0; i<damageBlocks.length; i++){
        damageBlocks[i].degat = 1;
      }

      weapon.degat = 1;

      var attackTime = 0;
      var attackDelay = 0;

        /* --------------------------------- */
        /* ---------- Ckeckkey ------------- */
        /* --------------------------------- */
        document.onkeydown = checkKeyDown;
        document.onkeyup = checkKeyUp;
        // Boléens qui définissent si le personnage va dans une direction
        var isLeft = false;
        var isRight = false;
        var isJumping = false;
        var isAttacking = false;
        var orientation = 'right';

        //  Permet de choisir la façon dont l'on souhaite jouer Flèches / ZQSD
        var ArrowControl = document.getElementById('Arrow');
        var ZQSDControl = document.getElementById('ZQSD');

        var controlJump = "38";
        var controlDown = "40";
        var controlRight = "39";
        var controlLeft = "37";

        ArrowControl.addEventListener("click", function(event) {
            ZQSDControl.style.border = "none";
            ArrowControl.style.border = "1px solid blue";
            controlJump = "38";
            controlDown = "40";
            controlRight = "39";
            controlLeft = "37";
        });

        ZQSDControl.addEventListener("click", function(event) {
            ArrowControl.style.border = "none";
            ZQSDControl.style.border = "1px solid blue";
            controlJump = "90";
            controlDown = "83";
            controlRight = "68";
            controlLeft = "81";
        });

        function checkKeyDown(e) {
            e = e || window.event;
            if (e.keyCode == "27") {pauseScreen(isPause);}
            if (e.keyCode == '32') { if(attackDelay == 0) isAttacking = true}
            if (e.keyCode == controlJump) {isJumping = true}
            if (e.keyCode == controlDown) {}
            if (e.keyCode == controlLeft) {isLeft = true;   orientation = 'left'}
            if (e.keyCode == controlRight) {isRight = true; orientation = 'right'}
            if (e.keyCode == '73') { showInformation = !showInformation}
            if (e.keyCode == '65') { showInvisibleBlocks = !showInvisibleBlocks}
        }

        function pauseScreen(pause) {
            var ScreenWhenPause = document.getElementById("pauseScreen");
            switch (pause) {
                case true:
                    AnimationLoop = requestAnimationFrame(MainLoop, 1000 / 60);
                    ScreenWhenPause.style.display = "none";
                    isPause = false;
                    gameCanvas.className -= " flou";
                    break;
                case false:
                    cancelAnimationFrame(AnimationLoop);
                    ScreenWhenPause.style.display = "block";
                    isPause = true;
                    gameCanvas.className += " flou";
                    break;
            }
        }

        function checkKeyUp(e) {
            e = e || window.event;
            if (e.keyCode == controlJump) {isJumping = false}
            if (e.keyCode == controlDown) {}
            if (e.keyCode == '32') {}
            if (e.keyCode == controlLeft) isLeft = false;
            if (e.keyCode == controlRight) isRight = false;
        }

        function endGame(score) {
            deathScreen = true;
            gameCanvas.style.display = "none";

            var myBody = document.getElementById("body");
            var deathMessage = document.createElement("div");
            deathMessage.setAttribute("id", "deathMessage");
            deathMessage.innerHTML = '<p>You won!</p><p class="maybe">... (or maybe not)';

            myBody.appendChild(deathMessage);

            var formulaireInsert = document.createElement("form");
            formulaireInsert.setAttribute('id', 'formInsert');
            formulaireInsert.setAttribute('method', 'post');
            formulaireInsert.setAttribute('enctype', 'multipart/form-data');
            deathMessage.appendChild(formulaireInsert);

            var inputId = document.createElement("input");
            inputId.setAttribute('type', 'hidden');
            inputId.readOnly = true;
            inputId.setAttribute('name', 'id');
            formulaireInsert.appendChild(inputId);

            var inputName = document.createElement("input");
            inputName.setAttribute('type', 'text');
            inputName.setAttribute('id', 'name');
            inputName.setAttribute('name', 'name');
            inputName.setAttribute('placeholder', 'Votre Pseudo');
            formulaireInsert.appendChild(inputName);

            var inputScore = document.createElement("input");
            inputScore.setAttribute('type', 'hidden');
            inputScore.readOnly = true;
            inputScore.setAttribute('id', 'score');
            inputScore.setAttribute('value', score);
            inputScore.setAttribute('name', 'score');
            formulaireInsert.appendChild(inputScore);

            var submit = document.createElement("input");
            submit.setAttribute('type', 'submit');
            submit.setAttribute('id', 'envoyer');
            submit.setAttribute('value', 'Envoyer');
            formulaireInsert.appendChild(submit);

            $(document).ready(function () {
                $("#formInsert").on('submit', function(e) {
                    e.preventDefault(); // J'empêche le comportement par défaut du navigateur, c-à-d de soumettre le formulaire

                    var $this = $(this); // L'objet jQuery du formulaire

                    // Je récupère les valeurs
                    var name = $('#name').val();
                    var scoreInput = $('#score').val();

                    // Je vérifie une première fois pour ne pas lancer la requête HTTP
                    // si je sais que mon PHP renverra une erreur
                    if(name === '') {
                        alert('Les champs doivent êtres remplis');
                    } else {
                        // Envoi de la requête HTTP en mode asynchrone
                        $.ajax({
                            url:  "./php/insert.php",
                            type: $this.attr('method'), // La méthode indiquée dans le formulaire (get ou post)
                            data: $this.serialize(),
                            success: function(html) { // Je récupère la réponse du fichier PHP
                                deathMessage.removeChild(formulaireInsert);
                                var retourMenu = document.createElement("a");
                                retourMenu.setAttribute("href", "./index.html");
                                retourMenu.innerHTML += "Menu";
                                deathMessage.appendChild(retourMenu);
                                console.log("Nouveau score envoyé dans le classement général (BDD)");
                            }
                        });
                    }
                });
            });
        }


    /* --------------------------------- */
    /* ---------- Main Loop ------------ */
    /* --------------------------------- */
      /* Function MainLoop
      * Boucle principale permettant de définir les frames d'execution
      * Déclenche les évènements du jeu et le rendu graphique à chaque frame
      */
      function MainLoop(){

        /* -----------------  VARS INIT  ---------------- */
        /* Pré-initilialisation des déplacements */
        // Héros
        hero.x += hero.velocity_x;
        hero.y += hero.velocity_y;
        hero.weight = 0.3;

        // Blocs mobiles
        blocks[3].x += blocks[3].velocity_x;
        blocks[3].y += blocks[3].velocity_y;
        blocks[3].weight = 0.3;

        /* ----------------------------------------------- */
        /* -----------------  TRAITEMENT  ---------------- */
        /* ----------------------------------------------- */

        // -------------- Traitement des effets propres aux monstres ---------------
        for (j=0; j<monsters.length; j++){
          monsters[j].x += monsters[j].velocity_x;
          monsters[j].y += monsters[j].velocity_y;
          monsters[j].weight = 0.3;
          monsters[j].fall();
          monsters[j].CollidingEffects(allblocks);
          monsters[j].iaChangePathOnColliding();
        }

        // ------------- Traitements des effets et interactions du héros ----------------
        // Déplacements droite / gauche
        if ((isRight == false) && (isLeft == true)) hero.velocity_x = -2;
        else if ((isRight == true) && (isLeft == false)) hero.velocity_x = 2;
        else if ((isRight == true) && (isLeft == true)) hero.velocity_x = 0;
        else hero.velocity_x = 0;

        // Collisions du héros contre les blocs
        hero.HeroCollidingEffects(blocks);

        // Chute
        hero.fall();
        // Saut
        if (isJumping && hero.IsCollidingBelow == true){
          hero.velocity_y = -6.5;
        }

        // Dégats : monstre sur héros
        hero.takeDamageFromTab(monsters);
        // Dégats : blocs sur héros (piques)
        hero.takeDamageFromTab(damageBlocks);
        // Dégats : Coup d'épée (héros sur monstre)
        for (j=0;j<monsters.length;j++){
          monsters[j].takeDamageFromObject(weapon);
        }

        // Délai d'attaque de l'arme avant un nouveau coup
        if (isAttacking) {
          attackTime += 1;
          if (attackTime == 17){
            isAttacking = false;
            attackDelay = 30;
          }
        }
        if (attackDelay > 0){
          attackDelay -= 1;
          if (attackDelay == 0)
            attackTime = 0;
        }

        // Orientation de l'arme
        if (orientation == 'left' && isAttacking == true){
          weapon.sprite.src = "src/weapons/weapon_left1.png";
          weapon.x = hero.x-weapon.width;
          weapon.y = hero.y+26;
        }
        if (orientation == 'right' && isAttacking == true){
          weapon.sprite.src = "src/weapons/weapon_right1.png" ;
          weapon.x = hero.x+hero.width-4;
          weapon.y = hero.y+26;
        }
        if (isAttacking == false){
          weapon.x = -10000;
          weapon.y = -10000;
        }

        // Défaite
        if ((hero.pv == 0) || (hero.y > 450) && (deathScreen == false)){
          endGame(score);
            console.log(score);
        }

        // Evènements
        // Porte qui s'ouvre
        if (monsters[0].pv == 0 && monsters[1].pv == 0 && monsters[2].pv == 0){
          blocks[7].x = -30000;
          blocks[7].y = -30000;
        }
        if (hero.isColliding(chest)){
          score = score + 100;
          endGame(score)
        }

        // ------------- Traitements des effets et interactions des blocs ----------------
        blocks[3].CollidingEffects(test);

        /* -----------------  RENDU  ---------------- */

        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

        // Placement des blocs sur le terrain
        /* Blocs monochrome non-solides */
        for (i=0; i<fillBlocks.length; i++){
          fillBlocks[i].renderFillBlocks(ctx);
        }
        /* Plateformes et blocs solides */
        for (i=0; i<blocks.length; i++){
          blocks[i].renderBlocks(ctx);
        }
        /* Blocs solides provoquant des dommages */
        for (i=0; i<damageBlocks.length; i++){
          damageBlocks[i].renderBlocks(ctx);
        }
        /* Blocs invisibles */
        for (i=0; i<invisibleBlocks.length; i++){
          invisibleBlocks[i].renderBlocks(ctx);
        }

        // Placement des effets sur le terrain
        /* Animation quand un monstre est vaincu*/
        if (killAnimations[0] != null){
          for (i=0; i<killAnimations.length; i++){
            killAnimations[i].render(ctx);
            killAnimations[i].renderUpdate(3, 7);
            if (killAnimations[i].frameIndex == 6){
              killAnimations.splice(i,1);
            }
          }
        }

        // Placement des monstres sur le terrain
        for (i=0;i<monsters.length;i++){
          // changement du sprite selon l'orientation
          if (monsters[i].getDirectionByVelocityX() == 'isLeft')
            monsters[i].sprite.src = "src/monsters/"+monsters[i].mtype+"_left.png";
          if (monsters[i].getDirectionByVelocityX() == 'isRight')
            monsters[i].sprite.src = "src/monsters/"+monsters[i].mtype+"_right.png";
          // Animations de dégât
          if (monsters[i].hitDelay > 0){
            monsters[i].renderUpdate(3, 3);
            monsters[i].render(ctx);
            if (monsters[i].frameIndex == 0);
              monsters[i].frameIndex = 1;
          }
          else {
            monsters[i].frameIndex = 0;
            monsters[i].render(ctx);
          }
        }

        // Placement de l'arme sur le terrain
        weapon.render(ctx);

        // Placement du coffre sur le terrain
        chest.render(ctx);

        // Placement du héros sur le terrain
        if (isRight && (hero.velocity_y == 0)){
          hero.sprite.src = "src/characters/hero_right.png"
          hero.width = 36;
          hero.renderUpdate(3, 6);
          hero.render(ctx, 6);
        }
        else if (isLeft && (hero.velocity_y == 0)){
          hero.sprite.src = "src/characters/hero_left.png"
          hero.width = 36;
          hero.renderUpdate(3, 6);
          hero.render(ctx, 6);
        }
        else if (hero.velocity_y < 0){
          if (orientation == 'left'){
            hero.tickCount = 0;
            hero.frameIndex = 0;
            hero.sprite.src = "src/characters/hero_jump_left.png";
            hero.render(ctx);
            hero.width = 36;
          }
          else if (orientation == 'right'){
            hero.tickCount = 0;
            hero.frameIndex = 0;
            hero.sprite.src = "src/characters/hero_jump_right.png";
            hero.render(ctx);
            hero.width = 36;
          }
        }
        else if (hero.velocity_y > 0){
          if (orientation == 'left'){
            hero.tickCount = 0;
            hero.frameIndex = 0;
            hero.sprite.src = "src/characters/hero_down_left.png";
            hero.render(ctx);
            hero.width = 36;
          }
          else if (orientation == 'right'){
            hero.tickCount = 0;
            hero.frameIndex = 0;
            hero.sprite.src = "src/characters/hero_down_right.png";
            hero.render(ctx);
            hero.width = 36;
          }
        }
        else {
          if (orientation == 'left' && hero.velocity_x == 0){
            hero.tickCount = 0;
            hero.frameIndex = 0;
            hero.width = 36;
            hero.sprite.src = "src/characters/hero_fix_left.png";
            hero.render(ctx);
          }
          else if (orientation == 'right' && hero.velocity_x == 0) {
            hero.tickCount = 0;
            hero.frameIndex = 0;
            hero.width = 36;
            hero.sprite.src = "src/characters/hero_fix_right.png";
            hero.render(ctx);
          }
        }

        // Placement des données visuelles
        var imgHealth = new Image();
        imgHealth.src = 'src/effects/health.png';
        for(i=0;i<hero.pv;i++)
          ctx.drawImage(imgHealth,560-(i*15),10);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '12pt Calibri';
        ctx.fillText('Score: '+score,520,40);

        // Placement de la caméra sur le terrain
        updateRenderOffsetX();

        // Mode d'affichage des blocs invisibles
        if (showInvisibleBlocks == true)
            invisibleBlockSprite = "show_p_inv";
        else
            invisibleBlockSprite = "p_inv";
        // Mode d'affichage des informations
        if (showInformation == true){
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.font = '12pt Calibri';
          ctx.fillText('x: '+Math.round(hero.x),520,60);
          ctx.fillText('y: '+Math.round(hero.y),520,75);
          ctx.fillText('vel_x: '+Math.round(hero.velocity_x*100)/100,520,90);
          ctx.fillText('vel_y: '+Math.round(hero.velocity_y*100)/100,520,105);
        }

        // Défintion des frames de la boucle MainLoop

        AnimationLoop = requestAnimationFrame(MainLoop, 1000/60);

      }
      /*--------------------------- Fin de la boucle MainLoop ----------------------------*/


      /* --------------------------------- */
      /* ----------  Objets -------------  */
      /* --------------------------------- */
      /* Function Object
      * Création d'un objet sur le terrain étant conditionnés par les attributs physiques
      */
      function Object(spriteSrc, xVal, yVal, height, width){
        // Apparence de l'objet
        this.sprite = new Image();
        this.sprite.src = spriteSrc; // source du spritesheet
        this.frameIndex = 0; // Frame actuelle sur le spritesheet
        this.tickCount = 0; // Nombre de tick avant prochaine frame
        // Physique de l'objet
        this.x = xVal;
        this.y = yVal;
        this.velocity_x = 0; // Vitesse de déplacement vers la droite / gauche
        this.velocity_y = 0; // Vitesse de déplacement vers le haut / bas
        this.height = height;
        this.width = width;
        this.gravity = 0;
        this.weight = 0;
        // Collisions
        this.IsCollidingBelow = false;
        this.IsCollidingAbove = false;
        this.IsCollidingLeft = false;
        this.IsCollidingRight = false;
        this.pv = 1;
        this.hitDelay = 0;
        this.degat = 0;
        // Variables cibles
        this.mtype; // type dans le cas d'un monstre
        this.points; // les points à gagner dans le cas d'un monstre vaincu
        this.color; // pour la couleur d'un objet à remplir
      }
      /* Object method isColliding
      * Permet de tester si un objet est contre un autre objet
      */
      Object.prototype.isColliding = function(obj, offsetX = 0, offsetY = 0) {
          /* Nolan : "Attention, gros commentaire en approche.
             Pour chercher les collisions dans chaque sens, j'ai inversé le principe habituel appliqué à une méthode de collision.
             Pour tout les cas, on cherche si le personnage n'a aucun contact avec le bloc, en toute part du bloc (haut, bas, droite, gauche)
             Au cas individuel, on ajoute une expression supplémentaire à la condition qui teste si le joueur à un contact avec un coté du bloc précis (à 1 pixel près)
             Le bloc est alors décomposé de la sorte que chaque face fasse un pixel d'épaisseur, les cotés du blocs étant prioritaires sur les faces du haut et le bas du bloc.
             Quand le joueur a contact avec l'une de ses face, la chaine relative à ce contact est retournée. Elle permet ainsi de traiter les conséquences au cas par cas."
          */
          if (!(this.y > obj.y + obj.height-1 - offsetY) && !(this.y + this.height < obj.y+1) && !(this.x + this.width < obj.x + offsetX) && !(this.x > obj.x + obj.width - offsetX) && (this.x > obj.x + obj.width -1))
            return 'left';
          if (!(this.y > obj.y + obj.height-1 - offsetY) && !(this.y + this.height < obj.y+1) && !(this.x + this.width < obj.x + offsetX) && !(this.x > obj.x + obj.width - offsetX) && (this.x + this.width < obj.x +1))
            return 'right';
          if (!(this.y > obj.y) && !(this.y + this.height < obj.y) && !(this.x + this.width < obj.x+1 + offsetX) && !(this.x > obj.x + obj.width-1 -offsetX) && (this.y + this.height >= obj.y))
            return 'below';
          if (!(this.y > obj.y + obj.height - offsetY) && !(this.y + this.height < obj.y + 0) && !(this.x + this.width < obj.x+1 + offsetX) && !(this.x > obj.x + obj.width-1 -offsetX) && (this.y < obj.y + obj.height))
            return 'above';
      }

      /* Object method HeroisColliding
      * Permet de retourner le sens des collisions du héros sur un tableau de blocs
      */
      Object.prototype.HeroCollidingEffects = function(blocksArray){
        // Remettre à zéro l'effet de collision
        this.IsCollidingBelow = false;
        this.IsCollidingAbove = false;
        this.IsCollidingLeft = false;
        this.IsCollidingRight = false;
        // Calcul des collisions de blocks
        for (i=0; i<blocksArray.length; i++){
          // Collision au sol
          if (this.isColliding(blocksArray[i]) == 'below'){
            this.velocity_y = 0;
            this.y = blocks[i].y - this.height;
            this.IsCollidingBelow = true;
          }
          // Collision de plafond
          if (this.isColliding(blocksArray[i]) == 'above'){
            this.velocity_y = 0;
            this.IsCollidingAbove = true;
          }
          // Collisons latérales (avec tentative de déplacement)
          if (this.isColliding(blocksArray[i]) == 'left' && isLeft){
            this.velocity_x = 0;
            this.IsCollidingLeft = true;
          }
          if (this.isColliding(blocksArray[i]) == 'right' && isRight){
            this.velocity_x = 0;
            this.IsCollidingRight = true;
          }
        }
      }

      /* Object method isCollidingEffects
      * Permet de gérer les effets à la collision sur un objet d'un tableau de blocs
      */
      Object.prototype.CollidingEffects = function(blocksArray){
        // Remettre à zéro l'effet de collision
        this.IsCollidingBelow = false;
        this.IsCollidingAbove = false;
        this.IsCollidingLeft = false;
        this.IsCollidingRight = false;
        // Calcul des collisions de blocks
        for (i=0; i<blocksArray.length; i++){
          // Collision au sol
          if (this.isColliding(blocksArray[i]) == 'below'){
            this.velocity_y = 0;
            this.y = blocksArray[i].y - this.height;
            this.IsCollidingBelow = true;
          }
          // Collision de plafond
          if (this.isColliding(blocksArray[i]) == 'above'){
            this.velocity_y = 0;
            this.IsCollidingAbove = true;
          }
          // Collisons latérales (avec tentative de déplacement)
          if (this.isColliding(blocksArray[i]) == 'left'){
            this.IsCollidingLeft = true;
          }
          if (this.isColliding(blocksArray[i]) == 'right'){
            this.IsCollidingRight = true;
          }
        }
      }
      // Dommage provoqué par un tableau d'objet sur un autre objet
      Object.prototype.takeDamageFromTab = function(tab){
        for (j=0; j<tab.length; j++){
          if (this.isColliding(tab[j], 13, 5) != null){
            if (this.hitDelay == 0){
              this.pv -= tab[j].degat;
              this.hitDelay = 100;
            }
          }
          if (this.hitDelay > 0)
            this.hitDelay -= 1;
        }
      }
      // Dommage provoqué par un objet sur un autre objet
      Object.prototype.takeDamageFromObject = function(obj){
          if (this.isColliding(obj) != null){
            if (this.hitDelay == 0){
              this.pv -= obj.degat;
              this.hitDelay = 30;
              if (this.pv <= 0){
                this.pv = 0;
                IncrementScore(this.points);
                var killAnimation = new Object("src/effects/kill_animation.png", this.x, this.y, 52, 52);
                killAnimations.push(killAnimation);
                this.x = -15000;
                this.y = -15000;
                this.velocity_y = 0;
                this.velocity_x = 0;
                this.weight = 0;
                this.gravity = 0;
              }
            }
          }
          if (this.hitDelay > 0)
            this.hitDelay -= 1;
      }

      // Gestion de la chute d'un objet
      Object.prototype.fall = function(){
        if (this.velocity_y < this.gravity && this.IsCollidingBelow == false)
          this.velocity_y += this.weight;
      }

      // Premer de créer un rendu de l'objet dans le contexte (en cas d'animation)
      Object.prototype.render = function(context){
        context.drawImage(
                   this.sprite,
                   this.frameIndex * this.width,
                   0,
                   this.width,
                   this.height,
                   this.x + renderOffsetX, // Offset pour le défilement horizontal
                   this.y,
                   this.width,
                   this.height);
      }
      // Permet de créer un rendu pour une plateforme large avec des tiles de 30x30
      Object.prototype.renderBlocks = function(context){
        for (j=1;j<=(this.width/28);j++){
          context.drawImage(
             this.sprite,
             this.frameIndex * this.width,
             0,
             this.width,
             this.height,
             this.x + (28*(j-1)) + renderOffsetX, // Offset pour le défilement horizontal
             this.y,
             this.width,
             this.height);
        }
      }
      // Permet de remplir un bloc d'une couleur précise (cible en particulier les fillBlocks)
      Object.prototype.renderFillBlocks = function(context){
        context.beginPath();
        context.rect(this.x + renderOffsetX, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
      }
      // Mise à jour de l'apparence de l'objet entre chaque frame d'animation
      Object.prototype.renderUpdate = function(ticksPerFrame, numberOfFrames){
        this.tickCount += 1;
        if (this.tickCount > ticksPerFrame) {
          this.tickCount = 0;
          if (this.frameIndex < numberOfFrames - 1)
            this.frameIndex += 1;
          else
            this.frameIndex = 0;
        }
      }
      // Retourne la direction de l'objet
      /* Permet en particulier de ciblé si le monstre ou le héros s'oriente à droite ou à gauche, pour ensuite contrôler son rendu graphique*/
      Object.prototype.getDirectionByVelocityX = function(){
        if (this.velocity_x < 0)
          return 'isLeft';
        else if (this.velocity_x > 0)
          return 'isRight';
        else
          return 'fixed';
      }

      /* ---------- Fonctions relatives aux Monstres -----------  */

      // Définition des types de monstres
      Object.prototype.monsterSetAttributes = function(){
        this.gravity = 1;
        this.weight = 0.3;
        this.velocity_y = 3;
        if (this.mtype == "gr_slime"){
          this.velocity_x = 1.5;
          this.pv = 3;
          this.degat = 1;
          this.points = 10;
        }
        else if (this.mtype == "rodeur"){
          this.velocity_x = 1;
          this.gravity = 1;
          this.pv = 5;
          this.degat = 2;
          this.points = 50;
        }
      }
      // Initiation de la fonction
      for (i=0; i<monsters.length; i++){
        monsters[i].monsterSetAttributes();
      }

      // Fonctions IA des monstres
      // Mouvements latéraux des monstres
      Object.prototype.iaLateralMoving = function(speed){
        this.velocity_x = speed;
      }
      // Changement de direction d'un monstre à la rencontre d'un obstacle
      Object.prototype.iaChangePathOnColliding = function(speed){
        if (this.IsCollidingLeft == true || this.IsCollidingRight == true)
          this.iaLateralMoving(-this.velocity_x);
      }


      /* --------------------------------- */
      /* ----------  Camera -------------  */
      /* --------------------------------- */

      // Création d'une caméra
      // Permet de faire en sorte que le rendu du jeu suive le joueur quand il se déplace sur la carte
      function Camera(width,height){
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
      }

      // Positionnement de la caméra (selon la taille de l'écran, ici 600x400)
      var camera = new Camera(600,400);
      var screenBorderLeft = 200; // à partir de quelle position la caméra ne défile plus vers la gauche (limite de la map)
      var screenBorderRight = 2000; // Idem pour la droite
      var renderOffsetX = 0; // position courante de la caméra

      // Update de l'offset de la "caméra" (défillement horizontal)
      function updateRenderOffsetX(){
        if (hero.velocity_x < 0 && hero.x > screenBorderLeft){
          if (hero.x <= camera.x + 200){
            renderOffsetX = renderOffsetX-hero.velocity_x;
            camera.x = camera.x+hero.velocity_x;
          }
        }
        if (hero.velocity_x > 0 && hero.x < screenBorderRight){
          if ((hero.x + hero.width) >= (camera.x + camera.width - 200)){
            renderOffsetX = renderOffsetX-hero.velocity_x;
            camera.x = camera.x+hero.velocity_x;
          }
        }
      }

      /* ------ Score ------ */

      function IncrementScore(points){
        score = score + points;

      }

      /* --------------------------------- */
      /* ---------- Execution ------------ */
      /* --------------------------------- */
      MainLoop();

}
