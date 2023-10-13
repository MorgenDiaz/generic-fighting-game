export default class Sprite {
  constructor({
    width = 50,
    height = 150,
    imageSrc,
    frames = 1,
    scale = 1,
    animationSlowFactor = 6,
    animationShouldRepeat = true,
  }) {
    this.width = width * scale;
    this.height = height * scale;
    this.image = new Image();
    this.image.onload = () => {
      /*Important! if the singleFrameWidth is calculated before the image is loaded it will be set to 0!*/
      this.singleFrameWidth = this.image.width / frames;
    };
    this.image.src = imageSrc;
    this.frames = frames;
    this.activeFrame = 0;
    this.frame = 0;
    this.animationSlowFactor = animationSlowFactor;
    this.animationShouldRepeat = animationShouldRepeat;
    this.hasCompletedAnimation = false;
    this.frameActions = [];
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
        if (this.activeFrame === frames - 1 && this.hasCompletedAnimation)
          return;

        for (const frameAction of this.frameActions) {
          if (frameAction.frame === this.activeFrame) {
            frameAction.callback();
          }
        }

        this.activeFrame++;

        if (this.activeFrame === this.frames) {
          if (this.animationShouldRepeat) {
            this.activeFrame = 0;
          } else {
            this.activeFrame = this.frames - 1;
          }

          this.hasCompletedAnimation = true;
        }

        this.frame = 0;
      }

      this.frame++;
    }
  }

  addFrameAction(frame, callback) {
    this.frameActions.push({ frame, callback });
  }
}
