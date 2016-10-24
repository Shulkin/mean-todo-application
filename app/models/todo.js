var mongoose = require("mongoose");

module.exports = mongoose.model("Todo", {
  // MongoDB will automatically generate an _id
  text: String,
  done : Boolean
});
