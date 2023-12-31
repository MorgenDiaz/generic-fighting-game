import Behavior from "./Behavior.js";
import Physics2D from "./Physics2D.js";
import Fighter from "./Fighter.js";
export default class FighterControls extends Behavior {
  static ACTIONS = { left: "left", right: "right", jump: "jump" };

  constructor(controlMap) {
    super();
    this.controlMap = controlMap;
    this.activeActions = new Set();
    lastAction: null;
  }

  onAttachToGameObject() {
    this.physics2D = this.gameObject.getComponent(Physics2D);
    this.fighter = this.gameObject.getComponent(Fighter);
    this.fighter.registerOnDeathCallBack(() => {
      this.unregisterKeyListeners();
    });
    this.registerKeyListeners();
  }

  update(gameContext) {
    this.physics2D.velocity.x = 0;

    if (
      this.activeActions.has(FighterControls.ACTIONS.left) &&
      this.lastAction === FighterControls.ACTIONS.left
    ) {
      this.physics2D.velocity.x = -this.fighter.movementSpeed;
    } else if (
      this.activeActions.has(FighterControls.ACTIONS.right) &&
      this.lastAction === FighterControls.ACTIONS.right
    ) {
      this.physics2D.velocity.x = this.fighter.movementSpeed;
    }
  }

  observeKeyDownEvents = (event) => {
    if (event.key in this.controlMap.navigation) {
      this.activeActions.add(this.controlMap.navigation[event.key]);
      this.lastAction = this.controlMap.navigation[event.key];
    }

    switch (event.key) {
      case this.controlMap.jump:
        if (this.physics2D.isObjectOnGround) {
          this.physics2D.velocity.y = -this.fighter.jumpForce;
        }
        break;
      case this.controlMap.attack:
        this.fighter.attack();
        break;
    }
  };

  observeKeyUpEvents = (event) => {
    if (event.key in this.controlMap.navigation) {
      this.activeActions.delete(this.controlMap.navigation[event.key]);
    }
  };

  registerKeyListeners = () => {
    window.addEventListener("keydown", this.observeKeyDownEvents);
    window.addEventListener("keyup", this.observeKeyUpEvents);
  };

  unregisterKeyListeners = () => {
    window.removeEventListener("keydown", this.observeKeyDownEvents);
    window.removeEventListener("keyup", this.observeKeyUpEvents);
  };
}
