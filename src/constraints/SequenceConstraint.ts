import { Constraint } from "./Constraint";
import { PropertyValue } from "../PropertyValue";
import { PropertyGrid } from "../PropertyGrid";
import { removeDuplicates } from "../utils/removeDuplicates";

export interface Creators {
  between: (
    before: PropertyValue<any>,
    after: PropertyValue<any>
  ) => Constraint;
  before: (value: PropertyValue<any>) => Constraint;
  after: (value: PropertyValue<any>) => Constraint;
}

const create = (
  base: PropertyValue<any>,
  before: PropertyValue<any> | null,
  after: PropertyValue<any> | null
): Constraint => {
  const getPosition = (value: PropertyValue<any>, grid: PropertyGrid<any>) => {
    const row = grid.getRowByProperty(value.getProperty());

    return row.indexOf(value.getValue());
  };

  const isBroken = (grid: PropertyGrid<any>) => {
    const basePosition = getPosition(base, grid);
    const beforePosition = before ? getPosition(before, grid) : -Infinity;
    const afterPosition = after ? getPosition(after, grid) : Infinity;

    const allHasPosition = ![
      basePosition,
      beforePosition,
      afterPosition
    ].includes(-1);

    return (
      allHasPosition &&
      (afterPosition <= basePosition ||
        basePosition <= beforePosition ||
        afterPosition <= beforePosition)
    );
  };

  const getProperties = () => {
    const properties = [base.getProperty()];

    if (before) {
      properties.push(before.getProperty());
    }

    if (after) {
      properties.push(after.getProperty());
    }

    return removeDuplicates(properties);
  };

  return {
    isBroken,
    getProperties
  };
};

export const createCreators = (value: PropertyValue<any>): Creators => {
  const between = (
    before: PropertyValue<any> | null = null,
    after: PropertyValue<any> | null = null
  ) => {
    return create(value, before, after);
  };

  const before = (value: PropertyValue<any>) => between(null, value);
  const after = (value: PropertyValue<any>) => between(value);

  return {
    between,
    before,
    after
  };
};
