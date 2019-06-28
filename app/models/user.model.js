const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - username
 *       - email
 *       - password
 *     properties:
 *       name:
 *         type: string
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       image_url:
 *         type: string
 */
const UserSchema = mongoose.Schema(
	{
		name: String,
		email: String,
		username: String,
		password: String,
		image_url: String
	},
	{
		timestamps: true
	}
);

UserSchema.methods.toJSON = function() {
	var obj = this.toObject();
	delete obj.password;
	return obj;
};

module.exports = mongoose.model('User', UserSchema);
