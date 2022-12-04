const app = require("express");
const router = app.Router();
const userCtrl = require("./../controllers/userCtrl.js");

router.get("/login", userCtrl.getLoginPage);

router.post("/login", userCtrl.postLogin);

router.get("/register", userCtrl.getRegisterPage);

router.post("/register", userCtrl.postRegister);

router.post("/logout", userCtrl.logOut);

router.post("/favorite/:id", userCtrl.AddFavorite);

router.get("/favorite", userCtrl.getFavoriteMovie);

module.exports = router;
