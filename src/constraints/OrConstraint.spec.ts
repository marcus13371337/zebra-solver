import { create } from "./OrConstraint";
import { create as createProperty } from "../Property";
import { create as createPropertyGrid } from "../PropertyGrid";
import { Constraint } from "./Constraint";

describe("OrConstraint", () => {
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
      isBroken: () => true,
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

  it("is broken if all constraints is broken", () => {
    const constraint = create([constraintA, constraintB, constraintC]);
    expect(constraint.isBroken(grid)).toBe(true);
  });

  it("is not broken if one constraint is not broken", () => {
    constraintA.isBroken = () => false;

    let constraint = create([constraintA, constraintB, constraintC]);

    expect(constraint.isBroken(grid)).toBe(false);

    constraintB.isBroken = () => false;
    constraint = create([constraintA, constraintB, constraintC]);
    expect(constraint.isBroken(grid)).toBe(false);
  });
});
