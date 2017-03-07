document.addEventListener("DOMContentLoaded", function(event){

  // Variables de l'interface graphique du jeu
  var gameCanvas = document.getElementById("graphics");
  var ctx = gameCanvas.getContext('2d');
  // Images
  var weapon = new Image();
  weapon.src = "src/weapons/weapon_back1.png";
  // Déclaration des objets
  var hero = new Object("src/characters/hero_fix.png", 30, 30, 44, 32);
  var blocks = new Array();
  for (i=0; i<12; i++){
      var block = new Object("src/terrain/p3.png", 28*i+30, 300, 30, 30);
      blocks.push(block);
  }
  blocks[9] = new Object("src/terrain/p3.png", 30, 200, 30, 30);
  blocks[10] = new Object("src/terrain/p3.png", 120, 250, 30, 30);
  blocks[11] = new Object("src/terrain/p3.png", 120, -50, 30, 30);
  blocks[12] = new Object("src/terrain/p3.png", 250, 250, 30, 30);
  var monster1 = new Object("src/monsters/m1.png", 190, 220, 24, 32);

  var test = blocks.slice() ;
  test.splice(11,1);

  // Variables concernant l'initation des attributs des objets
  hero.velocity_x = 0;
  hero.velocity_y = 3;
  hero.gravity = 3;
  hero.weight = 0.3;

  blocks[11].gravity = 1;
  blocks[11].weight = 0.3;
  blocks[11].velocity_y = 3;

  monster1.gravity = 1;
  monster1.weight = 0.3;
  monster1.velocity_y = 3;
  monster1.velocity_x = 2;

  /* --------------------------------- */
  /* ---------- Ckeckkey ------------- */
  /* --------------------------------- */
  document.onkeydown = checkKeyDown;
  document.onkeyup = checkKeyUp;
  // Boléens qui définissent si le personnage va dans une direction
  var isLeft = false;
  var isRight = false;
  var isJumping = false;
  var orientation = 'right';

  function checkKeyDown(e) {
      e = e || window.event;
      if (e.keyCode == '38') {isJumping = true}
      if (e.keyCode == '40') {}
      if (e.keyCode == '37') { isLeft = true; orientation = 'left'}
      if (e.keyCode == '39') { isRight = true; orientation = 'right'}
  }

    function checkKeyUp(e) {
      e = e || window.event;
      if (e.keyCode == '38') {isJumping = false}
      if (e.keyCode == '40') {}
      if (e.keyCode == '37') isLeft = false;
      if (e.keyCode == '39') isRight = false;
    }

/* --------------------------------- */
/* ---------- Main Loop ------------ */
/* --------------------------------- */
  /* Function MainLoop
  * Boucle principale permettant de définir les frames d'execution
  */
  function MainLoop(){

    /* -----------------  VARS INIT  ---------------- */
    /* Pré-initilialisation des déplacements */
    hero.x += hero.velocity_x;
    hero.y += hero.velocity_y;
    hero.weight = 0.3;
    blocks[11].x += blocks[11].velocity_x;
    blocks[11].y += blocks[11].velocity_y;
    blocks[11].weight = 0.3;
    monster1.x += monster1.velocity_x;
    monster1.y += monster1.velocity_y;
    monster1.weight = 0.3;

    /* -----------------  TRAITEMENT  ---------------- */
    // Déplacements droite / gauche
    if ((isRight == false) && (isLeft == true)) hero.velocity_x = -2;
    else if ((isRight == true) && (isLeft == false)) hero.velocity_x = 2;
    else if ((isRight == true) && (isLeft == true)) hero.velocity_x = 0;
    else hero.velocity_x = 0;

    // Effets des collisions
    hero.HeroCollidingEffects(blocks);
    blocks[11].CollidingEffects(test);
    monster1.CollidingEffects(blocks);
    monster1.iaChangePathOnColliding();
    monster1.fall();

    // Dégats
    if (hero.isColliding(monster1) == 'below'){
      hero.velocity_y = -5;
    }
    if (hero.isColliding(monster1) == 'left'){
      hero.velocity_y = -2;
      console.log('Aie');
    }
    if (hero.isColliding(monster1) == 'right'){
      hero.velocity_y = -2;
      console.log('Aie');
    }

    // Chute
    hero.fall();
    blocks[11].fall();
    // Saut
    if (isJumping && hero.IsCollidingBelow == true){
      hero.velocity_y = -6;
    }

    /* -----------------  RENDU  ---------------- */
    // Placement des objets sur le terrain
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    for (i=0; i<blocks.length; i++){
      blocks[i].render(ctx, 1);
    }

    // Placement des monstres
    monster1.render(ctx, 1);

    // Placement du héros

    if (isRight && (hero.velocity_y == 0)){
      hero.sprite.src = "src/characters/hero_right.png"
      hero.width = 36;
      hero.renderUpdate(3, 6);
      hero.render(ctx, 6);
    }
    else if (isLeft && (hero.velocity_y == 0)){
      hero.sprite.src = "src/characters/hero_left.png"
      this.width = 36;
      hero.renderUpdate(3, 6);
      hero.render(ctx, 6);
    }
    else if (hero.velocity_y < 0){
      if (orientation == 'left'){
        hero.tickCount = 0;
        hero.frameIndex = 0;
        hero.sprite.src = "src/characters/hero_jump_left.png";
        hero.render(ctx, 1);
        this.width = 34;
      }
      else if (orientation == 'right'){
        hero.tickCount = 0;
        hero.frameIndex = 0;
        hero.sprite.src = "src/characters/hero_jump_right.png";
        hero.render(ctx, 1);
        this.width = 34;
      }
    }
    else if (hero.velocity_y > 0.3){
      if (orientation == 'left'){
        hero.tickCount = 0;
        hero.frameIndex = 0;
        hero.sprite.src = "src/characters/hero_down_left.png";
        hero.render(ctx, 1);
        this.width = 34;
      }
      else if (orientation == 'right'){
        hero.tickCount = 0;
        hero.frameIndex = 0;
        hero.sprite.src = "src/characters/hero_down_right.png";
        hero.render(ctx, 1);
        this.width = 34;
      }
    }
    else {
      if (orientation == 'left'){
        hero.tickCount = 0;
        hero.frameIndex = 0;
        hero.sprite.src = "src/characters/hero_fix_left.png";
        hero.render(ctx, 1);
        this.width = 32;
      }
      else if (orientation == 'right') {
        hero.tickCount = 0;
        hero.frameIndex = 0;
        hero.sprite.src = "src/characters/hero_fix_right.png";
        hero.render(ctx, 1);
        this.width = 32;
      }
    }

    requestAnimationFrame(MainLoop, 1000/60);

  }

  /* --------------------------------- */
  /* ---------- Objets ------------- */
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
  }
  /* Object method isColliding
  * Permet de tester si le joueur est contre un autre objet
  */
  Object.prototype.isColliding = function(obj) {
      /* Nolan : "Attention, gros commentaire en approche.
         Pour chercher les collisions dans chaque sens, j'ai inversé le principe habituel appliqué à une méthode de collision.
         Pour tout les cas, on cherche si le personnage n'a aucun contact avec le bloc, en toute part du bloc (haut, bas, droite, gauche)
         Au cas individuel, on ajoute une expression supplémentaire à la condition qui teste si le joueur à un contact avec un coté du bloc précis (à 1 pixel près)
         Le bloc est alors décomposé de la sorte que chaque face fasse un pixel d'épaisseur, les cotés du blocs étant prioritaires sur les faces du haut et le bas du bloc.
         Quand le joueur a contact avec l'une de ses face, la chaine relative à ce contact est retournée. Elle permet ainsi de traiter les conséquences au cas par cas."
      */
      if (!(this.y > obj.y + obj.height-1) && !(this.y + this.height < obj.y+1) && !(this.x + this.width < obj.x) && !(this.x > obj.x + obj.width) && (this.x > obj.x + obj.width -1))
        return 'left';
      if (!(this.y > obj.y + obj.height-1) && !(this.y + this.height < obj.y+1) && !(this.x + this.width < obj.x) && !(this.x > obj.x + obj.width) && (this.x + this.width < obj.x +1))
        return 'right';
      if (!(this.y > obj.y) && !(this.y + this.height < obj.y) && !(this.x + this.width < obj.x+1) && !(this.x > obj.x + obj.width-1) && (this.y + this.height >= obj.y))
        return 'below';
      if (!(this.y > obj.y + obj.height) && !(this.y + this.height < obj.y + 0) && !(this.x + this.width < obj.x+1) && !(this.x > obj.x + obj.width-1) && (this.y < obj.y + obj.height))
        return 'above';
  }

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
        this.y = blocks[i].y - this.height;
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

  Object.prototype.fall = function(){
    if (this.velocity_y < this.gravity && this.IsCollidingBelow == false)
      this.velocity_y += this.weight;
  }

  // Premer de créer un rendu de l'objet dans le contexte (en cas d'animation)
  Object.prototype.render = function(context, numberOfFrames){
    context.clearRect(this.x, this.y, this.width, this.height);
    context.drawImage(
               this.sprite,
               this.frameIndex * this.width,
               0,
               this.width,
               this.height,
               this.x, // xOffset : Décalage dans le cas ou le frame devra être plus grande que la hitbox du personnage (par exemple, le mouvement du bras du personnage implique une largeur plus grande)
               this.y, // yOffset : La même chose, mais sur la hauteur.
               this.width,
               this.height);
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

  Object.prototype.getDirectionByVelocityX = function(){
    if (this.velocity_x < 0)
      return 'isLeft';
    else if (this.velocity_x > 0)
      return 'isRight';
    else
      return 'fixed';
  }

  // Fonction IA
  Object.prototype.iaLateralMoving = function(speed){
    this.velocity_x = speed;
  }
  Object.prototype.iaChangePathOnColliding = function(speed){
    if (this.IsCollidingLeft == true || this.IsCollidingRight == true)
      this.iaLateralMoving(-this.velocity_x);
  }

  /* --------------------------------- */
  /* ---------- Execution ------------ */
  /* --------------------------------- */
  MainLoop();

});
