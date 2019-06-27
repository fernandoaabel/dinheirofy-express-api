const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
	{
		name: String,
		email: String,
		password: String,
		image_url: String,
		created_at: String,
		updated_at: String
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
