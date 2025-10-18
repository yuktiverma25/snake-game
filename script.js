const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const restartBtn = document.getElementById('restartBtn');
const gameOverScreen = document.getElementById('gameOver');
const restartGameBtn = document.getElementById('restartGame');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('finalScore');

const canvasSize = 500;
const cellSize = 25;

let snake = [{x: 250, y: 250}];
let dx = cellSize;
let dy = 0;
let food = {};
let score = 0;
let gameInterval;

// Generate random food position
function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / cellSize)) * cellSize;
    food.y = Math.floor(Math.random() * (canvasSize / cellSize)) * cellSize;
    // Avoid food appearing on snake
    for(let segment of snake){
        if(segment.x === food.x && segment.y === food.y) generateFood();
    }
}

// Draw everything
function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#00ff00" : "#0f0";
        ctx.shadowColor = "rgba(0,255,0,0.6)";
        ctx.shadowBlur = 10;
        ctx.fillRect(segment.x, segment.y, cellSize, cellSize);
        ctx.shadowBlur = 0;
    });

    // Draw food
    ctx.fillStyle = "#ff0000";
    ctx.shadowColor = "rgba(255,0,0,0.6)";
    ctx.shadowBlur = 15;
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
    ctx.shadowBlur = 0;
}

// Move snake
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Wall collision
    if(head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || snakeCollision(head)){
        gameOver();
        return;
    }

    snake.unshift(head);

    // Food collision
    if(head.x === food.x && head.y === food.y){
        score++;
        scoreEl.textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

// Check snake collision with itself
function snakeCollision(head){
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Change direction
document.addEventListener('keydown', e => {
    switch(e.key){
        case "ArrowUp":
            if(dy === 0){ dx = 0; dy = -cellSize; }
            break;
        case "ArrowDown":
            if(dy === 0){ dx = 0; dy = cellSize; }
            break;
        case "ArrowLeft":
            if(dx === 0){ dx = -cellSize; dy = 0; }
            break;
        case "ArrowRight":
            if(dx === 0){ dx = cellSize; dy = 0; }
            break;
    }
});

// Game loop
function gameLoop(){
    moveSnake();
    draw();
}

// Start game
function startGame(){
    snake = [{x: 250, y: 250}];
    dx = cellSize;
    dy = 0;
    score = 0;
    scoreEl.textContent = score;
    generateFood();
    gameOverScreen.classList.add('hide');
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 150);
}

// Game over
function gameOver(){
    clearInterval(gameInterval);
    finalScoreEl.textContent = score;
    gameOverScreen.classList.remove('hide');
}

// Restart buttons
restartBtn.addEventListener('click', startGame);
restartGameBtn.addEventListener('click', startGame);

// Initialize
startGame();
