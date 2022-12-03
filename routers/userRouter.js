const app = require("express");
const router = app.Router();
const userCtrl = require("./../controllers/userCtrl.js");

router.get("/login", userCtrl.getLoginPage);

router.post("/login", userCtrl.postLogin);

router.get("/register", userCtrl.getRegisterPage);

router.post("/register", userCtrl.postRegister);

router.post("/logout", userCtrl.logOut);

module.exports = router;
