import { Property } from "./Property";

export interface PropertyGrid<T> {
  getHeight: () => number;
  getCell: (row: number, column: number) => T | null;
  setCell: (row: number, column: number, value: T | null) => void;
  getRow: (row: number) => (T | null)[];
  getRowByProperty: (property: Property<T>) => (T | null)[];
  getPropertyByRow: (row: number) => Property<T>;
  getGrid: () => (T | null)[][];
}

export const create = <T>(properties: Property<T>[]): PropertyGrid<T> => {
  const grid: (T | null)[][] = [];

  properties.forEach(property => {
    const propertyRow = property.getValues().map(() => null);

    grid.push(propertyRow);
  });

  const getRow = (row: number) => grid[row];
  const getRowByProperty = (property: Property<T>) =>
    getRow(properties.indexOf(property));
  const getPropertyByRow = (row: number) => properties[row];
  const getCell = (row: number, column: number) => getRow(row)[column];

  return {
    getHeight: () => properties.length,
    getCell,
    setCell: (row: number, column: number, value: T | null) => {
      grid[row][column] = value;
    },
    getRow,
    getRowByProperty,
    getPropertyByRow,
    getGrid: () => grid
  };
};
