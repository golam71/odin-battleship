import Gameboard from "../src/js/gameboard.js";
import Ship from "../src/js/ship.js";

const gameboard = new Gameboard("Player");
const ship = new Ship("Destroyer");

test("Gameboard to have 10x10 grid", () => {
  expect(gameboard.board.length).toBe(10);
  for (let i = 0; i < gameboard.board.length; i++) {
    expect(gameboard.board[i].length).toBe(10);
  }
});

test("Gameboard to be able to place ships horizontally", () => {
  gameboard.placeShip(ship, [2, 0], "horizontal");
  for (let i = 0; i < ship.length; i++) {
    expect(gameboard.board[2][0 + i].name).toBe(ship.name);
  }
});

test("Gameboard to be able to place ships vertically", () => {
  gameboard.placeShip(ship, [5, 0], "vertical");
  for (let i = 0; i < ship.length; i++) {
    expect(gameboard.board[5 + i][0].name).toBe(ship.name);
    // console.log(gameboard.board)
  }
});

test("Ship to able to take hits via gameboard", () => {
  gameboard.receiveAttack([5, 0]);
  expect(gameboard.board[5][0]).toBe("x");
});
