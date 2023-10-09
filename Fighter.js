import Behavior from "./Behavior.js";
import Rectangle from "./Rectangle.js";
import AnimationController from "./AnimationController.js";
import Physics2D from "./Physics2D.js";
export default class Fighter extends Behavior {
  initialState = { isAttacking: false, isRunning: false, isJumping: false };
  static state = {
    ATTACKING: "attacking",
    RUNNING: "running",
    JUMPING: "jumping",
  };

  constructor({
    direction = "right",
    color = "red",
    attackAreaOffset = { x: 0, y: 0 },
    attackAreaWidth = 150,
    attackAreaHeight = 50,
  }) {
    super();
    this.direction = direction;
    this.attackAreaOffset = attackAreaOffset;
    this.attackAreaWidth = attackAreaWidth;
    this.attackAreaHeight = attackAreaHeight;
    this.color = color;
    this.health = 100;
    this.strength = 20;
    this.state = { ...this.initialState };
    this.target = null;
  }

  setTarget = (collisionObject) => {
    this.target = collisionObject;
  };

  clearTarget = (collisionObject) => {
    this.target = null;
  };

  dealDamage = () => {
    if (!this.target) return;

    const enemy = this.target.getComponent(Fighter);
    enemy.health -= this.strength;
  };

  endAttack = () => {
    this.state.isAttacking = false;
  };

  onAttachToGameObject = () => {
    this.attackArea = this.gameObject.getComponent(Rectangle, "weapon");
    this.body = this.gameObject.getComponent(Rectangle, "body");
    this.attackArea.registerCollisionEnterObserver(this.setTarget);
    this.attackArea.registerCollisionExitObserver(this.clearTarget);
    this.physics2D = this.gameObject.getComponent(Physics2D);
    this.animationController =
      this.gameObject.getComponent(AnimationController);
    this.animationController.setState("idle");
  };

  updateState = (newState) => {
    if (!this.state.isAttacking) {
      this.state = { ...this.initialState };
      if (!newState) return;

      switch (newState) {
        case Fighter.state.ATTACKING:
          this.state.isAttacking = true;
          break;
        case Fighter.state.RUNNING:
          this.state.isRunning = true;
          break;
        case Fighter.state.JUMPING:
          this.state.isJumping = true;
          break;
      }
    }
  };

  updateAnimation = () => {
    if (this.state.isRunning) {
      this.animationController.setState("run");
    } else if (this.state.isJumping) {
      this.animationController.setState("up");
    } else if (this.state.isAttacking) {
      this.animationController.setState("attack1");
    } else {
      this.animationController.setState("idle");
    }
  };

  update = (canvasContext) => {
    if (this.physics2D.isObjectOnGround) {
      const horizontalVelocity = this.physics2D.velocity.x;
      if (
        (this.direction === "right" && horizontalVelocity > 0) ||
        (this.direction === "left" && horizontalVelocity < 0)
      ) {
        this.updateState(Fighter.state.RUNNING);
      } else {
        this.updateState();
      }
    } else {
      this.updateState(Fighter.state.JUMPING);
    }

    this.updateAnimation();

    this.attackArea.x = this.gameObject.x + this.attackAreaOffset.x;
    this.attackArea.y = this.gameObject.y + this.attackAreaOffset.y;
    this.attackArea.width = this.attackAreaWidth;
    this.attackArea.height = this.attackAreaHeight;

    this.body.x = this.gameObject.x;
    this.body.y = this.gameObject.y;
  };

  attack = () => {
    this.updateState(Fighter.state.ATTACKING);
    window.debug = true;
  };
}
