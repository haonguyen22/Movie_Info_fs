const userModel = require("./../models/userModel");

const fs = require("fs");
const path = require("path");
const movieCastModel = require("../models/movieCastModel");
const moviesModel = require("../models/moviesModel");
const reviewModel = require("../models/reviewModel");
const genresModel = require("../models/genresModel");
const castsModel = require("../models/castsModel");
const hps = require("./../helpers/homeHps.js");

exports.homePage = async (req, res) => {
    if (!req.session.user) {
        res.redirect("user/login");
    } else {
        const page = req.query.page || 1;
        const user = await userModel.getUserById(req.session.user);
        const movies = await moviesModel.getMovieSortRating(page);
        const totalPageMovie = movies.pageTotal;

        res.render("home", {
            title: "Login",
            style: "login",
            helpers: hps,
            name: user.name,
            movies: movies.data,
            totalPageMovie,
            page,
        });
    }
};

exports.importData = async (req, res) => {
    try {
        const absolutePath = path.join(__dirname.substring(0, __dirname.length - 11), req.file.path);
        const jsonString = fs.readFileSync(absolutePath, "utf-8");
        const data = JSON.parse(jsonString);
        if (req.file.originalname === "casts.json") {
            try {
                data.map(async (cast) => {
                    await castsModel.insertCast(cast);
                });
                res.redirect("back");
            } catch (e) {
                console.log(e);
            }
        }
        if (req.file.originalname === "movies.json") {
            try {
                data.map(async (m) => {
                    await moviesModel.insertMovies(m);
                    await reviewModel.insertReviews(m);
                    await movieCastModel.insertMovieCast(m);
                    await genresModel.insertGenres(m);
                });
                res.redirect("back");
            } catch (e) {
                console.log(e);
            }
        }
    } catch (e) {
        console.log(e);
    }
};
