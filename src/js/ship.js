export default class Ship {
  constructor(name, length, location) {
    this.name = name;
    this.length = length;
    this.location = location;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
