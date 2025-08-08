import Ship from "../src/js/ship.js";
import Gameboard from "../src/js/gameboard.js";

describe("Gameboard Class", () => {
  let gameboard;
  let ship;

  beforeEach(() => {
    gameboard = new Gameboard("Player");
    ship = new Ship("Destroyer");
  });

  describe("Initialization", () => {
    test("should create 10x10 board", () => {
      expect(gameboard.board.length).toBe(10);
      gameboard.board.forEach((row) => {
        expect(row.length).toBe(10);
        expect(row.every((cell) => cell === 0)).toBe(true);
      });
    });
  });

  describe("placeShip() method", () => {
    test("should place horizontal ship correctly", () => {
      gameboard.placeShip(ship, [3, 4], "horizontal");
      expect(gameboard.board[4][3]).toBe(ship);
      expect(gameboard.board[4][4]).toBe(ship);
      expect(gameboard.board[4][5]).toBe(0); // Next cell should be empty
    });

    test("should place vertical ship correctly", () => {
      gameboard.placeShip(ship, [3, 4], "vertical");
      expect(gameboard.board[4][3]).toBe(ship);
      expect(gameboard.board[5][3]).toBe(ship);
      expect(gameboard.board[6][3]).toBe(0); // Next cell should be empty
    });

    test("should throw error when out of bounds", () => {
      expect(() => gameboard.placeShip(ship, [9, 9], "horizontal")).toThrow(
        "Not enough space"
      );
    });

    test("should throw error when space occupied", () => {
      gameboard.placeShip(ship, [3, 4], "horizontal");
      const newShip = new Ship("Submarine");
      expect(() => gameboard.placeShip(newShip, [3, 4], "horizontal")).toThrow(
        "Space already taken"
      );
    });
  });

  describe("receiveAttack() method", () => {
    test("should hit a ship", () => {
      gameboard.placeShip(ship, [3, 4], "horizontal");
      gameboard.receiveAttack([3, 4]);
      expect(ship.hits).toBe(1);
      expect(gameboard.board[4][3].status).toBe("hit");
    });

    test("should record miss", () => {
      gameboard.receiveAttack([3, 4]);
      expect(gameboard.board[4][3].status).toBe("miss");
    });

    test("should not hit same spot twice", () => {
      gameboard.placeShip(ship, [3, 4], "horizontal");
      gameboard.receiveAttack([3, 4]);
      const initialHits = ship.hits;
      gameboard.receiveAttack([3, 4]);
      expect(ship.hits).toBe(initialHits);
    });
  });
});
