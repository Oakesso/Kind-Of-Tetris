var canvas = document.getElementById("canvasOne");
canvas.addEventListener('keydown', actionOnArrowKeys, true);
const ctx = canvas.getContext('2d');
let x = 250; // starting position on x axis
let y = 0; // starting position on y axis
let vx = 50; // speed applied for x axis moves.
let vy = 50; // speed applied for y axis moves.
let color = 'blue';
const h = 50; // hight size.
const l = h; // width size (= h to have a square shape.
const movement = 50; //  distance applied on arrow key pressed.

// square limit for top side. 
function topWall () {
  if (y <= 0) {
    y = 0;
  } else {
    y = y - movement;
  }
}

let limit = canvas.height - h;

// square limit for bottom side. 
function bottomWall () {
  if (y >= limit) {
    y = limit;
  } else {
    y = y + movement;    
  }
}

// square shape limit for left side.
function leftWall () {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - movement;
  }
}

//square shape limit for rigth side.
function rigthWall () {
  if (x >= (canvas.width - h)) {
    x = (canvas.width - h);
  } else {
    x = x + movement;    
  }
}

function actionOnArrowKeys(e){
  // UP.
  if (e.keyCode === 38) {
    if (y !== (canvas.height - h)) {
      topWall ();
    }
    
  }
  // DOWN.
  if (e.keyCode === 40) {
    if (y !== (canvas.height - h)) {
      bottomWall ();
    }
  }
  // LEFT.
  if (e.keyCode === 37) {
    if (y !== (canvas.height - 50)) {
      leftWall (); 
    }   
  }
  //	RIGHT.
  if (e.keyCode === 39) {
    if (y !== (canvas.height - 50)) {
      rigthWall ();    
    }
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(185, 211, 238, 0.7)'; 
  ctx.fillRect(x, y, h, l);
  // ctx.fillRect(50, 50, 100, l);  
  x += 0; // don't move here but to moves on x axis put "vx". 
  y += vy; // up & down moves moves on y axis.
  if (y + vy > canvas.height - h || y + vy < 0) {
    vy *= 0; // put -1 here to rebound on contact with a side.
    console.log(x, y); // print shape's coordinates
  }
  // condition for width ==> collide and rebound for right & left side.
  if (x + vx > canvas.width - h  || x + vx < 0) {
    vx *= -1;
  }
}

setInterval(update, 1000);




 


