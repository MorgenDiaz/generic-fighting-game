const GAME_CANVAS = document.querySelector(".game-canvas");
const CONTEXT = GAME_CANVAS.getContext("2d");
const GRAVITY = 0.7;

const PLAYER_1_HEALTH_BAR = document.querySelector("#player-1-health-bar");
const PLAYER_2_HEALTH_BAR = document.querySelector("#player-2-health-bar");

GAME_CANVAS.width = 1024;
GAME_CANVAS.height = 576;

CONTEXT.fillRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);

class Sprite {
  constructor({
    position,
    velocity,
    color = "red",
    attackAreaOffset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastPressedKey;
    this.attackArea = {
      position: {
        x: position.x + attackAreaOffset.x,
        y: position.y + attackAreaOffset.y,
      },
      width: 100,
      height: 50,
      offset: attackAreaOffset,
    };
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.strength = 20;
  }

  draw(canvasContext) {
    canvasContext.fillStyle = this.color;
    canvasContext.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    if (this.isAttacking) {
      canvasContext.fillStyle = "yellow";
      canvasContext.fillRect(
        this.attackArea.position.x,
        this.attackArea.position.y,
        this.attackArea.width,
        this.attackArea.height
      );
    }
  }

  update(canvasContext, canvasHeight) {
    this.draw(canvasContext);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.attackArea.position.x = this.position.x + this.attackArea.offset.x;
    this.attackArea.position.y = this.position.y + this.attackArea.offset.y;

    const spriteBottom = this.position.y + this.height;
    const isSpriteOnGround = spriteBottom >= canvasHeight;

    if (isSpriteOnGround) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += GRAVITY;
    }
  }

  attack() {
    this.isAttacking = true;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

const playerConfig = {
  position: { x: 100, y: 100 },
  velocity: { x: 0, y: 0 },
  attackAreaOffset: { x: 0, y: 0 },
};
const player = new Sprite(playerConfig);

const enemyConfig = {
  position: { x: 400, y: 100 },
  velocity: { x: 0, y: 0 },
  color: "orange",
  attackAreaOffset: { x: -50, y: 0 },
};
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

function isRectangleCollision(rectangleA, rectangleB) {
  let isRectangleALeftOfRectangleB =
    rectangleA.attackArea.position.x <=
    rectangleB.position.x + rectangleB.width;

  let isRectangleARightOfRectangleB =
    rectangleA.attackArea.position.x + rectangleA.attackArea.width >=
    rectangleB.position.x;

  let isRectangleABelowRectangleB =
    rectangleA.attackArea.position.y + rectangleA.attackArea.height >=
    rectangleB.position.y;

  let isRectangleAAboveRectangleB =
    rectangleA.attackArea.position.y <=
    rectangleB.position.y + rectangleB.height;

  return (
    isRectangleALeftOfRectangleB &&
    isRectangleARightOfRectangleB &&
    isRectangleABelowRectangleB &&
    isRectangleAAboveRectangleB
  );
}

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
});
