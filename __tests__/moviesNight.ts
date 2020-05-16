import { property, puzzle, place } from "../src";

describe("Movies Night", () => {
  it("can solve the puzlle", () => {
    const shirts = property<string | number>("Shirt", [
      "black",
      "blue",
      "green",
      "red",
    ]);
    const names = property<string | number>("Name", [
      "Daniel",
      "Joshua",
      "Nicholas",
      "Ryan",
    ]);
    const movies = property<string | number>("Movie", [
      "action",
      "comedy",
      "horror",
      "thriller",
    ]);
    const snacks = property<string | number>("Snack", [
      "chips",
      "cookies",
      "crackers",
      "popcorn",
    ]);
    const ages = property<string | number>("Age", [11, 12, 13, 14]);

    const solution = puzzle(
      [shirts, names, movies, snacks, ages],
      [
        place(names.get("Joshua")).firstOrLast(),
        place(shirts.get("black")).before(ages.smallest()),
        place(names.get("Joshua")).sameAs(movies.get("horror")),
        place(ages.get(14)).atPosition(3),
        place(shirts.get("red")).between(ages.get(13), movies.get("action")),
        place(names.get("Daniel")).sameAs(movies.get("thriller")),
        place(snacks.get("cookies")).firstOrLast(),
        place(shirts.get("black")).justBefore(movies.get("thriller")),
        place(snacks.get("crackers")).justAfter(movies.get("comedy")),
        place(shirts.get("red")).between(
          snacks.get("popcorn"),
          names.get("Nicholas")
        ),
        place(names.get("Nicholas")).between(
          names.get("Joshua"),
          names.get("Daniel")
        ),
        place(shirts.get("green")).first(),
      ]
    ).solve();

    expect(solution).toEqual([
      ["green", "red", "black", "blue"],
      ["Joshua", "Ryan", "Nicholas", "Daniel"],
      ["horror", "comedy", "action", "thriller"],
      ["popcorn", "chips", "crackers", "cookies"],
      [13, 12, 14, 11],
    ]);
  });
});
