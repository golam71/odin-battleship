export default class Ship {
  constructor(name, length, location) {
    this.name = name;
    this.length = length;
    this.location = location;
    this.hits = 0;
  }

  hit(x, y) {
    if (
      this.location.some(
        (position) => position.toString() === [x, y].toString()
      )
    ) {
      this.hits++;
    }
  }

  health() {
    return this.length - this.hits;
  }

  isSunk() {
    return this.hits === this.length;
  }
}
