const db = require("./database.js");

module.exports = {
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
