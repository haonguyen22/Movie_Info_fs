const db = require("./database.js");

module.exports = {
    insertFavorite: async (f) => {
        try {
            const maxId = await db.one('select max("id") from "FavoriteMovie"');
            if (maxId.max === null) {
                id = 1;
            } else id = parseInt(maxId.max) + 1;
            const data = await db.one('Insert into "FavoriteMovie" values ($1, $2, $3, $4)', [
                id,
                f.user_id,
                f.movie_id,
                f.title,
            ]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
};
