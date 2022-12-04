const homeHps = require("../helpers/homeHps");
const castsModel = require("../models/castsModel");
const genresModel = require("../models/genresModel");
const moviesModel = require("../models/moviesModel");
const userModel = require("./../models/userModel");

exports.searchByTitleMovie = async (req, res) => {
    if (!req.session.user) {
        res.redirect("user/login");
    } else {
        const page = req.query.page || 1;
        const user = await userModel.getUserById(req.session.user);
        if (req.query.type === "name") {
            const movies = await moviesModel.searchMovie(req.query.search, page);
            const totalPageMovie = movies.pageTotal;
            res.render("search", {
                title: "Login",
                style: "login",
                helpers: homeHps,
                name: user.name,
                movies: movies.data,
                totalPageMovie,
                search: req.query.search,
                type: req.query.type,
                page,
            });
        } else if (req.query.type === "genre") {
            const movies = await genresModel.searchMoviesByGenre(req.query.search, page);
            const totalPageMovie = movies.pageTotal;
            res.render("search", {
                title: "Login",
                style: "login",
                helpers: homeHps,
                name: user.name,
                movies: movies.data,
                totalPageMovie,
                search: req.query.search,
                type: req.query.type,
                page,
            });
        } else if (req.query.type === "cast") {
            const casts = await castsModel.searchCastsByName(req.query.search, page);
            const totalPage = casts.pageTotal;
            res.render("searchCast", {
                title: "Login",
                style: "login",
                helpers: homeHps,
                name: user.name,
                casts: casts.data,
                totalPage,
                search: req.query.search,
                type: req.query.type,
                page,
            });
        }
    }
};
