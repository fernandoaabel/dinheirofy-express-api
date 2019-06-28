const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * definitions:
 *   Wallet:
 *     required:
 *       - title
 *       - user
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       user:
 *         $ref: '#/definitions/User'
 */
const WalletSchema = mongoose.Schema(
	{
		title: String,
		description: String,
		user: { type: Schema.ObjectId, ref: 'User', required: true }
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Wallet', WalletSchema);
