var todosRoutes = require('./todos/routes');
var usersRoutes = require('./users/routes');

module.exports = function routes(app) {
	app.use('/todos', auth, todosRoutes);
	app.use('/users', usersRoutes);
};

var auth = function(req, res, next) {
  if (!req.isAuthenticated()) {
		console.log("Not authent");
    res.sendStatus(401);
	}
  else
    next();
};
