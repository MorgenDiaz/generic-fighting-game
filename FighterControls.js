import Behavior from "./Behavior.js";
import Physics2D from "./Physics2D.js";
import Fighter from "./Fighter.js";

const ACTIONS = { left: "left", right: "right", jump: "jump" };

const CONTROL_MAP = {
  navigation: { a: ACTIONS.left, d: ACTIONS.right },
  jump: "w",
  attack: "s",
};

export default class FighterControls extends Behavior {
  constructor(window, controlMap = CONTROL_MAP) {
    super();
    this.window = window;
    this.controlMap = controlMap;
    this.activeActions = new Set();
    lastAction: null;
  }

  onAttachToGameObject() {
    this.physics2D = this.gameObject.getComponent(Physics2D);
    this.fighter = this.gameObject.getComponent(Fighter);
    this.registerKeyListeners();
  }

  update(gameContext) {
    this.physics2D.velocity.x = 0;
    if (this.testy) {
      this.testy = false;
    }
    if (
      this.activeActions.has(ACTIONS.left) &&
      this.lastAction === ACTIONS.left
    ) {
      this.physics2D.velocity.x = -1;
    } else if (
      this.activeActions.has(ACTIONS.right) &&
      this.lastAction === ACTIONS.right
    ) {
      this.physics2D.velocity.x = 1;
    }
  }

  registerKeyListeners() {
    this.window.addEventListener("keydown", (event) => {
      if (event.key in this.controlMap.navigation) {
        this.activeActions.add(this.controlMap.navigation[event.key]);
        this.lastAction = this.controlMap.navigation[event.key];
      }

      switch (event.key) {
        case this.controlMap.jump:
          this.physics2D.velocity.y = -20;
          this.testy = true;
          break;
        case this.controlMap.attack:
          this.fighter.attack();
          break;
      }
    });

    this.window.addEventListener("keyup", (event) => {
      if (event.key in this.controlMap.navigation) {
        this.activeActions.delete(this.controlMap.navigation[event.key]);
      }
    });
  }
}
