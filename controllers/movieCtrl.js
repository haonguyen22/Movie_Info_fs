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
        const genres = await genresModel.getGenresByID(id);
        const user = await userModel.getUserById(req.session.user);
        var genre = new Array();
        for (let i = 0; i < genres.length; i++) {
            genre.push(genres[i].genre);
        }
        genre = genre.join(", ").toString();
        const movieCasts = await movieCastModel.getMovieCastByID(id);

        const review = await reviewModel.getReviewByID(id);
        const IsFavorite = await userModel.IsFavorite(user, id);
        console.log(review);
        res.render("movieDetail", { genre, movie: movie, movieCasts, name: user.name, IsFavorite });
    }
};
