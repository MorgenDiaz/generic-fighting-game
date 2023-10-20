import GameObject from "./GameObject.js";
import AnimationController from "./AnimationController.js";
import Rectangle from "./Rectangle.js";
import Physics2D from "./Physics2D.js";
import Fighter from "./Fighter.js";
import FighterControls from "./FighterControls.js";
import {
  heroAnimationConfigurations,
  kenjiAnimationConfigurations,
} from "./fighterAnimationConfigurations.js";

export default class PlayerFactory {
  constructor({ registerCollidable, canvasWidth, canvasHeight }) {
    this.registerCollidable = registerCollidable;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  createPlayer1(initialPositionX = 0, initialPositionY = 0, audioComponent) {
    const player1Config = {
      attackAreaOffset: { x: 70, y: -30 },
      attackAreaWidth: 110,
      attackAreaHeight: 90,
      movementSpeed: 3,
    };

    const fighter1 = new Fighter(player1Config);

    const heroAnimationController = AnimationController.create(
      heroAnimationConfigurations
    );

    heroAnimationController.addAnimationAction(
      "attack1",
      3,
      fighter1.dealDamage
    );

    heroAnimationController.addAnimationAction("attack1", 3, () => {
      audioComponent.src = "./assets/audio/hero/punch-2-166695.mp3";
      audioComponent.load();
      audioComponent.play();
      console.log("yep");
    });

    heroAnimationController.addAnimationAction(
      "attack1",
      6,
      fighter1.clearState
    );

    heroAnimationController.addAnimationAction(
      "take_hit",
      2,
      fighter1.clearState
    );

    const player1Weapon = new Rectangle(
      0,
      0,
      0,
      0,
      true,
      window.COLLISION_LAYERS.PLAYER_1_WEAPON,
      this.registerCollidable
    );
    player1Weapon.name = "weapon";

    const player1Body = new Rectangle(
      0,
      0,
      100,
      100,
      true,
      window.COLLISION_LAYERS.PLAYER_1_BODY,
      this.registerCollidable
    );
    player1Body.name = "body";

    const PLAYER_1_CONTROL_MAP = {
      navigation: {
        a: FighterControls.ACTIONS.left,
        d: FighterControls.ACTIONS.right,
      },
      jump: "w",
      attack: "s",
    };

    const player1 = new GameObject(
      initialPositionX,
      initialPositionY,
      100,
      100,
      null,
      [
        heroAnimationController,
        new Physics2D({ x: 0, y: 0 }, 0.7, {
          left: 0,
          bottom: this.canvasHeight - 175,
          right: this.canvasWidth,
        }),
        player1Weapon,
        player1Body,
        fighter1,
        new FighterControls(PLAYER_1_CONTROL_MAP),
      ],
      -125,
      -100
    );

    return player1;
  }

  createPlayer2(initialPositionX = 0, initialPositionY = 0, audioComponent) {
    const player2Config = {
      direction: "left",
      attackAreaOffset: { x: -145, y: -23 },
      attackAreaHeight: 90,
      attackAreaWidth: 150,
      movementSpeed: 3,
      strength: 10,
    };

    const fighter2 = new Fighter(player2Config);

    const kenjiAnimationController = AnimationController.create(
      kenjiAnimationConfigurations
    );

    kenjiAnimationController.addAnimationAction(
      "attack1",
      1,
      fighter2.dealDamage
    );

    kenjiAnimationController.addAnimationAction("attack1", 1, () => {
      audioComponent.src = "./assets/audio/kenji/sword-sound-2-36274.mp3";
      audioComponent.load();
      audioComponent.play();
    });

    kenjiAnimationController.addAnimationAction(
      "attack1",
      3,
      fighter2.clearState
    );

    kenjiAnimationController.addAnimationAction(
      "take_hit",
      2,
      fighter2.clearState
    );

    const player2Weapon = new Rectangle(
      0,
      0,
      0,
      0,
      true,
      window.COLLISION_LAYERS.PLAYER_2_WEAPON,
      this.registerCollidable
    );
    player2Weapon.name = "weapon";

    const player2Body = new Rectangle(
      0,
      0,
      100,
      100,
      true,
      window.COLLISION_LAYERS.PLAYER_2_BODY,
      this.registerCollidable
    );

    player2Body.name = "body";

    const PLAYER_2_CONTROL_MAP = {
      navigation: {
        ArrowLeft: FighterControls.ACTIONS.left,
        ArrowRight: FighterControls.ACTIONS.right,
      },
      jump: "ArrowUp",
      attack: "ArrowDown",
    };

    const player2 = new GameObject(
      initialPositionX,
      initialPositionY,
      100,
      100,
      null,
      [
        new Physics2D({ x: 0, y: 0 }, 0.7, {
          left: 0,
          bottom: this.canvasHeight - 175,
          right: this.canvasWidth,
        }),
        kenjiAnimationController,
        player2Weapon,
        player2Body,
        fighter2,
        new FighterControls(PLAYER_2_CONTROL_MAP),
      ],
      -205,
      -200
    );

    return player2;
  }
}
