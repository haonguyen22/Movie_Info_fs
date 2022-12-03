const pgp = require("pg-promise")();

const cn = {
    host: "localhost",
    port: "20470",
    database: "movie_info",
    user: "postgres",
    password: "nguyenvanhao",
    max: 30,
};

const db = pgp(cn);

module.exports = db;