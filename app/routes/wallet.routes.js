module.exports = (app) => {
	const wallets = require('../controllers/wallet.controller.js');
	let middleware = require('../../middleware.js');

	// Create a new user
	app.post('/wallets', middleware.checkToken, wallets.create);

	// Retrieve all wallets
	app.get('/wallets', middleware.checkToken, wallets.findAll);

	// Retrieve wallets from userId
	app.get('/wallets?userId=:userId', middleware.checkToken, wallets.findByUser);

	// Retrieve a single Wallet with walletId
	app.get('/wallets/:walletId', middleware.checkToken, wallets.findOne);

	// Update a Wallet with walletId
	app.put('/wallets/:walletId', middleware.checkToken, wallets.update);

	// Delete a Wallet with walletId
	app.delete('/wallets/:walletId', middleware.checkToken, wallets.delete);
};
