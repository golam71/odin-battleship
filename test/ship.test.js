import Ship from "../src/js/ship.js";

describe("Ship Class", () => {
  describe("Initialization", () => {
    test("should create ship with correct name and length", () => {
      const ship = new Ship("Destroyer");
      expect(ship.name).toBe("Destroyer");
      expect(ship.length).toBe(2);
    });

    test("should create Carrier with length 5", () => {
      const ship = new Ship("Carrier");
      expect(ship.length).toBe(5);
    });
  });

  describe("hit() method", () => {
    test("should increase hit count", () => {
      const ship = new Ship("Destroyer");
      ship.hit();
      expect(ship.hits).toBe(1);
    });
  });

  describe("health() method", () => {
    test("should return remaining health", () => {
      const ship = new Ship("Destroyer");
      ship.hit();
      expect(ship.health()).toBe(1);
    });
  });

  describe("isSunk() method", () => {
    test("should return false when not sunk", () => {
      const ship = new Ship("Destroyer");
      expect(ship.isSunk()).toBe(false);
    });

    test("should return true when sunk", () => {
      const ship = new Ship("Destroyer");
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  });
});
