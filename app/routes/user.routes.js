module.exports = (app) => {
	const users = require('../controllers/user.controller.js');
	let middleware = require('../../middleware.js');

	// Create a new User
	app.post('/users', users.create);

	// Authenticate a User
	app.post('/users/auth', users.authenticate);

	// Retrieve all users
	app.get('/users', middleware.checkToken, users.findAll);

	// Retrieve a single User with userId
	//app.get('/users/exists', users.exists);

	// Retrieve a single User with userId
	app.get('/users/exists/email/:email', users.exists);
	app.get('/users/exists/username/:username', users.exists);

	// Retrieve a single User with userId
	app.get('/users/:userId', middleware.checkToken, users.findOne);

	// Update a User with userId
	app.put('/users/:userId', middleware.checkToken, users.update);

	// Delete a User with userId
	app.delete('/users/:userId', middleware.checkToken, users.delete);

	// Register a new User
	app.post('/users/register', users.create);
};
