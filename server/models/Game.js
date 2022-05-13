const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  solution: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
  },
});

const Game = model("Game", gameSchema);

module.exports = Game;
