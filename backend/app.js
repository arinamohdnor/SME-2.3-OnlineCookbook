var express = require('express');
const multer = require('multer');
const db = require("./db/index");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

const app = express();
const session = require('express-session');
const passport = require("passport");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: "\x02\xf3\xf7r\t\x9f\xee\xbbu\xb1\xe1\x90\xfe'\xab\xa6L6\xdd\x8d[\xccO\xfe",
  resave: false,
  saveUninitialized: true
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

//================== FOR UPLOADING IMAGE PURPOSES ==================

const storage = multer.diskStorage({
  destination: "./../frontend/src/images/uploads/",
  filename: function(req, file, cb){
     cb(null,"IMAGE-" + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('file');

app.patch('/users/edit/:userID', (req, res) => {
  console.log(req.body);
  const user_id = req.body.user_id;
  const text = 'UPDATE users SET (username, email, first_name, last_name, user_img) = ($1, $2, $3, $4, $5) WHERE user_id=($6)'
  const values = [req.body.username, req.body.email, req.body.first_name, req.body.last_name, "IMAGE-" + req.body.imageInput, req.body.user_id];

  db.query(text, values)
       .then(() => {
        console.log("success!");
        // success;
      })
      .catch(error => {
        console.log(error);
});
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});

// =================================================================

app.get('/isloggedin', function(req, res) {
    if(req.session.passport.user) {
      res.status(200).send('loggedIn');
    } else {
      res.status(401).send('User not logged in.');
    }
});

app.use('/', index);
app.use('/users', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../frontend/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
