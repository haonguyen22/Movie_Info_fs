const db = require("./database.js");

module.exports = {
    insertMovieCast: async (m) => {
        try {
            m.casts.map(async (c) => {
                await db.one('Insert into "MovieCasts" values ($1, $2, $3)', [m.id, c.id, c.name]);
            });
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
