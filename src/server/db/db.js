var mongoose = require( 'mongoose' );

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + 'mongodb://127.0.0.1:27017/sms-dev');
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

var Todo = mongoose.model('Todo', {
	task: String,
	isCompleted: Boolean,
	isEditing: Boolean
});

var User = mongoose.model('User', {
	email: String,
	password: String
});

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  callback(null, isMatch);
}

module.exports.getUserByEmail = function(email, callback) {
  console.log("hehehehehe");
  var query = {email: email};
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.Todo =  Todo;
module.exports.User =  User;
