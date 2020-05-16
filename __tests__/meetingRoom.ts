import { property, puzzle, place } from "../src";

describe("Meeting Room", () => {
  it("can solve the puzzle", () => {
    const ties = property<string | number>("Tie", [
      "black",
      "blue",
      "green",
      "red",
      "yellow",
    ]);
    const names = property<string | number>("Name", [
      "Adam",
      "Julian",
      "Nathan",
      "Michael",
      "Thomas",
    ]);
    const departments = property<string | number>("Department", [
      "HR",
      "IT",
      "marketing",
      "R&D",
      "sales",
    ]);
    const salaries = property<string | number>("Salary", [
      2000,
      3000,
      4000,
      5000,
      6000,
    ]);
    const vacations = property<string | number>("Vacation", [
      "August",
      "December",
      "January",
      "June",
      "March",
    ]);

    const ages = property<string | number>("Age", [34, 40, 46, 51, 55]);

    const solution = puzzle(
      [ties, names, departments, salaries, vacations, ages],
      [
        place(names.get("Julian")).atPosition(5),
        place(ties.get("red")).sameAs(vacations.get("June")),
        place(ties.get("black")).between(salaries.get(3000), names.get("Adam")),
        place(ages.get(51)).sameAs(salaries.get(2000)),
        place(names.get("Michael")).atPosition(1),
        place(vacations.get("March")).firstOrLast(),
        place(names.get("Adam")).beside(salaries.get(4000)),
        place(vacations.get("August")).atPosition(4),
        place(ties.get("black")).sameAs(salaries.get(4000)),
        place(salaries.get(5000)).firstOrLast(),
        place(ages.get(46)).before(departments.get("HR")),
        place(departments.get("HR")).between(ages.get(40), names.get("Thomas")),
        place(names.get("Nathan")).sameAs(vacations.get("December")),
        place(departments.get("sales")).justAfter(ages.get(46)),
        place(ties.get("red")).before(ties.get("yellow")),
        place(departments.get("R&D")).atPosition(1),
        place(ages.biggest()).sameAs(ties.get("blue")),
        place(ties.get("yellow")).firstOrLast(),
        place(ages.smallest()).atPosition(5),
        place(departments.get("marketing")).sameAs(ages.get(51)),
      ]
    ).solve();

    expect(solution).toEqual([
      ["red", "black", "blue", "green", "yellow"],
      ["Michael", "Nathan", "Adam", "Thomas", "Julian"],
      ["R&D", "sales", "HR", "marketing", "IT"],
      [3000, 4000, 6000, 2000, 5000],
      ["June", "December", "January", "August", "March"],
      [46, 40, 55, 51, 34],
    ]);
  });
});
