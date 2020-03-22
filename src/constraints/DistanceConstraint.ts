import { Constraint } from "./Constraint";
import { PropertyValue } from "../PropertyValue";
import { PropertyGrid } from "../PropertyGrid";
import { create as createOrConstraint } from "./OrConstraint";

export interface Creators {
  atDistance: (value: PropertyValue<any>, distance: number) => Constraint;
  sameAs: (value: PropertyValue<any>) => Constraint;
  justBefore: (value: PropertyValue<any>) => Constraint;
  justAfter: (value: PropertyValue<any>) => Constraint;
  beside: (value: PropertyValue<any>) => Constraint;
}

const create = (
  valueA: PropertyValue<any>,
  valueB: PropertyValue<any>,
  distance: number
): Constraint => {
  const getPosition = (value: PropertyValue<any>, grid: PropertyGrid<any>) => {
    const row = grid.getRowByProperty(value.getProperty());

    return row.indexOf(value.getValue());
  };

  const isBroken = (grid: PropertyGrid<any>) => {
    const aPosition = getPosition(valueA, grid);
    const bPosition = getPosition(valueB, grid);

    const bothHasPosition = ![aPosition, bPosition].includes(-1);
    return bothHasPosition && aPosition - bPosition !== distance;
  };

  return {
    isBroken,
    getProperties: () => [valueA.getProperty(), valueB.getProperty()]
  };
};

export const createCreators = (value: PropertyValue<any>): Creators => {
  const atDistance = (valueB: PropertyValue<any>, distance: number) =>
    create(value, valueB, distance);

  const createAtDistance = (distance: number) => (valueB: PropertyValue<any>) =>
    atDistance(valueB, distance);

  const sameAs = createAtDistance(0);
  const justBefore = createAtDistance(-1);
  const justAfter = createAtDistance(1);

  const beside = (valueB: PropertyValue<any>) =>
    createOrConstraint([justBefore(valueB), justAfter(valueB)]);

  return {
    atDistance,
    sameAs,
    justBefore,
    justAfter,
    beside
  };
};
