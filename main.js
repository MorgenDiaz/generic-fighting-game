const GAME_CANVAS = document.querySelector(".game-canvas");
const CONTEXT = GAME_CANVAS.getContext("2d");
const GRAVITY = 0.7;

GAME_CANVAS.width = 1024;
GAME_CANVAS.height = 576;

CONTEXT.fillRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastPressedKey;
  }

  draw(canvasContext) {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update(canvasContext, canvasHeight) {
    this.draw(canvasContext);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    const spriteBottom = this.position.y + this.height;
    const isSpriteOnGround = spriteBottom >= canvasHeight;

    if (isSpriteOnGround) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += GRAVITY;
    }
  }
}

const playerConfig = { position: { x: 100, y: 100 }, velocity: { x: 0, y: 0 } };
const player = new Sprite(playerConfig);

const enemyConfig = { position: { x: 400, y: 100 }, velocity: { x: 0, y: 0 } };
const enemy = new Sprite(enemyConfig);

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
  CONTEXT.fillStyle = "black";
  CONTEXT.fillRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);

  player.update(CONTEXT, GAME_CANVAS.height);
  enemy.update(CONTEXT, GAME_CANVAS.height);

  player.velocity.x = 0;

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
  window.requestAnimationFrame(animate);
}

animate();

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
    case "d":
      player.lastPressedKey = event.key;
      break;
    case "ArrowLeft":
      enemy.lastPressedKey = event.key;
      break;
    case "ArrowUp":
      enemy.velocity.y = -fighterJumpVelocity;
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
});
