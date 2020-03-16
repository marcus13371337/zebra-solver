class PositionConstraint {
  constructor(locator, position) {
    this.locator = locator;
    this.position = position;
  }

  getProperties() {
    return [this.locator.getProperty()];
  }

  isFullfilled(grid) {
    return this.locator.getPositionOnGrid(grid) === this.position - 1;
  }

  isBroken(grid) {
    const hasPosition = this.locator.getPositionOnGrid(grid) !== null;

    return hasPosition && !this.isFullfilled(grid);
  }
}

module.exports = PositionConstraint;
