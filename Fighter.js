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
    this.rectangle = this.gameObject.getComponent(Rectangle);
  }

  update(canvasContext) {
    this.rectangle.x = this.gameObject.x + this.attackAreaOffset.x;
    this.rectangle.y = this.gameObject.y + this.attackAreaOffset.y;
    this.rectangle.width = this.attackAreaWidth;
    this.rectangle.height = this.attackAreaHeight;
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
