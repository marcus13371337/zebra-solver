import { createCreators } from "./DistanceConstraint";
import { mockPropertyGrid } from "../utils/testing/mockPropertyGrid";
import { create as createProperty } from "../Property";

describe("OrConstraint", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testValues = createProperty("test", [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g"
  ]);
  const grid = mockPropertyGrid(
    [["a", "b", "c", "d", "e", "f", "g"]],
    [testValues]
  );

  const creators = createCreators(testValues.get("d"));

  describe("atDistance", () => {
    it("can measure distance for value to the left", () => {
      const expectDistance = (distance: number) => ({
        toBeBroken: (value: boolean) => {
          const constraint = creators.atDistance(testValues.get("a"), distance);

          expect(constraint.isBroken(grid)).toBe(value);
        }
      });

      expectDistance(-4).toBeBroken(true);
      expectDistance(-3).toBeBroken(true);
      expectDistance(-2).toBeBroken(true);
      expectDistance(-1).toBeBroken(true);
      expectDistance(0).toBeBroken(true);
      expectDistance(1).toBeBroken(true);
      expectDistance(2).toBeBroken(true);
      expectDistance(3).toBeBroken(false);
      expectDistance(4).toBeBroken(true);
      expectDistance(5).toBeBroken(true);
    });

    it("can measure distance for value to the right", () => {
      const expectDistance = (distance: number) => ({
        toBeBroken: (value: boolean) => {
          const constraint = creators.atDistance(testValues.get("g"), distance);

          expect(constraint.isBroken(grid)).toBe(value);
        }
      });

      expectDistance(-4).toBeBroken(true);
      expectDistance(-3).toBeBroken(false);
      expectDistance(-2).toBeBroken(true);
      expectDistance(-1).toBeBroken(true);
      expectDistance(0).toBeBroken(true);
      expectDistance(1).toBeBroken(true);
      expectDistance(2).toBeBroken(true);
      expectDistance(3).toBeBroken(true);
      expectDistance(4).toBeBroken(true);
      expectDistance(5).toBeBroken(true);
    });

    it("can measure the same value", () => {
      const expectDistance = (distance: number) => ({
        toBeBroken: (value: boolean) => {
          const constraint = creators.atDistance(testValues.get("d"), distance);

          expect(constraint.isBroken(grid)).toBe(value);
        }
      });

      expectDistance(-4).toBeBroken(true);
      expectDistance(-3).toBeBroken(true);
      expectDistance(-2).toBeBroken(true);
      expectDistance(-1).toBeBroken(true);
      expectDistance(0).toBeBroken(false);
      expectDistance(1).toBeBroken(true);
      expectDistance(2).toBeBroken(true);
      expectDistance(3).toBeBroken(true);
      expectDistance(4).toBeBroken(true);
      expectDistance(5).toBeBroken(true);
    });

    it("is not broken if value doesn't have position", () => {
      const grid = mockPropertyGrid(
        [["a", "b", "c", null, "e", "f", "g"]],
        [testValues]
      );

      const constraint = creators.atDistance(testValues.get("g"), 0);
      expect(constraint.isBroken(grid)).toBe(false);
    });
  });

  describe("sameAs", () => {
    it("is broken if not on same position", () => {
      const constraint = creators.sameAs(testValues.get("a"));

      expect(constraint.isBroken(grid)).toBe(true);
    });

    it("is not broken if on same position", () => {
      const constraint = creators.sameAs(testValues.get("d"));

      expect(constraint.isBroken(grid)).toBe(false);
    });

    it("is not broken if value doesnt have position", () => {
      const grid = mockPropertyGrid(
        [["a", "b", "c", null, "e", "f", "g"]],
        [testValues]
      );

      const constraint = creators.sameAs(testValues.get("g"));
      expect(constraint.isBroken(grid)).toBe(false);
    });
  });

  describe("justBefore", () => {
    it("is broken if not just before position", () => {
      const constraint = creators.justBefore(testValues.get("a"));

      expect(constraint.isBroken(grid)).toBe(true);
    });

    it("is not broken if just before", () => {
      const constraint = creators.justBefore(testValues.get("e"));

      expect(constraint.isBroken(grid)).toBe(false);
    });

    it("is not broken if value doesnt have position", () => {
      const grid = mockPropertyGrid(
        [["a", "b", "c", null, "e", "f", "g"]],
        [testValues]
      );

      const constraint = creators.justBefore(testValues.get("g"));
      expect(constraint.isBroken(grid)).toBe(false);
    });
  });

  describe("justAfter", () => {
    it("is broken if not just after position", () => {
      const constraint = creators.justAfter(testValues.get("b"));

      expect(constraint.isBroken(grid)).toBe(true);
    });

    it("is not broken if just after", () => {
      const constraint = creators.justAfter(testValues.get("c"));

      expect(constraint.isBroken(grid)).toBe(false);
    });

    it("is not broken if value doesnt have position", () => {
      const grid = mockPropertyGrid(
        [["a", "b", "c", null, "e", "f", "g"]],
        [testValues]
      );

      const constraint = creators.justBefore(testValues.get("g"));
      expect(constraint.isBroken(grid)).toBe(false);
    });
  });

  describe("beside", () => {
    it("is broken if not beside value", () => {
      const constraint = creators.beside(testValues.get("b"));

      expect(constraint.isBroken(grid)).toBe(true);
    });

    it("is not broken if beside position", () => {
      const beforeConstraint = creators.beside(testValues.get("c"));
      expect(beforeConstraint.isBroken(grid)).toBe(false);

      const afterConstraint = creators.beside(testValues.get("e"));
      expect(afterConstraint.isBroken(grid)).toBe(false);
    });

    it("is not broken if value doesnt have position", () => {
      const grid = mockPropertyGrid(
        [["a", "b", "c", null, "e", "f", "g"]],
        [testValues]
      );

      const constraint = creators.justBefore(testValues.get("g"));
      expect(constraint.isBroken(grid)).toBe(false);
    });
  });

  describe("general", () => {
    it("returns both properties for getProperties", () => {
      const constraint = creators.atDistance(testValues.get("g"), 0);

      const propertyIds = constraint
        .getProperties()
        .map(property => property.getId());

      expect(propertyIds).toEqual([testValues.getId()]);
    });
  });
});
