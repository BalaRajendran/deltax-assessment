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