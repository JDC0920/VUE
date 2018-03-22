var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session')

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//设置session，存储时间
app.use(session({
    resave:false,//添加这行
    saveUninitialized: true,
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//登录拦截
app.use(function (req,res,next) {
    if(req.session.userId){
        next();
    }else{
        if(req.originalUrl=='/users/reg' || req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.originalUrl.indexOf('/goods/list')>-1){
            next();
        }else{
            res.json({
                status:'10001',
                msg:'当前未登录',
                result:''
            });
        }
    }
});
app.use(cors());
app.use('/', index);
app.use('/users', users);
app.use('/goods',goods);


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
app.listen(4000,function () {
    console.log('ok....')
});

module.exports = app;
