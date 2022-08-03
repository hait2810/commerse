const mongoose = require("mongoose");
const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Size", sizeSchema);
