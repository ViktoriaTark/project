const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

// настройки
let gamePlaying = false;
const gravity = .5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
  bestScore = 0,
  flight,
  flyHeight,
  currentScore,
  pipe;

// настройка труб
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;

const setup = () => {
  currentScore = 0;
  flight = jump;

  // высота полёта птицы
  flyHeight = (canvas.height / 2) - (size[1] / 2);

  // устанавливаем первые 3 трубы
  pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
}

const render = () => {
  // начинаем движение труб и птицы
  index++;

  // задник
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);

  // отображение труб
  if (gamePlaying) {
    pipes.map(pipe => {
      // скорость движения труб
      pipe[0] -= speed;

      // верхняя труба
      ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
      // нижняя
      ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

      // при прохождении трубы добавляем очко и рисуем новую трубу
      if (pipe[0] <= -pipeWidth) {
        currentScore++;
        // проверяем на best score
        bestScore = Math.max(bestScore, currentScore);

        // убираем трубу и добавляем новую
        pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]];
        console.log(pipes);
      }

      // если врезались переходим на начальный экран
      if ([
          pipe[0] <= cTenth + size[0],
          pipe[0] + pipeWidth >= cTenth,
          pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
        ].every(elem => elem)) {
        gamePlaying = false;
        setup();
      }
    })
  }
  // рисуем птицу
  if (gamePlaying) {
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size);
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
    flyHeight = (canvas.height / 2) - (size[1] / 2);
    // текст
    ctx.fillText(`Best score : ${bestScore}`, 85, 245);
    ctx.fillText('Click to play', 90, 535);
    ctx.font = "bold 30px courier";
  }

  document.getElementById('bestScore').innerHTML = `Best : ${bestScore}`;
  document.getElementById('currentScore').innerHTML = `Current : ${currentScore}`;

  // говорим браузеру обработать анимацию
  window.requestAnimationFrame(render);
}

// запускаем настройки
setup();
img.onload = render;

// начинаем игру
document.addEventListener('click', () => gamePlaying = true);
window.onclick = () => flight = jump;