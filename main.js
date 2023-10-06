import { isRectangleCollision } from "./utility.js";
import GameObject from "./GameObject.js";
import Sprite from "./Sprite.js";
import Fighter from "./Fighter.js";
import Physics2D from "./Physics2D.js";
import FighterControls from "./FighterControls.js";

const GAME_CANVAS = document.querySelector(".game-canvas");
const CONTEXT = GAME_CANVAS.getContext("2d");
const GRAVITY = 0.7;

const PLAYER_1_HEALTH_BAR = document.querySelector("#player-1-health-bar");
const PLAYER_2_HEALTH_BAR = document.querySelector("#player-2-health-bar");
const TIMER_TEXT = document.querySelector("#time");
const GAME_STATUS_TEXT = document.querySelector("#game-status");

GAME_CANVAS.width = 1024;
GAME_CANVAS.height = 576;

const BACKGROUND_SPRITE = new Sprite({
  position: { x: 0, y: 0 },
  width: GAME_CANVAS.width,
  height: GAME_CANVAS.height,
  imageSrc: "./assets/game_background_4.png",
});

const BACKGROUND = new GameObject(
  0,
  0,
  GAME_CANVAS.width,
  GAME_CANVAS.height,
  BACKGROUND_SPRITE
);

function determineWinner(timerId) {
  clearInterval(timerInterval);

  if (player.health === enemy.health) {
    GAME_STATUS_TEXT.textContent = "Tie!";
  } else if (player.health > enemy.health) {
    GAME_STATUS_TEXT.textContent = "Player1 Wins!";
  } else {
    GAME_STATUS_TEXT.textContent = "Player2 Wins";
  }

  GAME_STATUS_TEXT.style.display = "block";
}

let timerInterval = null;
let timeSeconds = 60;

timerInterval = setInterval(() => {
  timeSeconds--;
  TIMER_TEXT.textContent = timeSeconds;

  if (timeSeconds === 0) {
    determineWinner(timerInterval);
  }
}, 1000);

const playerConfig = {
  attackAreaOffset: { x: 0, y: 0 },
};

const heroSprite = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/hero/Idle.png",
  frames: 10,
  scale: 2,
});

const player = new GameObject(
  0,
  0,
  100,
  100,
  heroSprite,
  [
    new Physics2D({ x: 0, y: 0 }, 0.7, GAME_CANVAS.height - 175),
    new Fighter(playerConfig),
    new FighterControls(window),
  ],
  -100,
  -100
);

const enemyConfig = {
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: "orange",
  attackAreaOffset: { x: -50, y: 0 },
};
const enemy = new Fighter(enemyConfig);

const KEYS = {
  a: { pressed: false },
  d: { pressed: false },
  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowUp: { pressed: false },
  ArrowRight: { pressed: false },
};

const fighterMovementSpeed = 5;
const fighterJumpVelocity = 20;

function animate() {
  CONTEXT.clearRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);
  BACKGROUND.update(CONTEXT);

  player.update(CONTEXT, GAME_CANVAS.height, GRAVITY);
  //enemy.update(CONTEXT, GAME_CANVAS.height, GRAVITY);

  /*
  player.gameObject.velocity.x = 0;

  if (KEYS.a.pressed && player.lastPressedKey === "a") {
    player.velocity.x = -fighterMovementSpeed;
  } else if (KEYS.d.pressed && player.lastPressedKey === "d") {
    player.velocity.x = fighterMovementSpeed;
  }

  if (KEYS.w.pressed) {
    KEYS.w.pressed = false;
  }

  enemy.velocity.x = 0;

  if (KEYS.ArrowLeft.pressed && enemy.lastPressedKey === "ArrowLeft") {
    enemy.velocity.x = -fighterMovementSpeed;
  } else if (KEYS.ArrowRight.pressed && enemy.lastPressedKey === "ArrowRight") {
    enemy.velocity.x = fighterMovementSpeed;
  }

  if (player.isAttacking && isRectangleCollision(player, enemy)) {
    player.isAttacking = false;
    console.log("playerAttackingEnemy");
    enemy.health -= player.strength;
    PLAYER_2_HEALTH_BAR.style.width = `${enemy.health}%`;
  }

  if (enemy.isAttacking && isRectangleCollision(enemy, player)) {
    enemy.isAttacking = false;
    console.log("enemyAttacking");
    player.health -= enemy.strength;
    PLAYER_1_HEALTH_BAR.style.width = `${player.health}%`;
  }

  if (!player.health || !enemy.health) {
    determineWinner(timerInterval);
  }*/
  window.requestAnimationFrame(animate);
}

animate();
/*
window.addEventListener("keydown", (event) => {
  if (event.key in KEYS) {
    KEYS[event.key].pressed = true;
  }

  switch (event.key) {
    case "a":
      player.lastPressedKey = event.key;
      break;
    case "w":
      player.velocity.y = -fighterJumpVelocity;
      break;
    case "s":
      player.attack();
      break;
    case "d":
      player.lastPressedKey = event.key;
      break;
    case "ArrowLeft":
      enemy.lastPressedKey = event.key;
      break;
    case "ArrowUp":
      enemy.velocity.y = -fighterJumpVelocity;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
    case "ArrowRight":
      enemy.lastPressedKey = event.key;
      break;
    default:
      if (event.key in KEYS) {
        KEYS.lastPressed = event.key;
      }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key in KEYS) {
    KEYS[event.key].pressed = false;
  }
});*/
