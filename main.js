const GAME_CANVAS = document.querySelector(".game-canvas");
const CONTEXT = GAME_CANVAS.getContext("2d");
const GRAVITY = 0.2;

GAME_CANVAS.width = 1024;
GAME_CANVAS.height = 576;

CONTEXT.fillRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
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

function animate() {
  CONTEXT.fillStyle = "black";
  CONTEXT.fillRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);

  player.update(CONTEXT, GAME_CANVAS.height);
  enemy.update(CONTEXT, GAME_CANVAS.height);

  window.requestAnimationFrame(animate);
}

animate();
