import { Gameboard } from "../src/js/gameboard.js";

const gameboard = new Gameboard("Player");

test("gameboard to have 10x10 grid", () => {
  expect(gameboard.board.length).toBe(10);
  for (let i = 0; i < gameboard.board.length; i++) {
    expect(gameboard.board[i].length).toBe(10);
  }
});
