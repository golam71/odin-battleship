import Ship from "../src/js/ship.js";

const ship = new Ship("Destroyer", 2, [
  [0, 1],
  [1, 2],
]);

test("Ship to have name", () => {
  expect(ship.name).toBe("Destroyer");
});

test("Ship to have health", () => {
  expect(ship.health()).not.toBe(0);
});

test("Ship to take hits", () => {
  ship.hit(1, 2);
  expect(ship.health()).toBe(1);
});

test("Ship to Sink", () => {
  expect(ship.isSunk()).toBe(false);
  ship.hit(0, 1);
  expect(ship.isSunk()).toBe(true);
});
