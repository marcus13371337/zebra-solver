import { property, puzzle, place } from "../src";

describe("fancyHotels", () => {
  it("can solve the puzzle", () => {
    const colors = property<string | number>("Color", [
      "blue",
      "green",
      "purple",
      "red",
      "white"
    ]);
    const names = property<string | number>("Name", [
      "Mirage",
      "Palace",
      "Royal",
      "Seashore",
      "Vortex"
    ]);
    const owners = property<string | number>("Owner", [
      "American",
      "British",
      "French",
      "German",
      "Italian"
    ]);
    const managers = property<string | number>("Manager", [
      "Calvin",
      "Derrick",
      "Ian",
      "Roger",
      "Wesley"
    ]);
    const rooms = property<string | number>("Rooms", [100, 150, 200, 250, 300]);
    const founded = property<string | number>("Founded", [
      1910,
      1920,
      1930,
      1940,
      1950
    ]);

    const solution = puzzle(
      [colors, names, owners, managers, rooms, founded],
      [
        place(rooms.biggest()).between(names.get("Palace"), rooms.get(150)),
        place(founded.get(1930)).atPosition(2),
        place(colors.get("white")).before(rooms.smallest()),
        place(owners.get("German")).atCenter(),
        place(owners.get("American")).between(
          rooms.get(250),
          colors.get("white")
        ),
        place(managers.get("Roger")).sameAs(colors.get("red")),
        place(names.get("Seashore")).sameAs(rooms.get(300)),
        place(names.get("Vortex")).after(colors.get("green")),
        place(owners.get("Italian")).sameAs(founded.get(1950)),
        place(rooms.get(250)).justBefore(managers.get("Roger")),
        place(owners.get("French")).atPosition(1),
        place(colors.get("green")).before(rooms.get(200)),
        place(managers.get("Ian")).atPosition(1),
        place(names.get("Royal")).between(
          owners.get("French"),
          names.get("Mirage")
        ),
        place(owners.get("Italian")).atPosition(4),
        place(names.get("Royal")).sameAs(colors.get("white")),
        place(managers.get("Calvin")).atPosition(4),
        place(colors.get("green")).before(founded.get(1940)),
        place(colors.get("white")).beside(founded.get(1930)),
        place(managers.get("Calvin")).between(
          colors.get("blue"),
          managers.get("Derrick")
        ),
        place(founded.get(1920)).atPosition(3)
      ]
    ).solve();

    expect(solution).toEqual([
      ["blue", "red", "white", "green", "purple"],
      ["Palace", "Seashore", "Royal", "Mirage", "Vortex"],
      ["French", "American", "German", "Italian", "British"],
      ["Ian", "Roger", "Wesley", "Calvin", "Derrick"],
      [250, 300, 150, 100, 200],
      [1910, 1930, 1920, 1950, 1940]
    ]);
  });
});
