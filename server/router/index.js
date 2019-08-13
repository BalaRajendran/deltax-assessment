var router = require("express").Router();
var NewActor_controller = require("../controllers/actorController");
var Movie_controller = require("../controllers/movieController");

router.post("/backend/newactor", NewActor_controller.actor_create);
router.get("/backend/newactor", NewActor_controller.get_actor);
router.post("/backend/updateactor", NewActor_controller.update_actor);
router.post("/backend/deleteactor", NewActor_controller.delete_actor);

router.post("/backend/newmovie", Movie_controller.movie_create);
router.get("/backend/movielist", Movie_controller.get_movie);
router.post("/backend/deletemovie", Movie_controller.delete_movie);

module.exports = router;