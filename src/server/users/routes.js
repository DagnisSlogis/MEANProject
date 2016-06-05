var mongoose = require('mongoose');
var User = require('../db/db').User;
var express = require('express');
var router =  express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use( new LocalStrategy (
	function(email, password, done) {
		User.getUserByEmail(email, function(err, user) {
			if(err) throw err;
			if(!user) {
				console.log("No user found");
				return done(null, false);
			}
			User.comparePassword(password, user.password, function(err, isMatch) {
				if(err) throw err;
				if(isMatch) {
					return done(null, user);
				}
				else {
					console.log("Invalid password");
					return done(null, false);
				}
			});
		});
	}
));

router.get('/', function(req, res) {
	res.send('Testing this');
});

router.post('/register', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, user) {
		if (err) { console.log(err); }
	});
});

function herna(email) {
	User.getUserByEmail(email, function(err, user) {
		console.log("it up");
	});
}

router.post('/login', function(req, res) {
	herna(req.body.email)
	// res.json(req.user);
});


router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;
