import Rectangle from "./Rectangle.js";

export default class CollisionCoordinator {
  constructor() {
    this.collidables = [];
    this.activeCollisions = new Set();
  }

  registerCollidable = (collidable) => {
    this.collidables.push(collidable);
  };

  isRectangleCollision = (rectangleA, rectangleB) => {
    let isRectangleALeftOfRectangleB =
      rectangleA.x <= rectangleB.x + rectangleB.width;

    let isRectangleARightOfRectangleB =
      rectangleA.x + rectangleA.width >= rectangleB.x;

    let isRectangleABelowRectangleB =
      rectangleA.y + rectangleA.height >= rectangleB.y;

    let isRectangleAAboveRectangleB =
      rectangleA.y <= rectangleB.y + rectangleB.height;

    return (
      isRectangleALeftOfRectangleB &&
      isRectangleARightOfRectangleB &&
      isRectangleABelowRectangleB &&
      isRectangleAAboveRectangleB
    );
  };

  detectCollisions = () => {
    for (let i = 0; i < this.collidables.length; i++) {
      const {
        gameObject: gameObject1,
        collidableId: collidableId1,
        collidableName: collidableName1,
      } = this.collidables[i];
      const collidable1 = gameObject1.getComponent(Rectangle, collidableName1);

      for (let j = 1; j < this.collidables.length; j++) {
        const {
          gameObject: gameObject2,
          collidableId: collidableId2,
          collidableName: collidableName2,
        } = this.collidables[j];
        const collidable2 = gameObject2.getComponent(
          Rectangle,
          collidableName2
        );

        const collisionId = `${collidableId1}:${collidableId2}`;

        if (this.isRectangleCollision(collidable1, collidable2)) {
          if (
            (collidable1.collisionLayer === "player1_weapon" &&
              collidable2.collisionLayer === "player2") ||
            (collidable1.collisionLayer === "player2_weapon" &&
              collidable2.collisionLayer === "player1")
          ) {
            this.activeCollisions.add(collisionId);
            collidable1.emitCollisionEnterEvent(gameObject2);
            collidable2.emitCollisionEnterEvent(gameObject1);
          }
        } else {
          if (this.activeCollisions.has(collisionId)) {
            this.activeCollisions.delete(collisionId);
            collidable1.emitCollisionExitEvent(gameObject2);
            collidable2.emitCollisionExitEvent(gameObject1);
          }
        }
      }
    }
  };
}
