const db = require("./connection");
const { User, Game } = require("../models");

db.once("open", async () => {
  await Game.deleteMany();

  const game = await Game.insertMany([
    { name: "Alphabet Game", solution: "ABCDEFGHIJKLMNOPQRSTUVWXYZ", level: 1 },
    {
      name: "spelling 1",
      solution: "CAT,DAY,NICE,SHE,THEN,FROM,MUST,PLEASE,ASK,BIG",
      level: 2,
    },
    {
      name: "spelling 2",
      solution: "BIRD,SWAY,LINE,MANY,SURE,WENT,HOUSE,DRINK,WRONG,YOUNG",
      level: 3,
    },
    {
      name: "spelling 3",
      solution: "SCAR,MEND,CREDIT,ARGUE,CAUSE,STUMBLE,PREDICT,STARVE,PRANK,MARINE",
      level: 4,
    },
    {
      name: "spelling 4",
      solution: "DETAIL,PREVIOUS,CONFIRM,AVOID,TYPICAL,RESULT,INFER,DIALOGUE,JARGON,MYTH",
      level: 5,
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
