const db = require("./database.js");
const { getMovieByID } = require("./moviesModel.js");
const pageSize = 4;

module.exports = {
    insertGenres: async (m) => {
        await db.any('Delete from "Genres"');
        m.genres.map(async (g) => {
            try {
                const data = await db.one('Insert into "Genres" values ($1, $2)', [m.id, g]);
            } catch (e) {
                console.log(e);
            }
        });

        return data;
    },
    getGenresByID: async (id) => {
        try {
            const data = await db.any(`SELECT genre FROM "Genres" where "movie_id" = $1`, [id]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    searchMoviesByGenre: async (search, page = 1) => {
        try {
            const size = await db.one(`select count(*) from "Genres" where "genre" LIKE '${search}%'`);
            const pageTotal = Math.ceil(parseInt(size.count) / pageSize);
            const offset = (page - 1) * pageSize;
            var data = new Array();
            const movieID = await db.any(
                `select * from "Genres" where "genre" LIKE '${search}%' LIMIT ${pageSize} OFFSET ${offset}`,
            );
            for (let i = 0; i < movieID.length; i++) {
                const movie = await getMovieByID(movieID[i].movie_id);
                data.push(movie);
            }
            return { data, pageTotal };
        } catch (e) {
            console.log(e);
        }
    },
    deleteGenres: async () => {
        try {
            await db.any('Delete from "Genres"');
        } catch (e) {
            console.log(e);
        }
    },
};
