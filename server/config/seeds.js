const db = require("./connection");
const { User, Game } = require("../models");

db.once("open", async () => {
  await Game.deleteMany();

  const game = await Game.insertMany([
    { name: "Alphabet Game", solution: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", level: 1 },
    {
      name: "Bird",
      solution: "BIRD",
      level: 2,
    },
  ]);

  console.log("games seeded");

  await User.deleteMany();

  await User.insertMany([
    {
      firstName: "Chris",
      lastName: "Angel",
      email: "edgymagic@hotmail.com",
      password: "davidblainesucks",
    },
    {
      firstName: "Harry",
      lastName: "Houdini",
      email: "nowyouseeme@nowyoudont.com",
      password: "imaghostnow",
    },
    {
      firstName: "David",
      lastName: "Blaine",
      email: "davidblaine@blainemagic.com",
      password: "magicismagic",
    },
  ]);

  console.log("users seeded");

  process.exit();
});
