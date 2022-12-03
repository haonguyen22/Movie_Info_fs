const userModel = require("./../models/userModel");

exports.homePage = async (req, res) => {
    if (!req.session.user) {
        res.redirect("user/login");
    } else {
        const user = await userModel.getUserById(req.session.user);
        res.render("home", { title: "Login", style: "login"});
    }
};
