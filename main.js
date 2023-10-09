import { isRectangleCollision } from "./utility.js";
import GameObject from "./GameObject.js";
import Sprite from "./Sprite.js";
import Fighter from "./Fighter.js";
import Physics2D from "./Physics2D.js";
import FighterControls from "./FighterControls.js";
import Rectangle from "./Rectangle.js";
import AnimationController from "./AnimationController.js";

const GAME_CANVAS = document.querySelector(".game-canvas");
const CONTEXT = GAME_CANVAS.getContext("2d");
const GRAVITY = 0.7;

const PLAYER_1_HEALTH_BAR = document.querySelector("#player-1-health-bar");
const PLAYER_2_HEALTH_BAR = document.querySelector("#player-2-health-bar");
const TIMER_TEXT = document.querySelector("#time");
const GAME_STATUS_TEXT = document.querySelector("#game-status");

const COLLIDABLES = [];
const ACTIVE_COLLISIONS = new Set();

function registerCollidable(collidable) {
  COLLIDABLES.push(collidable);
}

GAME_CANVAS.width = 1024;
GAME_CANVAS.height = 576;

const BACKGROUND_SPRITE = new Sprite({
  position: { x: 0, y: 0 },
  width: GAME_CANVAS.width,
  height: GAME_CANVAS.height,
  imageSrc: "./assets/game_background_4.png",
});

const BACKGROUND = new GameObject(
  0,
  0,
  GAME_CANVAS.width,
  GAME_CANVAS.height,
  BACKGROUND_SPRITE
);

function detectCollisions() {
  for (let i = 0; i < COLLIDABLES.length; i++) {
    const {
      gameObject: gameObject1,
      collidableId: collidableId1,
      collidableName: collidableName1,
    } = COLLIDABLES[i];
    const collidable1 = gameObject1.getComponent(Rectangle, collidableName1);

    for (let j = 1; j < COLLIDABLES.length; j++) {
      const {
        gameObject: gameObject2,
        collidableId: collidableId2,
        collidableName: collidableName2,
      } = COLLIDABLES[j];
      const collidable2 = gameObject2.getComponent(Rectangle, collidableName2);

      const collisionId = `${collidableId1}:${collidableId2}`;

      if (isRectangleCollision(collidable1, collidable2)) {
        if (
          (collidable1.collisionLayer === "player1_weapon" &&
            collidable2.collisionLayer === "player2") ||
          (collidable1.collisionLayer === "player2_weapon" &&
            collidable2.collisionLayer === "player1")
        ) {
          ACTIVE_COLLISIONS.add(collisionId);
          collidable1.emitCollisionEnterEvent(gameObject2);
          collidable2.emitCollisionEnterEvent(gameObject1);
        }
      } else {
        if (ACTIVE_COLLISIONS.has(collisionId)) {
          ACTIVE_COLLISIONS.delete(collisionId);
          collidable1.emitCollisionExitEvent(gameObject2);
          collidable2.emitCollisionExitEvent(gameObject1);
        }
      }
    }
  }
}

function determineWinner(timerId) {
  clearInterval(timerInterval);

  if (player1.health === player2.health) {
    GAME_STATUS_TEXT.textContent = "Tie!";
  } else if (player1.health > player2.health) {
    GAME_STATUS_TEXT.textContent = "Player1 Wins!";
  } else {
    GAME_STATUS_TEXT.textContent = "Player2 Wins";
  }

  GAME_STATUS_TEXT.style.display = "block";
}

let timerInterval = null;
let timeSeconds = 60;

timerInterval = setInterval(() => {
  timeSeconds--;
  TIMER_TEXT.textContent = timeSeconds;

  if (timeSeconds === 0) {
    determineWinner(timerInterval);
  }
}, 1000);

const player1Config = {
  attackAreaOffset: { x: 50, y: 0 },
};

const fighter1 = new Fighter(player1Config);

const heroIdleSprite = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/hero/Idle.png",
  frames: 10,
  scale: 2,
});

const heroRunSprite = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/hero/Run.png",
  frames: 8,
  scale: 2,
});

