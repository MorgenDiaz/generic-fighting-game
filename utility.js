export function isRectangleCollision(rectangleA, rectangleB) {
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
}
