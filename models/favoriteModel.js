const db = require("./database.js");

module.exports = {
    insertFavorite: async (m, u) => {
        try {
            await db.one('Insert into "FavoriteMovie" values ($1, $2, $3)', [u.id, m.id, m.title]);
        } catch (e) {
            console.log(e);
        }
    },
    deleteFavorite: async (m, u) => {
        try {
            await db.one('Delete from "FavoriteMovie" where user_id = $1 and movie_id = $2', [u.id, m.id]);
        } catch (e) {
            console.log(e);
        }
    },
};
