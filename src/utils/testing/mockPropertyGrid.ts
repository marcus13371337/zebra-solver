import { create as createPropertyGrid, PropertyGrid } from "../../PropertyGrid";
import { create as createProperty, Property } from "../../Property";

export const mockPropertyGrid = (
  simpleGrid: (string | null)[][],
  properties: Property<string>[]
): PropertyGrid<string> => {
  const grid = createPropertyGrid(properties);
  simpleGrid.forEach((row, rowIndex) => {
    row.forEach((value, columnIndex) => {
      if (value) {
        grid.setCell(rowIndex, columnIndex, value);
      }
    });
  });

  return grid;
};
