const { removeDuplicates } = require("../utils");

class AnyConstraint {
  constructor(constraintA, constraintB) {
    this.constraintA = constraintA;
    this.constraintB = constraintB;
  }

  getProperties() {
    return removeDuplicates([
      ...this.constraintA.getProperties(),
      ...this.constraintB.getProperties()
    ]);
  }

  isFullfilled(grid) {
    return (
      this.constraintA.isFullfilled(grid) || this.constraintB.isFullfilled(grid)
    );
  }

  isBroken(grid) {
    return this.constraintA.isBroken(grid) && this.constraintB.isBroken(grid);
  }
}

module.exports = AnyConstraint;
