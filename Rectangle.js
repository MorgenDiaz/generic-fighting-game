import Behavior from "./Behavior.js";
import GameObject from "./GameObject.js";

export default class Rectangle extends Behavior {
  COLLISION_OBSERVERS = [];

  constructor(
    x,
    y,
    width,
    height,
    isCollidable = false,
    collisionLayer,
    registerCollidable
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isCollidable = isCollidable;
    this.collisionLayer = collisionLayer;
    this.registerCollidable = registerCollidable;
    this.bounderies = {
      top: this.y,
      right: this.x + this.width,
      bottom: this.y + this.height,
      left: this.x,
    };
  }

  onAttachToGameObject() {
    this.registerCollidable({
      gameObject: this.gameObject,
      collidableId: this.id,
    });
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

  registerCollisionObserver(observer) {
    this.COLLISION_OBSERVERS.push(observer);
  }

  emitCollisionEvent(collidable) {
    this.COLLISION_OBSERVERS.forEach((observer) => {
      observer(collidable);
    });
  }
}
