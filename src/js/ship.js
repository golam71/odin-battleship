export default class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.char = name[0];
  }

  hit() {
    this.hits++;
  }

  health() {
    return this.length - this.hits;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
