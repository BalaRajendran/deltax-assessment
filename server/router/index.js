var router = require("express").Router();
var NewActor_controller = require("../controllers/newactor");
var Movie_controller = require("../controllers/movieController");

router.post("/backend/newactor", NewActor_controller.actor_create);
router.get("/backend/newactor", NewActor_controller.get_actor);

router.post("/backend/newmovie", Movie_controller.movie_create);
router.get("/backend/movielist", Movie_controller.get_movie);

module.exports = router;