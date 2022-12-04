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

exports.postData = async () => {
    try {
        await movieCastModel.deleteMovieCasts();
        await reviewModel.deleteReviews();
        await genresModel.deleteGenres();
        await moviesModel.deleteMovies();
        await castsModel.deleteCasts();
        await fs.readFile("db/casts.json", (err, data) => {
            if (err) {
                throw err;
            }
            try {
                const casts = JSON.parse(data);
                casts.map(async (cast) => {
                    await castsModel.insertCast(cast);
                });
            } catch (e) {
                console.log(e);
            }
        });
        await fs.readFile("db/movies.json", (err, data) => {
            if (err) {
                throw err;
            }
            try {
                const movies = JSON.parse(data);
                movies.map(async (m) => {
                    await moviesModel.insertMovies(m);
                    await reviewModel.insertReviews(m);
                    await movieCastModel.insertMovieCast(m);
                    await genresModel.insertGenres(m);
                });
            } catch (e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.log(e);
    }
};
