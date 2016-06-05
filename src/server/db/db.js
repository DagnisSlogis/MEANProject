var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// HANDLES Connection with DB
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

// CREATING SCHEMES
var listSchema = new Schema({
  name: String,
  isArchived: Boolean,
  todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}],
  dateCreated: Date
});
var List = mongoose.model('List', listSchema);

var todoSchema = new Schema({
    task: String,
    isCompleted: Boolean,
    isEditing: Boolean,
    list: {type: mongoose.Schema.Types.ObjectId, ref: 'List'},
    dateCreated: Date
});
var Todo = mongoose.model('Todo', todoSchema);

module.exports.Todo = Todo;
module.exports.List = List;
