const castsModel = require("../models/castsModel");
const movieCastModel = require("../models/movieCastModel");
const userModel = require("../models/userModel");
const homeHps = require("../helpers/homeHps.js");

exports.castDetail = async (req, res) => {
    if (!req.session.user) res.render("login", { style: "login", title: "login" });
    else {
        const id = req.params.id;
        const page = req.query.page || 1;
        const cast = await castsModel.getCastByID(id);
        const user = await userModel.getUserById(req.session.user);

        const movies = await movieCastModel.getMovieByCastID(id, page);

        res.render("cast", {
            name: user.name,
            cast: cast[0],
            movies: movies.data,
            helpers: homeHps,
            totalPageMovie: movies.pageTotal,
            page
        });
    }
};
