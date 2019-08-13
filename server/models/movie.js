var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  id: Number,
  moviename: {
    type: String,
    unique: true
  },
  year: String,
  plot: String,
  poster: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Movie", MovieSchema);
