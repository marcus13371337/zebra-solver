const { removeDuplicates } = require("../utils");

class DistanceConstraint {
  constructor(locatorA, locatorB, distance = 0) {
    this.locatorA = locatorA;
    this.locatorB = locatorB;
    this.distance = distance;
  }

  getProperties() {
    return removeDuplicates([
      this.locatorA.getProperty(),
      this.locatorB.getProperty()
    ]);
  }

  isFullfilled(grid) {
    return (
      this.distance ===
      this.locatorB.getPositionOnGrid(grid) -
        this.locatorA.getPositionOnGrid(grid)
    );
  }

  isBroken(grid) {
    const hasPositionA = this.locatorA.getPositionOnGrid(grid) !== null;
    const hasPositionB = this.locatorB.getPositionOnGrid(grid) !== null;

    return hasPositionA && hasPositionB && !this.isFullfilled(grid);
  }
}

module.exports = DistanceConstraint;
