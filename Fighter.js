import Behavior from "./Behavior.js";
import Rectangle from "./Rectangle.js";
import AnimationController from "./AnimationController.js";
import Physics2D from "./Physics2D.js";
export default class Fighter extends Behavior {
  initialState = {
    isAttacking: false,
    isHurt: false,
    isRunning: false,
    isJumping: false,
    isDead: false,
  };
  static state = {
    ATTACKING: "attacking",
    RUNNING: "running",
    JUMPING: "jumping",
    HURT: "hurt",
    DEAD: "dead",
  };

  constructor({
    direction = "right",
    color = "red",
    attackAreaOffset = { x: 0, y: 0 },
    attackAreaWidth = 150,
    attackAreaHeight = 50,
    movementSpeed = 1,
    jumpForce = 16,
    strength = 20,
  }) {
    super();
    this.direction = direction;
    this.attackAreaOffset = attackAreaOffset;
    this.attackAreaWidth = attackAreaWidth;
    this.attackAreaHeight = attackAreaHeight;
    this.color = color;
    this.health = 100;
    this.strength = strength;
    this.movementSpeed = movementSpeed;
    this.jumpForce = jumpForce;
    this.state = { ...this.initialState };
    this.target = null;
    this.onDeathCallBacks = [];
  }

  registerOnDeathCallBack = (callback) => {
    this.onDeathCallBacks.push(callback);
  };

  notifyOnDeathCallbacks = () => {
    this.onDeathCallBacks.forEach((callback) => {
      callback();
    });
  };

  setTarget = (collisionObject) => {
    this.target = collisionObject;
  };

  clearTarget = (collisionObject) => {
    this.target = null;
  };

  takeDamage = () => {
    this.state.isHurt = true;
  };

  dealDamage = () => {
    if (!this.target) return;

    const enemy = this.target.getComponent(Fighter);
    enemy.takeDamage();
    enemy.health -= this.strength;
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

  clearState = () => {
    this.state = { ...this.initialState };
  };

  setState = (newState) => {
    if (!this.state.isAttacking && !this.state.isHurt && !this.state.isDead) {
      this.clearState();
      if (!newState) return;

      switch (newState) {
        case Fighter.state.ATTACKING:
          this.state.isAttacking = true;
          break;
        case Fighter.state.HURT:
          this.state.isHurt = true;
          break;
        case Fighter.state.RUNNING:
          this.state.isRunning = true;
          break;
        case Fighter.state.JUMPING:
          this.state.isJumping = true;
          break;
        case Fighter.state.DEAD:
          this.state.isDead = true;
          break;
      }
    }
  };

  updateState = () => {
    if (this.health <= 0) {
      this.setState(Fighter.state.DEAD);
      this.notifyOnDeathCallbacks();
    }

    if (this.physics2D.isObjectOnGround) {
      const horizontalVelocity = this.physics2D.velocity.x;
      if (
        (this.direction === "right" && horizontalVelocity > 0) ||
        (this.direction === "left" && horizontalVelocity < 0)
      ) {
        this.setState(Fighter.state.RUNNING);
      } else {
        this.setState();
      }
    } else {
      this.setState(Fighter.state.JUMPING);
    }
  };

  updateAnimation = () => {
    if (this.state.isRunning) {
      this.animationController.setState("run");
    } else if (this.state.isJumping) {
      if (this.physics2D.velocity.y < 0) {
        this.animationController.setState("up");
      } else {
        this.animationController.setState("down");
      }
    } else if (this.state.isAttacking) {
      this.animationController.setState("attack1");
    } else if (this.state.isHurt) {
      this.animationController.setState("take_hit");
    } else if (this.state.isDead) {
      this.animationController.setState("death");
    } else {
      this.animationController.setState("idle");
    }
  };

  update = (canvasContext) => {
    if (this.state.isDead) return;

    this.updateState();
    this.updateAnimation();

    this.attackArea.x = this.gameObject.x + this.attackAreaOffset.x;
    this.attackArea.y = this.gameObject.y + this.attackAreaOffset.y;
    this.attackArea.width = this.attackAreaWidth;
    this.attackArea.height = this.attackAreaHeight;

    this.body.x = this.gameObject.x;
    this.body.y = this.gameObject.y;
  };

  attack = () => {
    this.setState(Fighter.state.ATTACKING);
  };
}
