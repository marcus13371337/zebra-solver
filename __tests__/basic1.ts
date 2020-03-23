import { property, puzzle, place } from "../src";

describe("basic1", () => {
  it("can solve the puzzle", () => {
    const colors = property("Color", ["blue", "red", "white"]);
    const nationalities = property("Nationality", [
      "Italian",
      "Norwegian",
      "Spanish"
    ]);

    const solution = puzzle(
      [colors, nationalities],
      [
        place(nationalities.get("Spanish")).justAfter(colors.get("red")),
        place(nationalities.get("Norwegian")).sameAs(colors.get("blue")),
        place(nationalities.get("Italian")).atPosition(2)
      ]
    ).solve();

    expect(solution).toEqual([
      ["blue", "red", "white"],
      ["Norwegian", "Italian", "Spanish"]
    ]);
  });
});
