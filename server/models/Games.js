const { Schema, model } = require("mongoose");

const gamesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
  },
});

const Games = model("Games", gamesSchema);

module.exports = Games;
