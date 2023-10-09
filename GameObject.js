export default class GameObject {
  bounderies = {};

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
    gameContext.fillStyle = "orange";
    gameContext.fillRect(this.x, this.y, 30, 30);
    gameContext.fillRect(this.x, this.y + this.height, 30, 30);
    gameContext.fillRect(this.x + this.width, this.y, 30, 30);
  }

  update(gameContext) {
    this.behaviors.forEach((behavior) => behavior.update(gameContext));

    this.bounderies.top = this.y;
    this.bounderies.bottom = this.y + this.height;

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
