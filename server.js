var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer = require('multer');
var flash = require('connect-flash');
var routes = require('./src/server/routes');

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


routes(app);

app.all('/*', function( req, res ) {
  res.send('\
	  	<!DOCTYPE html>\
	  	<html>\
	  		<head>\
	  			<title>MEAN</title>\
	  			<base href="/">\
	  		</head>\
	  		<body>\
	  			<div ui-view></div>\
	  			<script src="bundle.js"></script>\
	  		</body>\
	  	</html>\
  	');
});

app.listen(PORT, function() {
  console.log('Server is running on ' + PORT);
})
