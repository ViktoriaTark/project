//счет
let scoreBlock;
let score = 0;

const config = {
   step: 0,
   maxStep: 6,
   // Размер ячейки
   sizeCell: 16,
   // Размер ягоды
   sizeBerry: 16 / 4
};

const snake = {
   // Координаты
   x: 16,
   y: 16,
   dx: config.sizeCell,
   dy: 0,
   // Массив ячеек под контролем змейки
   tails: [],
   maxTails: 3
};

let berry = {
   x: 0,
   y: 0
};


let canvas = document.querySelector('#game-canvas');
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
drawScore();


function gameLoop() {
   requestAnimationFrame(gameLoop);

   if (++config.step < config.maxStep) {
      return;
   }
   config.step = 0;
   // Clear canvas
   context.clearRect(0, 0, canvas.width, canvas.clientHeight);
   // Re-draw
   drawBerry();
   drawSnake();
}

requestAnimationFrame(gameLoop);

function drawSnake() {
   snake.x += snake.dx;
   snake.y += snake.dy;

   collisionBorder();

   snake.tails.unshift({ x: snake.x, y: snake.y });

   if (snake.tails.length > snake.maxTails) {
      snake.tails.pop();
   }

   snake.tails.forEach(function (el, index) {
      if (index == 0) {
         context.fillStyle = "#ffffff";
      } else {
         context.fillStyle = "#c86cfd";
      }
      context.fillRect(el.x, el.y, config.sizeCell, config.sizeCell);

      // Проверка на прикосновение с ягодой
      if (el.x === berry.x && el.y === berry.y) {
         snake.maxTails++;
         incScore();
         randomPositionBerry();
      }

      // Проверка на прикосновене с хвостом
      for (let i = index + 1; i < snake.tails.length; i++) {
         if (el.x == snake.tails[i].x && el.y == snake.tails[i].y) {
            refreshGame();
         }
      }
   });
}

function collisionBorder() {
   if (snake.x < 0) {
      snake.x = canvas.width - config.sizeCell;
   } else if (snake.x >= canvas.width) {
      snake.x = 0;
   }

   if (snake.y < 0) {
      snake.y = canvas.height - config.sizeCell;
   } else if (snake.y >= canvas.height) {
      snake.y = 0;
   }
}

function refreshGame() {
   score = 0;
   drawScore();
   snake.x = 160;
   snake.y = 160;
   snake.tails = [];
   snake.maxTails = 3;
   snake.dx = config.sizeCell;
   snake.dy = 0;
}

function drawBerry() {
   context.beginPath();
   context.fillStyle = "#ff0000";
   context.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI);
   context.fill();
}

// Score functions
function incScore() {
   score++;
   drawScore();
}

function drawScore() {
   scoreBlock.innerHTML = score;
}


// Random
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min) + min);
}


function randomPositionBerry() {
   berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
   berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
}

document.addEventListener("keydown", function (e) {
   if (e.code == "KeyW") {
      snake.dy = -config.sizeCell;
      snake.dx = 0;
   } else if (e.code == "KeyA") {
      snake.dx = -config.sizeCell;
      snake.dy = 0;
   } else if (e.code == "KeyS") {
      snake.dy = config.sizeCell;
      snake.dx = 0;
   } else if (e.code == "KeyD") {
      snake.dx = config.sizeCell;
      snake.dy = 0;
   }
});