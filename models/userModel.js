const db = require("./database.js");
const moviesModel = require("./moviesModel.js");
const pageSize = 4;

module.exports = {
    getAllUsers: async () => {
        try {
            const data = await db.any('select * from "Users"');
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    getUserByUsername: async (username) => {
        try {
            const data = await db.one('select * from "Users" where "username"=$1', [username]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    getUserById: async (id) => {
        try {
            const data = await db.one('select * from "Users" where "id"=$1', [id]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    insertUser: async (user) => {
        try {
            const maxId = await db.one('select max("id") from "Users"');
            if (maxId.max === null) {
                id = 1;
            } else id = parseInt(maxId.max) + 1;
            const data = await db.one('Insert into "Users" values ($1, $2, $3, $4, $5, $6)', [
                id,
                user.username,
                user.password,
                user.Name,
                user.email,
                user.dob,
            ]);
            return data;
        } catch (e) {
            console.log(e);
        }
    },
    getFavoriteMovie: async (user, page = 1) => {
        try {
            const size = await db.one('select count(*) from "FavoriteMovie" where user_id = $1 ', [user.id]);
            const pageTotal = Math.ceil(parseInt(size.count) / pageSize);
            const offset = (page - 1) * pageSize;
            const favorIDs = await db.any(
                `SELECT * FROM "FavoriteMovie" where user_id = $1 limit ${pageSize} OFFSET ${offset}`,
                [user.id],
            );
            var data = new Array();
            for (let i = 0; i < favorIDs.length; i++) {
                const movie = await moviesModel.getMovieByID(favorIDs[i].movie_id);
                data.push(movie);
            }
            return {
                data,
                favorIDs,
                pageTotal,
                page,
            };
        } catch (e) {
            console.log(e);
        }
    },
    IsFavorite: async (user, movie_id) => {
        try {
            const movie = await db.any(`SELECT * FROM "FavoriteMovie" where user_id = $1 and movie_id = $2`, [
                user.id,
                movie_id,
            ]);
            console.log(movie);
            if (movie.length > 0) return true;
            else return false;
        } catch (e) {
            console.log(e);
        }
    },
};
