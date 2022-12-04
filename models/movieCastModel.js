const db = require("./database.js");
const moviesModel = require("./moviesModel.js");
const pageSize = 4;

module.exports = {
    insertMovieCast: async (m) => {
        try {
            m.casts.map(async (c) => {
                try {
                    await db.one('Insert into "MovieCasts" values ($1, $2, $3)', [m.id, c.id, c.name]);
                } catch (e) {
                    console.log(e);
                }
            });
        } catch (e) {
            console.log(e);
        }
    },
    getMovieCastByID: async (id) => {
        try {
            const data = await db.any(`SELECT * FROM "MovieCasts" where "movie_id" = $1`, [id]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    getMovieByCastID: async (cast_id, page = 1) => {
        try {
            const size = await db.one('SELECT count(*) FROM "MovieCasts" where "cast_id" = $1', [cast_id]);
            const pageTotal = Math.ceil(parseInt(size.count) / pageSize);
            const offset = (page - 1) * pageSize;
            const movieIDs = await db.any(
                `SELECT * FROM "MovieCasts" where "cast_id" = $1  LIMIT ${pageSize} OFFSET ${offset}`,
                [cast_id],
            );
            var data = new Array();
            for (let i = 0; i < movieIDs.length; i++) {
                var movie = await moviesModel.getMovieByID(movieIDs[i].movie_id);
                data.push(movie);
            }

            return { data, pageTotal };
        } catch (e) {
            console.log(e);
        }
    },
    deleteMovieCasts: async () => {
        try {
            await db.any('Delete from "MovieCasts"');
        } catch (e) {
            console.log(e);
        }
    },
};
