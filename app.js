var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/*
* Used for input method spoofing
*/
var methodOverride = require('method-override');
/*
* Use mongoDB with mongoose
*/
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/nodewebappdb');
/*
* Import db files and the models
*/
var db = require('./models/db');
var fill = require('./models/fills');

var routes = require('./routes/index');
var users = require('./routes/users');
/*
* Add the route for the fill ups
*/
var fills = require('./routes/fills');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
* Define some middleware to handle RESTful style calls
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function(req, res) {
      if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}));

app.use('/', routes);
app.use('/users', users);
/*
* A route for the fill up section
*/
app.use('/fills', fills);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
