export default class Fighter {
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

  update(canvasContext, canvasHeight, gravity) {
    this.draw(canvasContext);

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.attackArea.position.x = this.position.x + this.attackArea.offset.x;
    this.attackArea.position.y = this.position.y + this.attackArea.offset.y;

    const spriteBottom = this.position.y + this.height;
    const isSpriteOnGround = spriteBottom >= canvasHeight - 150;

    if (isSpriteOnGround) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }
  }
  attack() {
    this.isAttacking = true;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
