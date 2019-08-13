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
    async function getmovie() {
        let movielist = await Movie.find();
        var str = "";
        for (var i = 0; i < movielist.length; i++) {
            var query = { movieid: movielist[i]._id };
            let costlist = await Cost.find(query);
            for (var j = 0; j < costlist.length; j++) {
                let actorlist = await Actor.find({
                    _id: costlist[j].actorid
                });
                str = str + actorlist[0].name + ", ";
            }
            movielist[i].moviename = movielist[i].moviename + "@" + str.slice(0, -2);
            str = "";
        }
        res.send(movielist);
    }
    getmovie();
};

exports.movie_update = function(req, res) {
    async function update() {
        const { name, year, plot, poster, cost, _id } = req.body;
        let update = await Movie.findByIdAndUpdate({ _id }, { $set: { moviename: name, plot: plot, year: year, poster: poster } });
        let costdelete = await Cost.deleteMany({ movieid: _id });
        for (var i = 0; i < cost.length; i++) {
            var movieCost = new Cost({
                actorid: cost[i]._id,
                movieid: _id
            });
            await movieCost.save();
        }
        res.send("done");
    }
    update();
};
exports.delete_movie = function(req, res) {
    Movie.deleteOne({ _id: req.body.id }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send("done");
        }
    });
};