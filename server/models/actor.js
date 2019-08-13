var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ActorSchema = new Schema({
  id: Number,
  name: {
    type: String,
    unique: true
  },
  sex: String,
  dob: String,
  bio: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Actor", ActorSchema);
