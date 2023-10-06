import Behavior from "./Behavior.js";
export default class Fighter extends Behavior {
  constructor({ color = "red", attackAreaOffset = { x: 0, y: 0 } }) {
    super();
    this.lastPressedKey;
    this.attackAreaOffset = attackAreaOffset;
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.strength = 20;
  }

  draw(canvasContext) {
    canvasContext.fillStyle = this.color;
    canvasContext.fillRect(
      this.gameObject.x,
      this.gameObject.y,
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

  update(canvasContext) {
    this.attackArea = {
      position: {
        x: this.gameObject.x + this.attackAreaOffset.x,
        y: this.gameObject.y + this.attackAreaOffset.y,
      },
      offset: this.attackAreaOffset,
    };

    this.draw(canvasContext);

    this.attackArea.position.x = this.gameObject.x + this.attackArea.offset.x;
    this.attackArea.position.y = this.gameObject.y + this.attackArea.offset.y;
  }
  attack() {
    console.log("attack!");
    this.isAttacking = true;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
