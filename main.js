import { isRectangleCollision } from "./utility.js";
import GameObject from "./GameObject.js";
import Sprite from "./Sprite.js";
import Fighter from "./Fighter.js";
import Physics2D from "./Physics2D.js";
import FighterControls from "./FighterControls.js";
import Rectangle from "./Rectangle.js";
import AnimationController from "./AnimationController.js";
import PlayerFactory from "./PlayerFactory.js";

window.addEventListener("DOMContentLoaded", (event) => {
  const GAME_CANVAS = document.querySelector(".game-canvas");
  const CONTEXT = GAME_CANVAS.getContext("2d");

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
        const collidable2 = gameObject2.getComponent(
          Rectangle,
          collidableName2
        );

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

  const playerFactory = new PlayerFactory({
    registerCollidable,
    canvasWidth: GAME_CANVAS.width,
    canvasHeight: GAME_CANVAS.height,
  });

  const player1 = playerFactory.createPlayer1(200, 0);
  const player2 = playerFactory.createPlayer2(700, 0);

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
});
