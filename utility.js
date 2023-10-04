export function isRectangleCollision(rectangleA, rectangleB) {
  let isRectangleALeftOfRectangleB =
    rectangleA.attackArea.position.x <=
    rectangleB.position.x + rectangleB.width;

  let isRectangleARightOfRectangleB =
    rectangleA.attackArea.position.x + rectangleA.attackArea.width >=
    rectangleB.position.x;

  let isRectangleABelowRectangleB =
    rectangleA.attackArea.position.y + rectangleA.attackArea.height >=
    rectangleB.position.y;

  let isRectangleAAboveRectangleB =
    rectangleA.attackArea.position.y <=
    rectangleB.position.y + rectangleB.height;

  return (
    isRectangleALeftOfRectangleB &&
    isRectangleARightOfRectangleB &&
    isRectangleABelowRectangleB &&
    isRectangleAAboveRectangleB
  );
}
