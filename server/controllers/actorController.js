var Actor = require("../models/actor");

exports.actor_create = function(req, res) {
    const { name, dob, bio, sex } = req.body;
    var actor = new Actor({
        name,
        dob,
        sex,
        bio
    });
    actor.save(function(err, succ) {
        if (!err) {
            res.send("done");
        } else {
            console.log(err);
        }
    });
};

exports.get_actor = function(req, res) {
    Actor.find(function(err, actorlist) {
        res.json(actorlist);
    });
};

exports.update_actor = function(req, res) {
    console.log(req.body._id);
    Actor.findByIdAndUpdate({ _id: req.body._id }, { $set: req.body }, function(
        err,
        actorlist
    ) {
        if (err) {
            console.log(err);
        } else {
            res.send("done");
        }
    });
};

exports.delete_actor = function(req, res) {
    Actor.deleteOne({ _id: req.body.id }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send("done");
        }
    });
};