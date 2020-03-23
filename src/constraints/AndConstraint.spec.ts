import { create } from "./AndConstraint";
import { create as createProperty } from "../Property";
import { create as createPropertyGrid } from "../PropertyGrid";
import { Constraint } from "./Constraint";

describe("AndConstraint", () => {
  const propertyA = createProperty("test", ["a", "b", "c"]);
  const propertyB = createProperty("test2", ["a", "b", "c"]);
  const propertyC = createProperty("test3", ["a", "b", "c"]);

  const grid = createPropertyGrid([propertyA, propertyB, propertyC]);

  let constraintA: Constraint, constraintB: Constraint, constraintC: Constraint;

  beforeEach(() => {
    constraintA = {
      isBroken: () => true,
      getProperties: () => [propertyA, propertyB]
    };

    constraintB = {
      isBroken: () => true,
      getProperties: () => [propertyA, propertyB]
    };

    constraintC = {
      isBroken: () => false,
      getProperties: () => [propertyC]
    };
  });

  it("returns a unique list of properties", () => {
    const constraint = create([constraintA, constraintB, constraintC]);

    const propertyIds = constraint
      .getProperties()
      .map(property => property.getId())
      .sort();

    const expectedProperties = [propertyB, propertyA, propertyC]
      .map(property => property.getId())
      .sort();

    expect(propertyIds).toEqual(expectedProperties);
  });

  it("is broken if any constraint is broken", () => {
    let constraint = create([constraintA, constraintB, constraintC]);
    expect(constraint.isBroken(grid)).toBe(true);

    constraintA.isBroken = () => false;
    constraint = create([constraintA, constraintB, constraintC]);
    expect(constraint.isBroken(grid)).toBe(true);
  });

  it("is not broken if no constraint is broken", () => {
    constraintA.isBroken = () => false;
    constraintB.isBroken = () => false;
    constraintC.isBroken = () => false;

    const constraint = create([constraintA, constraintB, constraintC]);

    expect(constraint.isBroken(grid)).toBe(false);
  });
});
