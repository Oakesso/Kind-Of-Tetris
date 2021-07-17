// const boardBorder = 'white';
const boardBackground = 'rgba(255,255,255, 0.95)';
const snakeCol = 'rgb(42, 164, 201)';
const appleCol = 'rgb(225, 20, 64)';
const snakeBorder = 'black';
const genSize = 20;
var score = 0;

let snake = [        // snake coordinates at start.
  {x: 200, y: 200},  // snake's head.
  {x: 160, y: 200}   // last element of snake, new elements comes after.
]

// Declare apple object to be generated by code randomlly.
let apple = {};

// True if changing direction
let changingDirection = false;
// Horizontal velocity
let dx = genSize;
// Vertical velocity
let dy = 0;

// Get the canvas element
const snakeBoard = document.getElementById("canvas");
// Return a two dimensional drawing context
const ctx = snakeBoard.getContext("2d");
// Start game
main();

document.addEventListener("keydown", changeDirection);

// main function called repeatedly to keep the game running
function main() {
    if (hasGameEnded()) return;
    changingDirection = false;
    setTimeout(function onTick() {
      clearBoard();
      drawSnake();
      drawApple();      
      moveSnake();
      checkCollision();
      // Call main again
      main();
  }, 150)
}

// draw a border around the canvas
function clearBoard() {
  //  Select the colour to fill the drawing
  ctx.fillStyle = boardBackground;
  ctx.shadowColor = "green";
  ctx.shadowColor = '#898';
  // Set shadow for board pieces.
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 20;
  ctx.shadowOffsetY = 20;
  // Draw a "filled" rectangle to cover the entire canvas
  ctx.clearRect(0, 0, snakeBoard.width, snakeBoard.height);
  //  Select the colour for the border of the canvas
  // ctx.strokestyle = boardBorder;
  // Draw a "border" around the entire canvas
  ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

// Draw one snake part
function drawSnakePart(snakePart) {
  // Set the colour of the snake part
  ctx.fillStyle = snakeCol;
  // Set the border colour of the snake part
  ctx.strokestyle = snakeBorder;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  ctx.fillRect(snakePart.x, snakePart.y, genSize, genSize);
  // Draw a border around the snake part
  ctx.strokeRect(snakePart.x, snakePart.y, genSize, genSize);
}

console.log(randomApple());

// Draw apple.
function drawApple () {  
  ctx.fillStyle = appleCol;
  // ctx.strokestyle = 'black';
  ctx.fillRect(apple.x, apple.y, genSize, genSize);
  // Draw border around rectangular shape.
  ctx.strokeRect(apple.x, apple.y, genSize, genSize);
}

// Generate random apple coordinates.
function randomApple () {   
  apple = {
      x: Math.floor(Math.random()*(snakeBoard.width - genSize)), 
      y: Math.floor(Math.random()*(snakeBoard.height - genSize))
  }
  return apple;
}

// Check collision. 
function checkCollision () {  
  // Detect a collision.
  if (snake[0].x < apple.x + genSize && 
    snake[0].x + genSize > apple.x && 
    snake[0].y < apple.y + genSize &&
    snake[0].y + genSize > apple.y) {
      score += 10;
      // push new eaten element to snake body.
      snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y }) 
      randomApple ();                 
    }
    // Send score value to html score class.
    const scoreDisplay = document.querySelector('.score');
    scoreDisplay.innerHTML= (`Score : ${score}`);
  return score;
}

function hasGameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x <= 0;
  const hitRightWall = snake[0].x >= snakeBoard.width - genSize;
  const hitToptWall = snake[0].y <= 0;
  const hitBottomWall = snake[0].y >= snakeBoard.height - genSize;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function changeDirection(event) {
  const leftKey = 37;
  const rigthKey = 39;
  const upKey = 38;
  const downKey = 40;
  // Prevent the snake from reversing
  if (changingDirection) return;
  changingDirection = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === leftKey && !goingRight) {
    dx = -genSize;
    dy = 0;
  }
  if (keyPressed === upKey && !goingDown) {
    dx = 0;
    dy = -genSize;
  }
  if (keyPressed === rigthKey && !goingLeft) {
    dx = genSize;
    dy = 0;
  }
  if (keyPressed === downKey && !goingUp) {
    dx = 0;
    dy = genSize;
  }
}

function moveSnake() {
  // Create the new Snake's head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  snake.pop();
}
