export default class Sprite {
  constructor({ position, width = 50, height = 150, imageSrc, scale = 1 }) {
    this.position = position;
    this.width = width * scale;
    this.height = height * scale;
    this.image = new Image();
    this.image.src = imageSrc;
  }

  draw(gameContext) {
    gameContext.drawImage(this.image, 0, 0, this.width, this.height);
  }

  update(gameContext) {
    this.draw(gameContext);
  }
}
