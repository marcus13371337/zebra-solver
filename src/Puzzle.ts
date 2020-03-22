import { Constraint } from "./constraints/Constraint";
import { Property } from "./Property";
import { containsSameValue } from "./utils/containsSameValue";
import { PropertyGrid, createPropertyGrid } from "./PropertyGrid";

const validateProperties = (properties: Property<any>[]) => {
  if (!properties.length) {
    throw new Error("Can't create problem without any properties");
  }

  const propertyLengths = properties.map(property => property.getLength());

  if (!containsSameValue(propertyLengths)) {
    throw new Error("Provided properties have different length");
  }
};

const validateConstraints = (
  constraints: Constraint[],
  properties: Property<any>[]
) => {
  constraints.forEach(constraint => {
    const propertiesInConstraint = constraint.getProperties();

    propertiesInConstraint.forEach(property => {
      if (!properties.includes(property)) {
        throw new Error(
          "Some constraints refers to properties not included in the puzzle"
        );
      }
    });
  });
};

const doesNotContainNull = <T>(grid: (T | null)[][]): grid is T[][] => {
  for (let row = 0; row < grid.length; row++) {
    const rowArray = grid[row];

    if (rowArray.includes(null)) {
      return false;
    }
  }
  return true;
};

const solveGrid = <T>(
  grid: PropertyGrid<T>,
  constraints: Constraint[],
  width: number
): boolean => {
  for (let row = 0; row < grid.getHeight(); row++) {
    const rowProperty = grid.getPropertyByRow(row);
    const values = rowProperty.getValues();
    const currentRow = grid.getRow(row);
    for (let column = 0; column < width; column++) {
      const currentValue = grid.getCell(row, column);
      if (currentValue === null) {
        const possibleValues = values.filter(
          value => !currentRow.includes(value)
        );

        for (
          let valueIndex = 0;
          valueIndex < possibleValues.length;
          valueIndex++
        ) {
          grid.setCell(row, column, possibleValues[valueIndex]);

          if (constraints.every(constraint => !constraint.isBroken(grid))) {
            const isSolved = solveGrid(grid, constraints, width);

            if (isSolved) {
              return true;
            }
          }
          grid.setCell(row, column, null);
        }

        return false;
      }
    }
  }

  return (
    doesNotContainNull(grid.getGrid()) &&
    constraints.every(constraint => !constraint.isBroken(grid))
  );
};

interface ZebraPuzzle<T> {
  solve: () => T[][];
}

export const createPuzzle = <T extends {}>(
  properties: Property<T>[],
  constraints: Constraint[]
): ZebraPuzzle<T> => {
  validateProperties(properties);
  validateConstraints(constraints, properties);

  const width = properties[0].getLength();

  const solve = () => {
    const grid = createPropertyGrid(properties);

    const isSolved = solveGrid(grid, constraints, width);

    const solution = grid.getGrid();

    if (!isSolved || !doesNotContainNull(solution)) {
      throw new Error("Unsolveable puzzle");
    }

    return solution;
  };

  return {
    solve
  };
};
