var mongoose = require('mongoose');
var Todo = require('../db/db').Todo;
var List = require('../db/db').List;
var express = require('express');
var router =  express.Router();

router.get('/', function(req, res, next) {
	Todo.find(function(err, results) {
		if (err) { console.log(err); }
		res.send({ todos: results })
	});
});

router.post('/', function(req, res) {
	var todo = new Todo(req.body);
	todo.save(function(err) {
		if (err) { console.error(err); }
		List.update({ _id: req.body.list._id }, {
			$push: { todos: todo }
		}, function(err) {
			if(err) { console.error(err);}
		});
		res.send('Todo saved');
	});
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
  Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
    $set: { task: req.body.task }
  }, function(err) {
    if (err) { console.log(err); }
    res.send('ToDo updated');
  });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
    if (err) { console.log(err); }
    res.send('ToDo deleted');
  });
});

module.exports = router;
