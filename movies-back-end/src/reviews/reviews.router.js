const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reviews.controller");
const cors = require("cors");


router.route("/:reviewId").all(cors()).put(controller.update).delete(controller.delete).all(methodNotAllowed);

router.route("/").all(cors()).get(controller.list).all(methodNotAllowed);


module.exports = router;