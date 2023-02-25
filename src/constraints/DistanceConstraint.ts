import { Constraint } from "./Constraint";
import { PropertyValue } from "../PropertyValue";
import { PropertyGrid } from "../PropertyGrid";
import { create as createOrConstraint } from "./OrConstraint";
import { removeDuplicates } from "../utils/removeDuplicates";

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
    getProperties: () =>
      removeDuplicates([valueA.getProperty(), valueB.getProperty()])
  };
};

export const createCreators = (value: PropertyValue<any>): Creators => {
  const atDistance = (valueB: PropertyValue<any>, distance: number) =>
    create(value, valueB, distance);

  const atDistanceCreator = (distance: number) => (
    valueB: PropertyValue<any>
  ) => atDistance(valueB, distance);

  const justBefore = atDistanceCreator(-1);
  const justAfter = atDistanceCreator(1);

  return {
    atDistance,
    sameAs: atDistanceCreator(0),
    justBefore,
    justAfter,
    beside: (valueB: PropertyValue<any>) =>
    createOrConstraint([justBefore(valueB), justAfter(valueB)])
  };
};
