const SPRITE_DIMENSIONS = { width: 175, height: 175 };

const heroAnimationConfigurations = {
  idle: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/hero/Idle.png",
    frames: 10,
    scale: 2,
  },
  run: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/hero/Run.png",
    frames: 8,
    scale: 2,
  },

  up: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/hero/Jump.png",
    frames: 3,
    scale: 2,
  },
  down: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/hero/Fall.png",
    frames: 3,
    scale: 2,
  },
  take_hit: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/hero/Take_Hit.png",
    frames: 3,
    scale: 2,
  },
  attack1: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/hero/Attack1.png",
    frames: 7,
    scale: 2,
  },
  death: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/hero/Death.png",
    frames: 11,
    scale: 2,
    animationShouldRepeat: false,
  },
};

const kenjiAnimationConfigurations = {
  idle: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/kenji/Idle.png",
    frames: 4,
    scale: 3,
    animationSlowFactor: 15,
  },

  run: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/kenji/Run.png",
    frames: 8,
    scale: 3,
    animationSlowFactor: 15,
  },

  up: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/kenji/Jump.png",
    frames: 2,
    scale: 3,
    animationSlowFactor: 15,
  },
  down: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/kenji/Fall.png",
    frames: 2,
    scale: 3,
    animationSlowFactor: 15,
  },
  take_hit: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/kenji/Take_hit.png",
    frames: 3,
    scale: 3,
    animationSlowFactor: 15,
  },
  attack1: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/kenji/Attack1.png",
    frames: 4,
    scale: 3,
  },
  death: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/img/kenji/Death.png",
    frames: 7,
    scale: 3,
    animationShouldRepeat: false,
  },
};

export { heroAnimationConfigurations, kenjiAnimationConfigurations };
