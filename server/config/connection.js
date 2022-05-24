const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://atlas:admin@cluster0.pxpmj.mongodb.net/alphabetDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
