const { Solver, Property } = require("./solver");

const colors = new Property("Color", [
  "blue",
  "green",
  "purple",
  "red",
  "white"
]);
const names = new Property("Name", [
  "Mirage",
  "Palace",
  "Royal",
  "Seashore",
  "Vortex"
]);
const owners = new Property("Owner", [
  "American",
  "British",
  "French",
  "German",
  "Italian"
]);
const managers = new Property("Manager", [
  "Calvin",
  "Derrick",
  "Ian",
  "Roger",
  "Wesley"
]);
const rooms = new Property("Rooms", [100, 150, 200, 250, 300]);
const founded = new Property("Founded", [1910, 1920, 1930, 1940, 1950]);

const solver = new Solver([
  rooms
    .biggest()
    .after(names.get("Palace"))
    .before(rooms.get(150)),

  founded.get(1930).atPosition(2),

  colors.get("white").before(rooms.smallest()),

  owners.get("German").atCenter(),

  owners
    .get("American")
    .after(rooms.get(250))
    .before(colors.get("white")),

  managers.get("Roger").sameAs(colors.get("red")),

  names.get("Seashore").sameAs(rooms.get(300)),

  names.get("Vortex").after(colors.get("green")),

  owners.get("Italian").sameAs(founded.get(1950)),

  rooms.get(250).justBefore(managers.get("Roger")),

  owners.get("French").atPosition(1),

  colors.get("green").before(rooms.get(200)),

  managers.get("Ian").atPosition(1),

  names
    .get("Royal")
    .after(owners.get("French"))
    .before(names.get("Mirage")),

  owners.get("Italian").atPosition(4),

  names.get("Royal").sameAs(colors.get("white")),

  managers.get("Calvin").atPosition(4),

  colors.get("green").before(founded.get(1940)),

  colors.get("white").nextTo(founded.get(1930)),

  managers
    .get("Calvin")
    .after(colors.get("blue"))
    .before(managers.get("Derrick")),

  founded.get(1920).atPosition(3)
]);

const grid = solver.solve();

console.log(grid);
