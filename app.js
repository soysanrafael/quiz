var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
//Los nombres de los parámetros del formulario para crear pregunta
//    name="quiz[pregunta]"
//    name="quiz[respuesta]"
//usan notacion pseudo JSON que permite indicar que son propiedades de un objeto
//quiz. El middleware bodyparser.urlencode(...) los analiza correctamente y genera
//el objeto req.body.quiz, si quitamos el parámetro de configuración {extended: false}
//que express-generator incluyó cuando generó el proyecto.
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
  //guardar path en session.redir para despues de loginRequired
  if (!req.path.match(/\/login|\/logout|\/user/)){
    req.session.redir = req.path;
  }
  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
})

//Autologout
app.use(function(req, res, next) {
  if(req.session.user && req.session.lastVisit) {
    if((new Date().getTime() - req.session.lastVisit) > 1000 * 60 * 2) {
      delete req.session.user;
    }
  }
  req.session.lastVisit = new Date().getTime();
  next();
});

app.use('/', routes);

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
