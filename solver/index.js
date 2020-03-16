const assert = require("assert");
const {
  DistanceConstraint,
  PositionConstraint,
  SequenceConstraint,
  AnyConstraint
} = require("./constraints");
const { removeDuplicates } = require("./utils");

class BaseLocator {
  constructor(property, value) {
    this.property = property;
    this.value = value;
  }

  getProperty() {
    return this.property;
  }

  anyOf(constraintA, constraintB) {
    return new AnyConstraint(constraintA, constraintB);
  }

  after(locator) {
    return new SequenceConstraint(this).after(locator);
  }

  justAfter(locator) {
    return new DistanceConstraint(this, locator, -1);
  }

  before(locator) {
    return new SequenceConstraint(this).before(locator);
  }

  justBefore(locator) {
    return new DistanceConstraint(this, locator, 1);
  }

  sameAs(locator) {
    return new DistanceConstraint(this, locator, 0);
  }

  nextTo(locator) {
    return this.anyOf(this.justBefore(locator), this.justAfter(locator));
  }

  first() {
    return this.atPosition(1);
  }

  last() {
    return this.atPosition(this.property.getLength());
  }

  firstOrLast() {
    return this.anyOf(this.first(), this.last());
  }

  atPosition(position) {
    return new PositionConstraint(this, position);
  }

  atCenter() {
    assert(
      this.property.getLength() % 2 == 1,
      "The problem doesn't seem to have a center"
    );
    return this.atPosition(Math.ceil(this.property.getLength() / 2));
  }

  getPositionOnGrid(grid) {
    const row = grid.getRowByProperty(this.property);

    const index = row.findIndex(value => value === this.value);
    return index === -1 ? null : index;
  }
}

class Property {
  constructor(name, values) {
    this.name = name;
    this.values = values;
  }

  getValues() {
    return this.values;
  }

  getLength() {
    return this.getValues().length;
  }

  get(value) {
    assert(
      this.values.includes(value),
      `Can't find value ${value} in property`
    );
    return new BaseLocator(this, value);
  }

  biggest() {
    return new BaseLocator(this, Math.max(...this.values));
  }

  smallest() {
    return new BaseLocator(this, Math.min(...this.values));
  }
}

class PropertyGrid {
  constructor(properties) {
    this.properties = properties;

    this.reset();
  }

  reset() {
    const height = this.getHeight();
    const width = this.getWidth();
    const grid = [];

    for (let row = 0; row < height; row++) {
      const currentRow = [];
      for (let column = 0; column < width; column++) {
        currentRow.push(null);
      }
      grid.push(currentRow);
    }

    this.grid = grid;
  }

  getRowByProperty(property) {
    return this.grid[this.properties.findIndex(prop => prop === property)];
  }

  getPropertyForRow(rowIndex) {
    return this.properties[rowIndex];
  }

  getHeight() {
    return this.properties.length;
  }

  getWidth() {
    return this.properties[0].getLength();
  }

  getRow(index) {
    return this.grid[index];
  }

  getValue(row, column) {
    return this.grid[row][column];
  }

  setValue(row, column, value) {
    if (value) {
      assert(
        this.getPropertyForRow(row)
          .getValues()
          .includes(value),
        `Trying to set to ${value} which is not part of this property`
      );
    }

    this.grid[row][column] = value;
  }

  getGrid() {
    return this.grid;
  }
}

class Solver {
  constructor(constraints) {
    this.constraints = constraints;
  }

  extractProperties() {
    assert(this.constraints.length > 0, "No constraints added");

    const properties = [];
    this.constraints.forEach(constraint => {
      constraint.getProperties().forEach(value => properties.push(value));
    });

    const firstProperty = properties[0];
    assert(
      properties.every(
        property => property.getLength() === firstProperty.getLength()
      ),
      "All properties does not have the same length"
    );

    return removeDuplicates(properties);
  }

  _solveGrid(grid, constraints = []) {
    for (let row = 0; row < grid.getHeight(); row++) {
      const rowProperty = grid.getPropertyForRow(row);
      const values = rowProperty.getValues();
      const currentRow = grid.getRow(row);
      for (let column = 0; column < grid.getWidth(); column++) {
        const currentValue = grid.getValue(row, column);
        if (currentValue === null) {
          const possibleValues = values.filter(
            value => !currentRow.includes(value)
          );

          for (
            let valueIndex = 0;
            valueIndex < possibleValues.length;
            valueIndex++
          ) {
            grid.setValue(row, column, possibleValues[valueIndex]);

            if (constraints.every(constraint => !constraint.isBroken(grid))) {
              const isSolved = this._solveGrid(grid, constraints);
              if (isSolved) {
                return true;
              }
            }
            grid.setValue(row, column, null);
          }
          return false;
        }
      }
    }

    return constraints.every(constraint => constraint.isFullfilled(grid));
  }

  solve() {
    const properties = this.extractProperties();
    const grid = new PropertyGrid(properties);

    const isSolved = this._solveGrid(grid, this.constraints);

    if (!isSolved) {
      throw new Error("Unsolveable puzzle");
    }

    return grid.getGrid();
  }
}

module.exports = { Solver, Property };
