
var myGamePiece;
var myObstacle;

function startGame() {
  myGamePiece = new component(30, 30, "blue", 10, 120);
  myObstacle = new component(10, 200, "red", 300, 120);
  myGameArea.start();
}

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
       myGameArea.keys = (myGameArea.keys || []);
       myGameArea.keys[e.keyCode] = true;
     })
     window.addEventListener('keyup', function (e) {
       myGameArea.keys[e.keyCode] = false;
     })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 50;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.x = this.speedX;
    this.y = this.speedY;
  }
  this.crashWith = function(otherObj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherObj.x;
    var otherright = otherObj.x + (otherObj.width);
    var othertop = otherObj.y;
    var otherbottom = otherObj.y + (otherObj.height);
    var crash = true;
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.newPos();
  myObstacle.update();
  myGamePiece.update();
  if (myGameArea.keys && myGameArea.keys[65]) {
    myGamePiece.speedX -= 2;
  }
  if (myGameArea.keys && myGameArea.keys[68]) {
    myGamePiece.speedX += 2;
  }
  if (myGameArea.keys && myGameArea.keys[87]) {
    myGamePiece.speedY -= 2;
  }
  if (myGameArea.keys && myGameArea.keys[83]) {
    myGamePiece.speedY += 2;
  }
}
