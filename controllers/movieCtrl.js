const homeHps = require("../helpers/homeHps");
const genresModel = require("../models/genresModel");
const movieCastModel = require("../models/movieCastModel");
const moviesModel = require("../models/moviesModel");
const reviewModel = require("../models/reviewModel");
const userModel = require("../models/userModel");

exports.movieDetail = async (req, res) => {
    const id = req.params.id;
    if (!req.session.user) res.redirect("/user/login");
    else {
        const movie = await moviesModel.getMovieByID(id);
        const page = req.query.page || 1;
        const genres = await genresModel.getGenresByID(id);
        const user = await userModel.getUserById(req.session.user);
        var genre = new Array();
        for (let i = 0; i < genres.length; i++) {
            genre.push(genres[i].genre);
        }
        genre = genre.join(", ").toString();
        const movieCasts = await movieCastModel.getMovieCastByID(id);

        const reviews = await reviewModel.getReviewByID(id, page);
        const IsFavorite = await userModel.IsFavorite(user, id);
        res.render("movieDetail", {
            genre,
            movie: movie,
            helpers: homeHps,
            movieCasts,
            name: user.name,
            IsFavorite,
            reviews,
            page,
        });
    }
};

exports.getReview = async (req, res) => {
    try {
        const data = await reviewModel.getReviewByID(req.body.id, parseInt(req.body.page));
        res.send({ data });
    } catch (e) {
        console.log(e);
    }
};
