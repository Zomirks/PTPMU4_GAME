function personnage(img, x, y) {
    this.Sprite = new Image();
    this.Sprite.src = img;
    this.x = x;
    this.y = y;
    this.previousX;
    this.previousY;
}

var joueur1 = new personnage("/img.mario.png",100,100);