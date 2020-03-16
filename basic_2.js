const { Solver, Property } = require("./solver");

const colors = new Property("Color", ["blue", "green", "red"]);
const nationalities = new Property("Nationality", [
  "Australian",
  "Brazilian",
  "German"
]);
const animals = new Property("Animal", ["cats", "dogs", "fishes"]);
const sports = new Property("Sport", ["basketball", "football", "soccer"]);

const solver = new Solver([
  nationalities.get("Brazilian").firstOrLast(),
  animals.get("dogs").sameAs(sports.get("basketball")),
  sports.get("football").before(colors.get("red")),
  animals.get("fishes").justBefore(animals.get("cats")),
  animals.get("dogs").justAfter(colors.get("green")),
  nationalities.get("German").atPosition(3)
]);

const grid = solver.solve();
console.log(grid);