const heroJumpSprite = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/hero/Jump.png",
  frames: 3,
  scale: 2,
});

const heroAttackSprite1 = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/hero/Attack1.png",
  frames: 7,
  scale: 2,
});

const heroAnimationController = new AnimationController();
heroAnimationController.addSpriteForState("idle", heroIdleSprite);
heroAnimationController.addSpriteForState("run", heroRunSprite);
heroAnimationController.addSpriteForState("up", heroJumpSprite);
heroAnimationController.addSpriteForState("attack1", heroAttackSprite1);

heroAnimationController.addAnimationAction("attack1", 3, fighter1.dealDamage);
heroAnimationController.addAnimationAction("attack1", 6, fighter1.endAttack);

const player1Weapon = new Rectangle(
  0,
  0,
  0,
  0,
  true,
  "player1_weapon",
  registerCollidable
);
player1Weapon.name = "weapon";

const player1Body = new Rectangle(
  0,
  0,
  100,
  100,
  true,
  "player1",
  registerCollidable
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
  200,
  0,
  100,
  100,
  null,
  [
    heroAnimationController,
    new Physics2D({ x: 0, y: 0 }, 0.7, GAME_CANVAS.height - 175),
    player1Weapon,
    player1Body,
    fighter1,
    new FighterControls(PLAYER_1_CONTROL_MAP),
  ],
  -100,
  -100
);

// PLAYER 2 CONSTRUCTION

const player2Config = {
  direction: "left",
  attackAreaOffset: { x: -100, y: 0 },
};

const fighter2 = new Fighter(player2Config);

const kenjiIdleSprite = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/kenji/Idle.png",
  frames: 4,
  scale: 3,
  animationSlowFactor: 15,
});

const kenjiRunSprite = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/kenji/Run.png",
  frames: 8,
  scale: 3,
  animationSlowFactor: 15,
});

const kenjiJumpSprite = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/kenji/Jump.png",
  frames: 2,
  scale: 3,
  animationSlowFactor: 15,
});

const kenjiAttackSprite1 = new Sprite({
  width: 175,
  height: 175,
  imageSrc: "./assets/kenji/Attack1.png",
  frames: 4,
  scale: 3,
});

const kenjiAnimationController = new AnimationController();
kenjiAnimationController.addSpriteForState("idle", kenjiIdleSprite);
kenjiAnimationController.addSpriteForState("run", kenjiRunSprite);
kenjiAnimationController.addSpriteForState("up", kenjiJumpSprite);
kenjiAnimationController.addSpriteForState("attack1", kenjiAttackSprite1);

kenjiAnimationController.addAnimationAction("attack1", 1, fighter2.dealDamage);
kenjiAnimationController.addAnimationAction("attack1", 3, fighter2.endAttack);

const player2Weapon = new Rectangle(
  0,
  0,
  0,
  0,
  true,
  "player2_weapon",
  registerCollidable
);
player2Weapon.name = "weapon";

const player2Body = new Rectangle(
  0,
  0,
  100,
  100,
  true,
  "player2",
  registerCollidable
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
  400,
  0,
  100,
  100,
  null,
  [
    new Physics2D({ x: 0, y: 0 }, 0.7, GAME_CANVAS.height - 175),
    kenjiAnimationController,
    player2Weapon,
    player2Body,
    fighter2,
    new FighterControls(PLAYER_2_CONTROL_MAP),
  ],
  -190,
  -200
);

function animate() {
  CONTEXT.clearRect(0, 0, GAME_CANVAS.width, GAME_CANVAS.height);
  BACKGROUND.update(CONTEXT);

  player1.update(CONTEXT);
  player2.update(CONTEXT);

  detectCollisions();

  const player1Health = player1.getComponent(Fighter).health;
  const player2Health = player2.getComponent(Fighter).health;

  PLAYER_1_HEALTH_BAR.style.width = `${player1Health}%`;
  PLAYER_2_HEALTH_BAR.style.width = `${player2Health}%`;

  window.requestAnimationFrame(animate);
}

animate();
