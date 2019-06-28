module.exports = (app) => {
	const users = require('../controllers/user.controller.js');
	let middleware = require('../../middleware.js');

	/**
	 * @swagger
	 * tags:
	 *   - name: Users
	 *     description: User management, authentication and authorization
	 *   - name: Wallets
	 *     description: Wallets management
	 */

	/**
	 * @swagger
	 *
	 * /users/:
	 *   get:
	 *     description: Get all Users
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: login
	 */
	app.get('/users', middleware.checkToken, users.findAll);

	/**
	 * @swagger
	 *
	 * /users/exists/email/{email}:
	 *   get:
	 *     description: Check if exists an User with the {email}
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: login
	 */
	app.get('/users/exists/email/:email', users.exists);

	/**
	 * @swagger
	 *
	 * /users/exists/username/{username}:
	 *   get:
	 *     description: Check if exists an User with the {username}
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: login
	 */
	app.get('/users/exists/username/:username', users.exists);

	/**
	 * @swagger
	 *
	 * /users/{userId}:
	 *   get:
	 *     description: Retrieve a single User with {userId}
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: login
	 */
	app.get('/users/:userId', middleware.checkToken, users.findOne);

	/**
	 * @swagger
	 * /users:
	 *   post:
	 *     description: Creates a new user
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: email
	 *         description: User's email.
	 *         required: true
	 *         type: string
	 *       - name: password
	 *         description: User's password (already encrypted).
	 *         required: true
	 *         type: string
	 *       - name: username
	 *         description: User's username.
	 *         required: true
	 *         type: string
	 *       - name: name
	 *         description: User's name.
	 *         required: false
	 *         in: formData
	 *         type: string
	 *     responses:
	 *       200:
	 *         description: This should create a new user
	 *
	 */
	app.post('/users', users.create);

	/**
	 * @swagger
	 *
	 * /users/auth:
	 *   post:
	 *     description: Authenticate the User to the application
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: username
	 *         description: Username to use for login.
	 *         in: formData
	 *         required: true
	 *         type: string
	 *       - name: password
	 *         description: User's password.
	 *         in: formData
	 *         required: true
	 *         type: string
	 *     responses:
	 *       200:
	 *         description: login
	 */
	app.post('/users/auth', users.authenticate);

	/**
	 * @swagger
	 * /users/register/:
	 *   post:
	 *     description: Register a new user
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     parameters:
	 *       - name: email
	 *         description: User's email.
	 *         required: true
	 *         type: string
	 *       - name: password
	 *         description: User's password (already encrypted).
	 *         required: true
	 *         type: string
	 *       - name: username
	 *         description: User's username.
	 *         required: true
	 *         type: string
	 *       - name: name
	 *         description: User's name.
	 *         required: false
	 *         in: formData
	 *         type: string
	 *     responses:
	 *       200:
	 *         description: This should create a new user
	 *
	 */
	app.post('/users/register', users.create);
	/**
	 * @swagger
	 *
	 * /users/{userId}:
	 *   put:
	 *     description: Update User with {userId}
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: login
	 */
	app.put('/users/:userId', middleware.checkToken, users.update);

	/**
	 * @swagger
	 *
	 * /users/{userId}:
	 *   delete:
	 *     description: Delete User with userId
	 *     tags: [Users]
	 *     produces:
	 *       - application/json
	 *     responses:
	 *       200:
	 *         description: login
	 */
	app.delete('/users/:userId', middleware.checkToken, users.delete);
};
