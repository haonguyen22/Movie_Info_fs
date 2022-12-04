const app = require("express");
const { homePage, importData } = require("./../controllers/homeCtrl.js");
const router = app.Router();
const multer = require("multer")
const upload = multer({ dest: "db/" }); 


router.get("/", homePage);

router.post("/import", upload.single("files"), importData);

module.exports = router;
