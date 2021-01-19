var pgp = require("pg-promise")({});
require('dotenv').config();
var connectionString = "postgres://wzwwknuknckovq:f5e4cc142e12a3430dc727f49b36dc307fdb11b31387424c218664c6de60e8ab@ec2-54-160-133-106.compute-1.amazonaws.com:5432/d8234i35r7usfq"
// var connectionString = "postgres://localhost/cookbookdb";
var local = "postgres://postgres:root@localhost:5432/cookbookdb";
var db;

console.log(connectionString);
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
