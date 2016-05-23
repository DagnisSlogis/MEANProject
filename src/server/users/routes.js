var mongoose = require('mongoose');
var Todo = require('../db/db').User;
var express = require('express');
var router =  express.Router();

router.get('/', function(req, res) {
	res.send('Testing this');
});

router.post('register', function(req, res) {
	if (req.body.password1 === req.body.password2) {
		var user = new User(req.body);
		user.save(function(err) {
			if (err) { console.log(err); }
			res.send('User saved');
		});
	} else {
		res.send("Passwords didn't match");
	}
});

module.exports = router;