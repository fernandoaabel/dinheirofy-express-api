const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = mongoose.Schema(
	{
		title: String,
		description: String,
		user: { type: Schema.ObjectId, ref: 'User', required: true },
		created_at: String,
		updated_at: String
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Wallet', WalletSchema);
