export default class Gameboard {
  constructor(name) {
    this.name = name;
    this.board = [];
    this.createBoard();
  }
  createBoard() {
    for (let i = 0; i < 10; i++) {
      this.board.push(Array(10).fill(0));
    }
  }
  placeShip(ship, [y, x], way) {
    for (let i = 0; i < ship.length; i++) {
      const row = way === "horizontal" ? y : y + i;
      const col = way === "horizontal" ? x + i : x;

      if (row >= 10 || col >= 10) {
        throw new Error("Not enough space");
      }
      if (this.board[row][col] !== 0) {
        throw new Error("Space already taken");
      }
    }

    for (let i = 0; i < ship.length; i++) {
      const row = way === "horizontal" ? y : y + i;
      const col = way === "horizontal" ? x + i : x;
      this.board[row][col] = ship;
    }
  }
  receiveAttack([y, x]) {
    const target = this.board[y][x];

    if (target === 0) {
      this.board[y][x] = ".";
    } else if (typeof target.hit === "function") {
      target.hit();
      this.board[y][x] = "x";
    }
  }
}
