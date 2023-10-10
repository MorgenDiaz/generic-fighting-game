const SPRITE_DIMENSIONS = { width: 175, height: 175 };

const heroAnimationConfigurations = {
  idle: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/hero/Idle.png",
    frames: 10,
    scale: 2,
  },
  run: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/hero/Run.png",
    frames: 8,
    scale: 2,
  },

  up: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/hero/Jump.png",
    frames: 3,
    scale: 2,
  },
  attack1: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/hero/Attack1.png",
    frames: 7,
    scale: 2,
  },
};

const kenjiAnimationConfigurations = {
  idle: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/kenji/Idle.png",
    frames: 4,
    scale: 3,
    animationSlowFactor: 15,
  },

  run: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/kenji/Run.png",
    frames: 8,
    scale: 3,
    animationSlowFactor: 15,
  },

  up: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/kenji/Jump.png",
    frames: 2,
    scale: 3,
    animationSlowFactor: 15,
  },

  attack1: {
    ...SPRITE_DIMENSIONS,
    imageSrc: "./assets/kenji/Attack1.png",
    frames: 4,
    scale: 3,
  },
};

export { heroAnimationConfigurations, kenjiAnimationConfigurations };
