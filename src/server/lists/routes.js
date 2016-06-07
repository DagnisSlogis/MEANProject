var mongoose = require('mongoose');
var List = require('../db/db').List
var express = require('express');
var router =  express.Router();

// Gets all the lists and builds the JSON document
router.get('/', function(req, res, next) {
	List.find().populate('todos').exec(function(err, results) {
		if (err) { console.error(err); }
		res.send({ lists: results })
	});
});

// Saves a list
router.post('/', function(req, res) {
	var list = new List(req.body);
	list.save(function(err) {
		if (err) { console.error(err); }
		res.send('List saved');
	});
});

// Updates a list
router.put('/:id', function(req, res) {
  var id = req.params.id;
  List.update({ _id: mongoose.Types.ObjectId(id) }, {
    $set: {
			name: req.body.name,
			listColor: req.body.listColor
		}
  }, function(err) {
    if (err) { console.error(err); }
    res.send('List updated');
  });
});

// Deletes a lsit
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  List.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
    if (err) { console.error(err); }
    res.send('List deleted');
  });
});

module.exports = router;
