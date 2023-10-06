export default class Sprite {
  constructor({
    width = 50,
    height = 150,
    imageSrc,
    frames = 1,
    scale = 1,
    animationSlowFactor = 6,
  }) {
    this.width = width * scale;
    this.height = height * scale;
    this.image = new Image();
    this.image.src = imageSrc;
    this.frames = frames;
    this.singleFrameWidth = this.image.width / frames;
    this.activeFrame = 0;
    this.frame = 0;
    this.animationSlowFactor = animationSlowFactor;
  }

  draw(gameContext, x, y) {
    gameContext.drawImage(
      this.image,
      this.singleFrameWidth * this.activeFrame,
      0,
      this.singleFrameWidth,
      this.image.height,
      x,
      y,
      this.width,
      this.height
    );

    if (this.frames > 1) {
      if (this.frame % this.animationSlowFactor === 0) {
        this.activeFrame++;
        this.activeFrame = this.activeFrame % (this.frames - 1);
        this.frame = 0;
      }

      this.frame++;
    }
  }
}
