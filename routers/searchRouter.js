const app = require("express");
const router = app.Router();
const searchCtrl = require("./../controllers/searchCtrl.js");

router.get("/", searchCtrl.searchByTitleMovie);

module.exports = router;
