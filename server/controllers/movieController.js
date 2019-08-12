var Actor = require("../models/actor");
var Movie = require("../models/movie");
var Cost = require("../models/cost");

exports.movie_create = function(req, res) {
    const { name, year, plot, poster, cost } = req.body;
    var movie = new Movie({
        moviename: name,
        year,
        plot,
        poster
    });
    movie.save(function(err, succ) {
        if (!err) {
            for (var i = 0; i < cost.length; i++) {
                var movieCost = new Cost({
                    actorid: cost[i]._id,
                    movieid: succ._id
                });
                movieCost.save();
            }
            res.send("done");
        } else {
            console.log(err);
        }
    });
};

exports.get_movie = function(req, res) {
    Movie.find(function(err, movielist) {
        res.json(movielist);
    });
};