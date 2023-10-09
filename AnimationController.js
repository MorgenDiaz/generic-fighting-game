import Behavior from "./Behavior.js";

export default class AnimationController extends Behavior {
  constructor() {
    super();
    this.sprites = {};
    this.state;
  }

  addSpriteForState(state, sprite) {
    this.sprites[state] = sprite;
  }

  setState(state) {
    if (state in this.sprites) {
      this.state = state;
    } else {
      console.log(`Error: ${state} is not a valid state!`);
    }
  }

  addAnimationAction(state, frame, action) {
    if (!this.sprites[state]) {
      console.log(`Error: ${state} is not a valid state!`);
    } else {
      this.sprites[state].addFrameAction(frame, action);
    }
  }

  update(gameContext) {
    this.gameObject.sprite = this.sprites[this.state];
  }
}
