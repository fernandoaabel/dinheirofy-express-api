const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../../config/config');

// Create and Save a new user
exports.create = (req, res) => {
	let user = req.body;

	console.log('User being created', user);

	// Validate request
	if (!(user.email && user.password && user.username)) {
		return res.status(400).send({
			message: 'User info can not be empty.'
		});
	}

	// Check if email is already being used
	User.findOne({ email: user.email }).then((user) => {
		console.log('user found', user);
		if (user) {
			return res.status(404).send({ message: 'Email already exists' });
		}
	});

	// Create a User
	const newUser = new User({
		name: user.name,
		username: user.username,
		email: user.email,
		password: user.password
	});

	// Save User in the database
	newUser
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the User.'
			});
		});
};

exports.authenticate = (req, res) => {
	// Validate request
	if (!(req.body.email && req.body.password)) {
		return res.status(401).send({
			message: 'User info can not be empty'
		});
	}

	// Check if email is already being used
	User.findOne({ email: req.body.email, password: req.body.password }).then((user) => {
		if (user) {
			user.password = undefined;
			let token = jwt.sign({ user: user }, config.secret, {
				expiresIn: '24h' // expires in 24 hours
			});

			// return the JWT token for the future API calls
			res.send({
				success: true,
				message: 'Authentication successful',
				accessToken: token
			});
			return;
		} else {
			return res.status(403).send({
				success: false,
				message: 'Incorrect username or password'
			});
		}
	});
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
	User.find()
		.then((users) => res.send(users))
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving users.'
			});
		});
};

// Find a single user with a userId
exports.findOne = (req, res) => {
	User.findById(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: 'User not found with id ' + req.params.userId });
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({ message: 'User not found with id ' + req.params.userId });
			}
			return res.status(500).send({ message: 'Error retrieving user with id ' + req.params.userId });
		});
};

// Find a single user with a userId
exports.exists = (req, res) => {
	if (req.params.email) {
		User.findOne({ email: req.params.email })
			.then((user) => {
				if (!user) return res.send(false);
				return res.send(true);
			})
			.catch(() => {
				return res.status(404).send({ message: 'User not found with email: ' + req.params.email });
			});
	} else if (req.params.username) {
		User.findOne({ username: req.params.username })
			.then((user) => {
				if (!user) return res.send(false);
				return res.send(true);
			})
			.catch(() => {
				return res.status(404).send({ message: 'User not found with username: ' + req.params.username });
			});
	}
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
	let user = req.body.user;
	if (!user) return res.status(404).send({ message: 'User not sent' });

	// Validate Request
	if (!user.email || !user.username) {
		return res.status(400).send({
			message: 'Email and Username should be filled.'
		});
	}

	// Find note and update it with the request body
	User.findByIdAndUpdate(
		req.params.userId,
		{
			name: user.name,
			username: user.username,
			email: user.email,
			//password: user.password,
			image_url: user.image_url
		},
		{ new: true }
	)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: 'User not found with id ' + req.params.userId });
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId')
				return res.status(404).send({ message: 'User not found with id ' + req.params.userId });
			return res.status(500).send({ message: 'Error updating user with id ' + req.params.userId });
		});
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
	User.findByIdAndRemove(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: 'User not found with id ' + req.params.userId });
			}
			res.send({ message: 'User deleted successfully!' });
		})
		.catch((err) => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({ message: 'User not found with id ' + req.params.userId });
			}
			return res.status(500).send({ message: 'Could not delete user with id ' + req.params.userId });
		});
};
