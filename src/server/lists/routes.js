var mongoose = require('mongoose');
var List = require('../db/db').List
var express = require('express');
var router =  express.Router();

router.get('/', function(req, res, next) {
	List.find().populate('todos').exec(function(err, results) {
		if (err) { console.log(err); }
		console.log(results);
		res.send({ lists: results })
	});
});

router.post('/', function(req, res) {
	var list = new List(req.body);
	list.save(function(err) {
		if (err) { console.log(err); }
		res.send('List saved');
	});
});

// Deleting List
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  List.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
    if (err) { console.log(err); }
    res.send('List deleted');
  });
});

module.exports = router;
