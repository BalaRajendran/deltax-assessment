var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CostSchema = new Schema({
    id: Number,
    actorid: String,
    movieid: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cost", CostSchema);