var mongoose = require('mongoose');
var Todo = require('../db/db').Todo;
var List = require('../db/db').List;
var express = require('express');
var router =  express.Router();

// Gets all ToDos from DB
router.get('/', function(req, res, next) {
	Todo.find(function(err, results) {
		if (err) { console.error(err); }
		res.send({ todos: results })
	});
});

// Saves ToDo in DB
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

// Updates ToDo
router.put('/:id', function(req, res) {
  var id = req.params.id;
  Todo.update({ _id: mongoose.Types.ObjectId(id) }, {
    $set: {
			task: req.body.task,
			todoColor: req.body.todoColor
		}
  }, function(err) {
    if (err) { console.error(err); }
    res.send('ToDo updated');
  });
});

// Archives ToDo or reversed
router.put('/archive/:id', function(req, res) {
	var id = req.params.id;
	Todo.update({ _id: mongoose.Types.ObjectId(id)}, {
		$set: {
			isCompleted: req.body.isCompleted
		}
	}, function(err) {
		if (err) { console.error(err); }
		res.send('Todo is Completed')
	})
});

// Deletes ToDo
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Todo.remove({ _id: mongoose.Types.ObjectId(id) }, function(err) {
    if (err) { console.error(err); }
    res.send('ToDo deleted');
  });
});

module.exports = router;
