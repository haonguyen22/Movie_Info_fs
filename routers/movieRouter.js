const app = require("express");
const { movieDetail, getReview } = require("./../controllers/movieCtrl.js");
const router = app.Router();

router.get("/:id", movieDetail);
router.post("/:id", getReview);

module.exports = router;
