var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var mongoose = require('mongoose');
var MongoStore = null;

var app = express();

// Model Files
var modelsPath = path.join(__dirname, './models');
fs.readdirSync(modelsPath).forEach(function (file) {
    if (/(.*)\.(js$|coffee$)/.test(file)) {
        require(modelsPath + '/' + file);
    }
});

// Route Files
var routes = require('./routes/index');
var users = require('./routes/users');
//var choices = require('./routes/choices');

// Database Setup
var dbUri = 'mongodb://localhost:27017/choicedb';
var dbOptions = { username: '', password: '' };
mongoose.connect(dbUri, dbOptions);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
if (app.get('env') === 'production') {
    MongoStore = require('connect-mongo')(session);
    app.use(session({
        secret: 'choice-session',
        store: new MongoStore({ url: dbUri }),
        resave: false,
        saveUninitialized: true
    }));
} else {
    app.use(session({
        secret: 'choice-session',
        resave: false,
        saveUninitialized: true
    }));
}

app.use('/', routes);
app.use('/ajax/user', users);
//app.use('/ajax/choice', choices);

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
