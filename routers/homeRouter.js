const app = require("express");
const { homePage, postData } = require("./../controllers/homeCtrl.js");
const router = app.Router();


router.get("/", homePage);

// router.post("/data", postData);

module.exports = router;
