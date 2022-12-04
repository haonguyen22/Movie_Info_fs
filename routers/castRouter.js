const app = require("express");
const { castDetail } = require("../controllers/castCtrl");
const router = app.Router();

router.get("/:id", castDetail);

module.exports = router;
