import { property, puzzle, place } from "../../src";

describe("basic2", () => {
  it("can solve the puzzle", () => {
    const colors = property("Color", ["blue", "green", "red"]);
    const nationalities = property("Nationality", [
      "Australian",
      "Brazilian",
      "German"
    ]);
    const animals = property("Animal", ["cats", "dogs", "fishes"]);
    const sports = property("Sport", ["basketball", "football", "soccer"]);

    const solution = puzzle(
      [colors, nationalities, animals, sports],
      [
        place(nationalities.get("Brazilian")).firstOrLast(),
        place(animals.get("dogs")).sameAs(sports.get("basketball")),
        place(sports.get("football")).atDistance(colors.get("red"), -2),
        place(animals.get("fishes")).justBefore(animals.get("cats")),
        place(animals.get("dogs")).justAfter(colors.get("green")),
        place(nationalities.get("German")).atPosition(3)
      ]
    ).solve();

    expect(solution).toEqual([
      ["blue", "green", "red"],
      ["Brazilian", "Australian", "German"],
      ["fishes", "cats", "dogs"],
      ["football", "soccer", "basketball"]
    ]);
  });
});
