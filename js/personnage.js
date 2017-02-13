
document.addEventListener("DOMContentLoaded", function(event) {  
    
    // Défini les variables
    var gameCanvas = document.getElementById("graphic");
    var graphx = gameCanvas.getContext('2d');

    // Crée un nouveau personnage avec son visuel et sa position d'origine en paramètre
    var joueur1 = new Personnage("./src/characters/hero_fix.png", 50, 50);
    
    //  Evenements des touches clavier
document.addEventListener("keydown", function (e) {
        var key = e.which;
        if (key == "39") {joueur1.x += joueur1.VelociteX;}
        if (key == "37") {joueur1.x -= joueur1.VelociteX;}
    });
    
    
    // Boucle qui permet l'animation du jeux
    function MainLoop() {
//        Personnage fait une légère glissade lentement et sans arrêt 
//        joueur1.x += 1;
        
        graphx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        graphx.drawImage(joueur1.sprite, joueur1.x, joueur1.y);
        requestAnimationFrame(MainLoop, 1000/60);
    }

    function Personnage(img, x, y) {
        this.sprite = new Image();
        this.sprite.src = img;
        this.x = x;     // position du personnage sur l'axe horizontal
        this.y = y;     // position du personnage sur l'axe vertical
        this.VelociteX = 1;
        this.VelociteY = 0;
        this.PreviousX;
        this.PreviousY;
    }
    
    MainLoop();
});


// Code pour faire des gif en sprite sheet
var img_obj = {
    'source': null,
    'current': 0,
    'total_frames': 16,
    'width': 16,
    'height': 16
};

var img = new Image();
img.onload = function () { // Triggered when image has finished loading.
    img_obj.source = img;  // we set the image source for our object.
}
img.src = 'img/filename.png'; // contains an image of size 256x16
                              // with 16 frames of size 16x16

function draw_anim(context, x, y, iobj) { // context is the canvas 2d context.
    if (iobj.source != null)
        context.drawImage(iobj.source, iobj.current * iobj.width, 0,
                          iobj.width, iobj.height,
                          x, y, iobj.width, iobj.height);
    iobj.current = (iobj.current + 1) % iobj.total_frames;
                   // incrementing the current frame and assuring animation loop
}

function on_body_load() { // <body onload='on_body_load()'>...
    var canvas = document.getElementById('canvasElement');
                 // <canvas id='canvasElement' width='320' height='200'/>
    var context = canvas.getContext("2d");

    setInterval((function (c, i) {
                return function () {
                    draw_anim(c, 10, 10, i);
                };
    })(context, img_obj), 100);
}





// Initialiser le Jeux avec Canvas
//function startGame() {
//    myGameArea.start();
//}
//
//var myGameArea = {
//    canvas : document.createElement("canvas"),
//    start : function() {
//        this.canvas.width = 480;
//        this.canvas.height = 270;
//        this.context = this.canvas.getContext("2d");
//        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//    }
//}