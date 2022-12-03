const pgp = require("pg-promise")();

const cn = {
    host: "localhost",
    port: "5432",
    database: "movie_info",
    user: "postgres",
    password: "nguyenvanhao"
};

const db = pgp(cn);

module.exports = db;