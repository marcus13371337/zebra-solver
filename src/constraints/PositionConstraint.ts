import { Constraint } from "./Constraint";
import { PropertyValue } from "../PropertyValue";
import { PropertyGrid } from "../PropertyGrid";
import { create as createOrConstraint } from "./OrConstraint";

export interface Creators {
  atPosition: (position: number) => Constraint;
  first: () => Constraint;
  last: () => Constraint;
  firstOrLast: () => Constraint;
  atCenter: () => Constraint;
}

const create = (value: PropertyValue<any>, position: number): Constraint => {
  const getPosition = (grid: PropertyGrid<any>) => {
    const row = grid.getRowByProperty(value.getProperty());

    return row.indexOf(value.getValue());
  };

  const isBroken = (grid: PropertyGrid<any>) => {
    const currentPosition = getPosition(grid);

    return currentPosition !== -1 && currentPosition !== position;
  };

  return {
    isBroken,
    getProperties: () => [value.getProperty()]
  };
};

export const createCreators = (value: PropertyValue<any>): Creators => {
  const atPosition = (position: number) => create(value, position - 1);

  const first = () => atPosition(1);
  const last = () => atPosition(value.getProperty().getLength());
  const firstOrLast = () => createOrConstraint([first(), last()]);
  const atCenter = () => {
    if (value.getProperty().getLength() % 2 === 0) {
      throw new Error("The problem doesn't have a center");
    }

    return atPosition(Math.ceil(value.getProperty().getLength() / 2));
  };

  return {
    atPosition,
    first,
    last,
    firstOrLast,
    atCenter
  };
};
