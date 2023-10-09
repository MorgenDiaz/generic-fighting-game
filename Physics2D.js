import Behavior from "./Behavior.js";
const EPSILON = 1e-5;

export default class Physics2D extends Behavior {
  constructor(velocity, gravity, groundY) {
    super();

    this.velocity = velocity;
    this.gravity = gravity;
    this.groundY = groundY;
    this.isObjectOnGround = false;
  }

  update(gameContext) {
    this.isObjectOnGround = this.gameObject.bounderies.bottom >= this.groundY;

    this.gameObject.x += this.velocity.x;

    if (
      this.gameObject.bounderies.bottom + this.velocity.y >=
      this.groundY - EPSILON
    ) {
      this.gameObject.y = this.groundY - this.gameObject.height;
      this.velocity.y = 0;
    } else {
      this.gameObject.y += this.velocity.y;
    }
    if (this.isObjectOnGround) {
      if (this.velocity.y > EPSILON) {
        this.gameObject.y -= 1;
        this.velocity.y = 0;
      }
    } else {
      this.velocity.y += this.gravity;
    }
  }
}
