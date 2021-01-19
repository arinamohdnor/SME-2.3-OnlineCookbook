require('dotenv').config({path: '.env'})
var pgp = require("pg-promise")({});
var connectionString = process.env.DATABASE_URL;
// var connectionString = "postgres://localhost/cookbookdb";
var local = "postgres://postgres:root@localhost:5432/cookbookdb";
var db;

if(connectionString===undefined){
    console.log("local")
    db = pgp(local);
}
else{
    console.log("heroku is connected")
    db = pgp({
        connectionString,
        ssl:{
            rejectUnauthorized: false
        }
    });
}

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

db.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    db.end();
});
module.exports = db;
