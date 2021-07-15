const board_border = 'black';
const board_background = 'rgba(255,255,255, 1)';
const snake_col = 'lightblue';
const apple_col = 'red';
const snake_border = 'darkblue';
const genSize = 10;

let snake = [        // snake coordinates at start.
  {x: 200, y: 200},  // this is the snake's head.
  // {x: 190, y: 200},
  // {x: 180, y: 200},
  // {x: 170, y: 200},
  {x: 160, y: 200}   // last element of snake.
]


let apple = {
  x: 250, y:500     // apple coordinates at the begining. 
}

// True if changing direction
let changing_direction = false;
// Horizontal velocity
let dx = genSize;
// Vertical velocity
let dy = 0;

// Get the canvas element
const snakeboard = document.getElementById("canvas");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
// Start game
main();

document.addEventListener("keydown", change_direction);

// main function called repeatedly to keep the game running
function main() {

    if (has_game_ended()) return;

    changing_direction = false;
    setTimeout(function onTick() {
    clear_board();
    move_snake();
    drawSnake();
    drawApple();
    checkCollision();
    // Call main again
    main();
  }, 100)
}

// draw a border around the canvas
function clear_board() {
  //  Select the colour to fill the drawing
  snakeboard_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeboard_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

// Draw one snake part
function drawSnakePart(snakePart) {
  // Set the colour of the snake part
  snakeboard_ctx.fillStyle = snake_col;
  // Set the border colour of the snake part
  snakeboard_ctx.strokestyle = snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, genSize, genSize);
  // Draw a border around the snake part
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, genSize, genSize);
}

// Draw apple.
function drawApple () {
  snakeboard_ctx.fillStyle = apple_col;
  snakeboard_ctx.strokestyle = 'black';
  snakeboard_ctx.fillRect(apple.x, apple.y, genSize, genSize);
  snakeboard_ctx.strokeRect(apple.x, apple.y, genSize, genSize);
}

// Check collision. 
function checkCollision () {
  if (snake[0].x < apple.x + genSize && 
    snake[0].x + genSize > apple.x && 
    snake[0].y < apple.y + genSize &&
    snake[0].y + genSize > apple.y) {
      console.log('collision detected!');
      // push new eaten element to snake body.
      snake.push({x: snake[snake.length - 1].x, y: snake[snake.length - 1].y })
      console.log(snake);
      console.log(randomApple ());   
      randomApple ();                 
    }
}

// random apple coordinates.
function randomApple () {   
  apple = {
      x: Math.floor(Math.random()*(snakeboard.width - genSize)), 
      y: Math.floor(Math.random()*(snakeboard.height - genSize))
  }
  return apple;
}


function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - genSize;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - genSize;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  
// Prevent the snake from reversing

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -genSize;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -genSize;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = genSize;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = genSize;
  }
}

function move_snake() {
  // Create the new Snake's head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  // const has_eaten_food = checkCollision ();
  snake.pop();
}
