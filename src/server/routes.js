var todosRoutes = require('./todos/routes');
var listsRoutes = require('./lists/routes');

module.exports = function routes(app) {
	app.use('/todos', todosRoutes);
	app.use('/lists', listsRoutes);
};
