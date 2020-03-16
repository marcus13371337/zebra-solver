const { Solver, Property } = require("./solver");

const colors = new Property("Color", ["blue", "red", "white"]);
const nationalities = new Property("Nationality", [
  "Italian",
  "Norwegian",
  "Spanish"
]);

const solver = new Solver([
  nationalities.get("Spanish").justAfter(colors.get("red")),
  nationalities.get("Norwegian").sameAs(colors.get("blue")),
  nationalities.get("Italian").atPosition(2)
]);

solver.solve();
