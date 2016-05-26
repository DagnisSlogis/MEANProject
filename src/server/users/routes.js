var mongoose = require('mongoose');
var User = require('../db/db').User;
var express = require('express');
var router =  express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
	res.send('Testing this');
});

router.post('/register', function(req, res) {
	var user = new User(req.body);
	user.save(function(err, user) {
		if (err) { console.log(err); }
		passport.authenticate('local')(req, res, function () {
			res.redirect('/');
		});
	});
});

router.post('/register', function(req, res) {
  User.register(new User({ email: req.body.email }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = router;
