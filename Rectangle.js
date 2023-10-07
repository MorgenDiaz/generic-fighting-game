import Behavior from "./Behavior.js";
import GameObject from "./GameObject.js";

export default class Rectangle extends Behavior {
  constructor(x, y, width, height, isCollidable = false, registerCollidable) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isCollidable = isCollidable;
    this.registerCollidable = registerCollidable;
    this.bounderies = {
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      left: this.x,
    };
  }

  onAttachToGameObject() {
    this.registerCollidable(this);
  }

  debug(gameCanvas) {
    gameCanvas.strokeStyle = "red";
    gameCanvas.strokeRect(this.x, this.y, this.width, this.height);
  }

  update(gameCanvas) {
    this.bounderies = {
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      left: this.x,
    };

    if (window.debug) {
      this.debug(gameCanvas);
    }
  }
}
