const db = require("./database.js");

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
    deleteGenres: async () => {
        try {
            await db.any('Delete from "Genres"');
        } catch (e) {
            console.log(e);
        }
    },
};
