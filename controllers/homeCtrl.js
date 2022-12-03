const userModel = require("./../models/userModel");

const fs = require("fs");
const path = require("path");
const movieCastModel = require("../models/movieCastModel");
const moviesModel = require("../models/moviesModel");
const charactersModel = require("../models/charactersModel");
const reviewModel = require("../models/reviewModel");
const genresModel = require("../models/genresModel");
const castsModel = require("../models/castsModel");

exports.homePage = async (req, res) => {
    if (!req.session.user) {
        res.redirect("user/login");
    } else {
        const user = await userModel.getUserById(req.session.user);
        res.render("home", { title: "Login", style: "login" });
    }
};

exports.postData = async () => {
    try {
        await movieCastModel.deleteMovieCasts();
        await reviewModel.deleteReviews();
        await genresModel.deleteGenres();
        await charactersModel.deleteCharacters();
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
                    await charactersModel.insertCharacter(m);
                    await genresModel.insertGenres(m);
                    await reviewModel.insertReviews(m);
                    await movieCastModel.insertMovieCast(m);
                });
            } catch (e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.log(e);
    }
};
