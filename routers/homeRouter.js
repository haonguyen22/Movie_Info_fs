const app = require("express");
const { homePage } = require("./../controllers/homeCtrl.js");
const router = app.Router();

router.get("/", homePage);


module.exports = router;
