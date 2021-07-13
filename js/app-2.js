var canvas = document.getElementById("myCanvas");
canvas.addEventListener('keydown', actionOnArrowKeys, true);
const ctx = canvas.getContext('2d');

// define starting position for the shape.
let x = 250;
let y = 0;

// speed for square moves.
let vx = 10;
let vy = 10;

let color = 'blue';

// sizing ractangular shape.
const h = 50; // hight.
const l = 50; // width = long.

// move distance to apply when arrow key pressed.
const movement = 50;

// function triggered for event listener. 
function actionOnArrowKeys(e){
  //	ARROW KEY --> UP.
  if (e.keyCode == 38) {
    console.log(e.keyCode);
    y = y - movement;
  }

  //	ARROW KEY --> DOWN.
  if (e.keyCode == 40) {
    console.log(e.keyCode);
    y = y + movement;
  }

  //	ARROW KEY --> LEFT.
  if (e.keyCode == 37) {
    console.log(e.keyCode);
    x = x - movement;
    if (x - movement > canvas.width) {x = canvas.width}
  }

  //	ARROW KEY --> RIGHT.
  if (e.keyCode == 39) {
    console.log(e.keyCode);
    x = x + movement;
  }
}

function update() {
  // erase ancient position of the shape in movement.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw the rectangular shape in canvas' context.
  ctx.fillRect(x, y, h, l);
  // apply color to shape.
  ctx.fillStyle = color;
  
  // ctx.fillRect(h + dev, y, h, l);
  // ctx.fillRect(h*2 + dev, y, h, l);
  // ctx.fillRect(dev, y + l, h, l);
  // ctx.fillRect(50, 100, 50, 50);

  // define shape movements. 
  // x += vx; // right & left moves. used for lateral moves.
  y += vy; // up & down moves.
  // condition for height: stop movement. 
  if (y + vy > canvas.height - h || y + vy < 0) {
    vy *= -1;
  }
  // condition for width. 
  if (x + vx > canvas.width - h  || x + vx < 0) {
    vx *= -1;
  }
}

setInterval(update, 80);




 


