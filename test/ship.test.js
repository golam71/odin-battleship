import Ship from "../src/js/ship.js";

const ship = new Ship("Destroyer");

test("Ship to have name", () => {
  expect(ship.name).toBe("Destroyer");
});

test("Ship to have initial health", () => {
  expect(ship.health()).toBe(2);
});

test("Ship takes hits correctly", () => {
  ship.hit();
  expect(ship.health()).toBe(1);
});

test("Ship sinks after enough hits", () => {
  ship.hit(); // second hit
  expect(ship.isSunk()).toBe(true);
});

test("Ship to have char initials", () => {
  expect(ship.name).toBe("Destroyer");
});

test("Ship to be various", () => {
  let ship = new Ship("Carrier");
  expect(ship.name).toBe("Carrier");
  expect(ship.length).toBe(5);
});
