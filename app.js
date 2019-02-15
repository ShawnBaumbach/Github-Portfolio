var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const app = express();

// Bypass CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
var indexRouter = require('./routes/index');
var formsRouter = require('./routes/forms');
var catRouter = require('./routes/cat');
var contactRouter = require('./routes/Contact');
var projectRouter = require('./routes/Projects');
var testRouter = require('./routes/test');

app.use('/', indexRouter);
app.use('/forms', formsRouter);
app.use('/cats', catRouter);
app.use('/Contact', contactRouter);
app.use('/Projects', projectRouter);
app.use('/test', testRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.message)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
