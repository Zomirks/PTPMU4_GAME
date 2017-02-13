var terra

anim();

function anim() {
    .clearRect(0, 0, terrain.width, terrain.height);
    .drawImage(joueur1.Sprite, joueur1.x, joueur1.y);
    setTimeout(anim, 1000/60);
}

function personnage(img, x, y) {
    this.Sprite = new Image();
    this.Sprite.src = img;
    this.x = x;
    this.y = y;
    this.previousX;
    this.previousY;
}

var joueur1 = new personnage("./img/mario.png", 100, 100);