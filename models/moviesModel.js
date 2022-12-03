const db = require("./database.js");
const pageSize = 4;

module.exports = {
    getMovieSortRating: async (page = 1) => {
        try {
            const size = await db.one('select count(*) from "Movies"');
            const pageTotal = Math.ceil(parseInt(size.count) / pageSize);
            const offset = (page - 1) * pageSize;
            const data = await db.any(
                `SELECT * FROM "Movies" Order by "rating" DESC LIMIT ${pageSize} OFFSET ${offset}`,
            );
            return {
                data,
                pageTotal,
            };
        } catch (e) {
            console.log(e);
        }
    },
    insertMovies: async (m) => {
        try {
            const data = await db.one('Insert into "Movies" values ($1, $2, $3, $4, $5, $6)', [
                m.id,
                m.img,
                m.title,
                m.year,
                m.rating,
                m.ratingCount,
            ]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    deleteMovies: async () => {
        try {
            await db.any('Delete from "Movies"');
        } catch (e) {
            console.log(e);
        }
    },
};
