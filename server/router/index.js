var router = require("express").Router();
var NewActor_controller = require("../controllers/newactor");

router.post("/backend/newactor", NewActor_controller.actor_create);

module.exports = router;