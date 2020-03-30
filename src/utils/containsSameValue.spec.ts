import { containsSameValue } from "./containsSameValue";

describe("containsSameValue", () => {
  it("returns false if strings not equal", () => {
    expect(containsSameValue(["a", "b", "c", "a", "a", "b"])).toBe(false);
  });

  it("returns false if numbers not equal", () => {
    expect(containsSameValue([1, 2, 3, 1, 1, 1])).toBe(false);
  });

  it("returns false if objects is not same", () => {
    const obj1 = { id: "obj1" };
    const obj2 = { id: "obj2" };
    expect(containsSameValue([obj1, obj1, obj2, obj2, obj1])).toBe(false);
  });

  it("returns true if strings not equal", () => {
    expect(containsSameValue(["a", "a", "a"])).toBe(true);
  });

  it("returns true if numbers not equal", () => {
    expect(containsSameValue([1, 1, 1, 1])).toBe(true);
  });

  it("returns true if objects is not same", () => {
    const obj1 = { id: "obj1" };
    expect(containsSameValue([obj1, obj1, obj1])).toBe(true);
  });
});
