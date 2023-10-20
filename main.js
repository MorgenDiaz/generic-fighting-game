import GameObject from "./GameObject.js";
import Sprite from "./Sprite.js";
import Fighter from "./Fighter.js";
import PlayerFactory from "./PlayerFactory.js";
import CollisionCoordinator from "./CollisionCoordinator.js";

window.onload = () => {
  const GAME_CANVAS = document.querySelector(".game-canvas");
  const CONTEXT = GAME_CANVAS.getContext("2d");

  window.COLLISION_LAYERS = {
    PLAYER_1_BODY: "player_1_body",
    PLAYER_1_WEAPON: "player_1_weapon",
    PLAYER_2_BODY: "player_2_body",
    PLAYER_2_WEAPON: "player_2_weapon",
  };

  const COLLISION_LAYER_MAP = {
    [window.COLLISION_LAYERS.PLAYER_1_WEAPON]: new Set().add(
      window.COLLISION_LAYERS.PLAYER_2_BODY
    ),
    [window.COLLISION_LAYERS.PLAYER_2_WEAPON]: new Set().add(
      window.COLLISION_LAYERS.PLAYER_1_BODY
    ),
  };

  const COLLISION_COORDINATOR = new CollisionCoordinator(COLLISION_LAYER_MAP);

  const PLAYER_1_HEALTH_BAR = document.querySelector("#player-1-health-bar");
  const PLAYER_2_HEALTH_BAR = document.querySelector("#player-2-health-bar");
  const TIMER_TEXT = document.querySelector("#time");
  const GAME_STATUS_TEXT = document.querySelector("#game-status");
  const GAME_MUSIC = document.querySelector("#music-audio");
  const PLAYER_1_AUDIO = document.querySelector("#player-1-audio");
  const PLAYER_2_AUDIO = document.querySelector("#player-2-audio");

  GAME_CANVAS.width = 1024;
  GAME_CANVAS.height = 576;

  function playMusic() {
    GAME_MUSIC.play();
  }

  function pauseMusic() {
    GAME_MUSIC.pause();
  }

  const BACKGROUND_SPRITE = new Sprite({
    position: { x: 0, y: 0 },
    width: GAME_CANVAS.width,
    height: GAME_CANVAS.height,
    imageSrc: "./assets/img/game_background_4.png",
  });

  const BACKGROUND = new GameObject(
    0,
    0,
    GAME_CANVAS.width,
    GAME_CANVAS.height,
    BACKGROUND_SPRITE
  );

  const playerFactory = new PlayerFactory({
    registerCollidable: COLLISION_COORDINATOR.registerCollidable,
    canvasWidth: GAME_CANVAS.width,
    canvasHeight: GAME_CANVAS.height,
  });

  const player1 = playerFactory.createPlayer1(200, 0, PLAYER_1_AUDIO);
  const player2 = playerFactory.createPlayer2(700, 0, PLAYER_2_AUDIO);

  player1.getComponent(Fighter).registerOnDeathCallBack(() => {
    showGameResult(timerInterval, player2);
  });

  player2.getComponent(Fighter).registerOnDeathCallBack(() => {
    showGameResult(timerInterval, player1);
  });

  function showGameResult(timerId, victor) {
    clearInterval(timerId);

    switch (victor) {
      case player1:
        GAME_STATUS_TEXT.textContent = "Player1 Wins!";
        break;
      case player2:
        GAME_STATUS_TEXT.textContent = "Player2 Wins";
        break;
      default:
        GAME_STATUS_TEXT.textContent = "Tie!";
    }

    GAME_STATUS_TEXT.style.display = "block";
  }

  let timerInterval = null;
  let timeSeconds = 60;

  timerInterval = setInterval(() => {
    timeSeconds--;
    TIMER_TEXT.textContent = timeSeconds;

    if (timeSeconds === 0) {
      showGameResult(timerInterval);
    }
  }, 1000);

  function animate() {
    CONTEXT.clearRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);
    BACKGROUND.update(CONTEXT);

    player1.update(CONTEXT);
    player2.update(CONTEXT);

    COLLISION_COORDINATOR.detectCollisions();

    const player1Health = player1.getComponent(Fighter).health;
    const player2Health = player2.getComponent(Fighter).health;

    PLAYER_1_HEALTH_BAR.style.width = `${player1Health}%`;
    PLAYER_2_HEALTH_BAR.style.width = `${player2Health}%`;

    window.requestAnimationFrame(animate);
  }

  document
    .querySelector("#test-music-button")
    .addEventListener("click", playMusic);

  animate();
};
