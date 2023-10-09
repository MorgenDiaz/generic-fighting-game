import Behavior from "./Behavior.js";
import GameObject from "./GameObject.js";

export default class Rectangle extends Behavior {
  COLLISION_ENTER_OBSERVERS = [];
  COLLISION_EXIT_OBSERVERS = [];

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
    this.id = Math.random().toString(36).slice(2, 9);
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
      collidableName: this.name,
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

  registerCollisionEnterObserver(observer) {
    this.COLLISION_ENTER_OBSERVERS.push(observer);
  }

  registerCollisionExitObserver(observer) {
    this.COLLISION_EXIT_OBSERVERS.push(observer);
  }

  emitCollisionEnterEvent(collidable) {
    this.COLLISION_ENTER_OBSERVERS.forEach((observer) => {
      observer(collidable);
    });
  }

  emitCollisionExitEvent(collidable) {
    this.COLLISION_EXIT_OBSERVERS.forEach((observer) => {
      observer(collidable);
    });
  }
}
