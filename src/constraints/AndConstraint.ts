import { Constraint } from "./Constraint";
import { PropertyGrid } from "../PropertyGrid";
import { Property } from "../Property";
import { removeDuplicates } from "../utils/removeDuplicates";

export const create = (constraints: Constraint[]): Constraint => {
  const isBroken = (grid: PropertyGrid<any>) => {
    return constraints.some(constraint => constraint.isBroken(grid));
  };

  const getProperties = () => {
    const properties: Property<any>[] = [];

    constraints.forEach(constraint => {
      constraint.getProperties().forEach(property => properties.push(property));
    });

    return removeDuplicates(properties);
  };

  return {
    isBroken,
    getProperties
  };
};
