import Behavior from "./Behavior.js";
const EPSILON = 1e-5;

export default class Physics2D extends Behavior {
  constructor(
    velocity,
    gravity,
    boundaries = { top: null, right: null, bottom: null, left: null }
  ) {
    super();

    this.velocity = velocity;
    this.gravity = gravity;
    this.boundaries = boundaries;
    this.isObjectOnGround = false;
  }

  update(gameContext) {
    this.isObjectOnGround =
      this.gameObject.boundaries.bottom >= this.boundaries.bottom;

    const newXposition = this.gameObject.x + this.velocity.x;

    if (this.boundaries.left !== null && newXposition < this.boundaries.left) {
      this.gameObject.x = this.boundaries.left;
    } else if (
      this.boundaries.right !== null &&
      newXposition + this.gameObject.width > this.boundaries.right
    ) {
      this.gameObject.x = this.boundaries.right - this.gameObject.width;
    } else {
      this.gameObject.x += this.velocity.x;
    }

    if (
      this.gameObject.boundaries.bottom + this.velocity.y >=
      this.boundaries.bottom - EPSILON
    ) {
      this.gameObject.y = this.boundaries.bottom - this.gameObject.height;
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
