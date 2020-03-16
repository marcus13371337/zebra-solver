const { removeDuplicates } = require("../utils");

class SequenceConstraint {
  constructor(baseLocator) {
    this.baseLocator = baseLocator;
    this.beforeLocator = null;
    this.afterLocator = null;
  }

  before(locator) {
    this.beforeLocator = locator;
    return this;
  }

  after(locator) {
    this.afterLocator = locator;
    return this;
  }

  getProperties() {
    const result = [];

    const locators = [this.baseLocator, this.beforeLocator, this.afterLocator];
    locators.forEach(locator => {
      if (locator) {
        result.push(locator.getProperty());
      }
    });

    return removeDuplicates(result);
  }

  isFullfilled(grid) {
    const basePosition = this.baseLocator.getPositionOnGrid(grid);
    const beforePosition = this.beforeLocator
      ? this.beforeLocator.getPositionOnGrid(grid)
      : Infinity;
    const afterPosition = this.afterLocator
      ? this.afterLocator.getPositionOnGrid(grid)
      : -Infinity;

    return afterPosition < basePosition && basePosition < beforePosition;
  }

  isBroken(grid) {
    const hasBasePosition = this.baseLocator.getPositionOnGrid(grid) !== null;
    const hasBeforePosition = this.beforeLocator
      ? this.beforeLocator.getPositionOnGrid(grid) !== null
      : true;
    const hasAfterPosition = this.afterLocator
      ? this.afterLocator.getPositionOnGrid(grid) !== null
      : true;

    return (
      hasBasePosition &&
      hasBeforePosition &&
      hasAfterPosition &&
      !this.isFullfilled(grid)
    );
  }
}

module.exports = SequenceConstraint;
