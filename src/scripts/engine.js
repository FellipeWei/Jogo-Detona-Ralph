const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
    },
    values: {
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 60,
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),
      countDownTimerId: setInterval(countDown, 1000),
    },
  };
  
  function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    if (state.values.curretTime <= 0) {
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);
      alert("Game Over! O seu resultado foi: " + state.values.result);
    }

    
  }
  let isPaused = false;

function togglePause() {
  const pauseBtn = document.getElementById('pause-btn');

  if (!isPaused) {
    // Pausa o jogo
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
    pauseBtn.textContent = "Continue";
    isPaused = true;
  } else {
    // Retoma o jogo
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
    pauseBtn.textContent = "Pause";
    isPaused = false;
  }
}

  
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }
      });
    });
  }
  
  function initialize() {
    addListenerHitBox();
  }
  
  function resetGame() {
    // Limpa os contadores
    clearInterval(state.actions.timerId);
    clearInterval(state.actions.countDownTimerId);
  
    // Redefine os valores do jogo
    state.values.result = 0;
    state.values.curretTime = 60;
    state.view.score.textContent = state.values.result;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    // Reinicia os contadores
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
  }
 
  
  initialize();