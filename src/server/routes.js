var todosRoutes = require('./todos/routes');
var usersRoutes = require('./users/routes');
var passport = require('passport');

module.exports = function routes(app) {
	app.use('/todos', isAutheticated, todosRoutes);
	app.use('/users', usersRoutes);
};

function isAutheticated(req, res, next) {
	console.log(req.user);
	if(req.user) {
		return next();
	}
	res.sendStatus(401);
}
