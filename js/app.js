// -------------------------------------------------------
// Canvas One treatments.
// -------------------------------------------------------

let canvasOne = document.getElementById("canvasOne");
canvasOne.addEventListener('keydown', actionOnArrowKeys, true);
const ctx1 = canvasOne.getContext('2d');

let x = 250; // starting position on x axis
let y = 0; // starting position on y axis
let vx = 50; // speed applied for x axis moves.
let vy = 50; // speed applied for y axis moves.
let color = 'rgba(185, 211, 238, 0.7)';
const h = 50; // hight size.
const l = h; // width size (= h to have a square shape.
const movement = 50; //  distance applied on arrow key pressed.
let limitHeight = canvasOne.height - h;
let limitWidth = canvasOne.width - h;

// square limit for top side. 
function topWall () {
  if (y <= 0) {
    y = 0;
  } else {
    y = y - movement;
  }
}

// square limit for bottom side. 
function bottomWall () {
  if (y >= limitHeight) {
    y = limitHeight;
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
  if (x >= limitWidth) {
    x = limitWidth;
  } else {
    x = x + movement;    
  }
}

function actionOnArrowKeys(e){
  // UP.
  if (e.keyCode === 38) {
    if (y !== limitHeight) {
      topWall ();
    }
    
  }
  // DOWN.
  if (e.keyCode === 40) {
    if (y !== limitHeight) {
      bottomWall ();
    }
  }
  // LEFT.
  if (e.keyCode === 37) {
    if (y !== limitHeight) {
      leftWall (); 
    }   
  }
  //	RIGHT.
  if (e.keyCode === 39) {
    if (y !== limitHeight) {
      rigthWall ();    
    }
  }
}

function elements () {
  ctx1.fillRect(100, 300, 150, 50);
  ctx1.fillRect(100, 300, 150, 50);
}


function firstElement() {
  ctx1.clearRect(0, 0, canvasOne.width, canvasOne.height);
  ctx1.fillStyle = color; 
  ctx1.fillRect(x, y, h, l);
  elements();  
  x += 0; // don't move here but to moves on x axis put "vx". 
  y += vy; // up & down moves moves on y axis.
  if (y + vy > limitHeight || y + vy < 0) {
    vy *= 0; // put -1 here to rebound on contact with a side.
  }
  // condition for width ==> collide and rebound for right & left side.
  if (x + vx > limitWidth  || x + vx < 0) {
    vx *= -1;
  }
}

setInterval(firstElement, 800);





 


