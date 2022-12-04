const app = require("express");
const {movieDetail} = require("./../controllers/movieCtrl.js");
const router = app.Router();

router.get("/:id", movieDetail);

module.exports = router;
