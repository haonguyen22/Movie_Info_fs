const pgp = require("pg-promise")();

const cn = require("./../configs/connectStr.js");

const db = pgp(cn);

module.exports = db;
