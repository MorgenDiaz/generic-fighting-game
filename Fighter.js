import Behavior from "./Behavior.js";
import Rectangle from "./Rectangle.js";
export default class Fighter extends Behavior {
  constructor({
    color = "red",
    attackAreaOffset = { x: 0, y: 0 },
    attackAreaWidth = 150,
    attackAreaHeight = 50,
  }) {
    super();
    this.attackAreaOffset = attackAreaOffset;
    this.attackAreaWidth = attackAreaWidth;
    this.attackAreaHeight = attackAreaHeight;
    this.color = color;
    this.isAttacking = false;
    this.health = 100;
    this.strength = 20;
  }

  onAttachToGameObject() {
    this.attackArea = this.gameObject.getComponent(Rectangle, "weapon");
    this.body = this.gameObject.getComponent(Rectangle, "body");
  }

  update(canvasContext) {
    this.attackArea.x = this.gameObject.x + this.attackAreaOffset.x;
    this.attackArea.y = this.gameObject.y + this.attackAreaOffset.y;
    this.attackArea.width = this.attackAreaWidth;
    this.attackArea.height = this.attackAreaHeight;

    this.body.x = this.gameObject.x;
    this.body.y = this.gameObject.y;
  }

  attack() {
    console.log("attack!");
    this.isAttacking = true;
    window.debug = true;
    setTimeout(() => {
      this.isAttacking = false;
      window.debug = false;
    }, 100);
  }
}
