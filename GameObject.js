export default class GameObject {
  boundaries = {};

  constructor(
    x,
    y,
    width,
    height,
    sprite,
    behaviors = [],
    spriteOffsetX = 0,
    spriteOffsetY = 0
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.behaviors = behaviors;
    this.spriteOffsetX = spriteOffsetX;
    this.spriteOffsetY = spriteOffsetY;

    this.behaviors.forEach((behavior) => {
      behavior.gameObject = this;
      behavior.onAttachToGameObject();
    });
  }

  draw(gameContext) {
    if (this.sprite) {
      this.sprite.draw(
        gameContext,
        this.x + this.spriteOffsetX,
        this.y + this.spriteOffsetY
      );
    }
  }

  update(gameContext) {
    this.behaviors.forEach((behavior) => behavior.update(gameContext));

    this.boundaries.top = this.y;
    this.boundaries.bottom = this.y + this.height;

    this.draw(gameContext);
  }

  getComponent(componentType, name) {
    for (const behavior of this.behaviors) {
      if (name) {
        if (behavior instanceof componentType && behavior.name === name)
          return behavior;
      } else {
        if (behavior instanceof componentType) return behavior;
      }
    }
  }
}
