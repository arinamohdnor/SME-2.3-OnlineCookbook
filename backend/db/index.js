var pgp = require("pg-promise")({});
// var connectionString = process.env.DATABASE_URL;
// var connectionString = "postgres://localhost/cookbookdb";
var connectionString = "postgres://postgres:root@localhost:5432/cookbookdb";

var db = pgp(connectionString);

module.exports = db;
