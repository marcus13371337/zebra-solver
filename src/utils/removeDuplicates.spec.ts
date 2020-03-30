import { removeDuplicates } from "./removeDuplicates";

describe("removeDuplicates", () => {
  it("removes any duplicates", () => {
    expect(removeDuplicates(["a", "b", "c", "a", "a", "b"])).toEqual([
      "a",
      "b",
      "c"
    ]);
  });

  it("can handle numbers", () => {
    expect(removeDuplicates([1, 2, 3, 1, 1, 1])).toEqual([1, 2, 3]);
  });

  it("can objects", () => {
    const obj1 = { id: "obj1" };
    const obj2 = { id: "obj2" };
    expect(removeDuplicates([obj1, obj1, obj2, obj2, obj1])).toEqual([
      obj1,
      obj2
    ]);
  });
});
