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

  placeShip(ship, [x, y], way) {
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

  receiveAttack([x, y]) {
    const cell = this.board[y][x];
    if (cell && typeof cell.hit === "function") {
      cell.hit();
      this.board[y][x] = { status: "hit", data: cell };
    } else {
      this.board[y][x] = { status: "miss" };
    }
  }
  getMissedAttacks() {
    const misses = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.board[y][x]?.status === "miss") {
          misses.push([x, y]);
        }
      }
    }
    return misses;
  }
  allShipsSunk() {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const cell = this.board[y][x];
        if (typeof cell?.hit === "function" && !cell.isSunk()) {
          return false;
        }
      }
    }
    return true;
  }
}
