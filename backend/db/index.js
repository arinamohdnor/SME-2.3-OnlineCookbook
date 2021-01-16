var pgp = require("pg-promise")({});
// var connectionString = process.env.DATABASE_URL;
// var connectionString = "postgres://localhost/cookbookdb";
var connectionString = "postgres://postgres:root@localhost:5432/cookbookdb";

var db = pgp(connectionString);

db.connect()
    .then(obj => {
        // Can check the server version here (pg-promise v10.1.0+):
        const serverVersion = obj.client.serverVersion;
        console.log('hai');
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});

module.exports = db;
