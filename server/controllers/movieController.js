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
    async function fetch(_id) {
        let response = await Actor.find({ _id });
        let data = await response;
        return data;
        // return "actorlist[0].name";
    }
    Movie.find(function(err, movielist) {
        var str = "";
        for (var i = 0; i < movielist.length; i++) {
            let costlist;
            var query = { movieid: movielist[i]._id };
            async function fetchdata() {
                costlist = await Cost.find(query);
                async function fetch(costlist) {
                    var j = 0;
                    while (costlist.length > j) {
                        let response = await Actor.find({
                            _id: costlist[j].actorid
                        });
                        let data = await response;
                        str = str + data[0].name + ", ";
                        j++;
                        if (j == costlist.length) {
                            // movielist[i].date = str;
                            console.log(str);
                            str = "";
                        }
                    }
                }
                // console.log(str);
                fetch(costlist);
                j++;
            }
            fetchdata();
        }
        res.json(movielist);
    });
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