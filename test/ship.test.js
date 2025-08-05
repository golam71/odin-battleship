import Ship from "../src/js/ship.js";

const ship = new Ship("Destroyer", 2, [0, 1]);

test("Ship to have name", () => {
  expect(ship.name === "Destroyer");
});
