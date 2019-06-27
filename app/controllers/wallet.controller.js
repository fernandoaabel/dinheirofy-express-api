const Wallet = require('../models/Wallet.model.js');

// Create and Save a new Wallet
exports.create = (req, res) => {
	// Validate request
	if (!req.body.wallet.title) {
		return res.status(400).send({
			message: 'Wallet info can not be empty'
		});
	}

	// Create a Wallet
	const newWallet = new Wallet({
		title: req.body.wallet.title,
		description: req.body.wallet.description,
		user: req.body.wallet.user._id
	});

	// Save Wallet in the database
	newWallet
		.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Wallet.'
			});
		});
};

// Retrieve and return all Wallets from the database.
exports.findAll = (req, res) => {
	Wallet.find()
		.populate('user')
		.then((wallets) => {
			res.send(wallets);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving wallets.'
			});
		});
};

exports.findByUser = (req, res) => {
	Wallet.find({ user: req.params.userId })
		.populate('user')
		.then((wallets) => {
			if (!wallets) {
				return res.status(404).send({ message: 'Wallet not found with Userid ' + req.params.userId });
			}
			res.send(wallets);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({ message: 'Wallet not found with id ' + req.params.userId });
			}
			return res.status(500).send({ message: 'Error retrieving Wallet with id ' + req.params.userId });
		});
};

// Find a single Wallet with a WalletId
exports.findOne = (req, res) => {
	Wallet.findById(req.params.walletId)
		.populate('user')
		.then((wallet) => {
			if (!wallet) {
				return res.status(404).send({ message: 'Wallet not found with id ' + req.params.walletId });
			}
			res.send(wallet);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({ message: 'Wallet not found with id ' + req.params.walletId });
			}
			return res.status(500).send({ message: 'Error retrieving Wallet with id ' + req.params.walletId });
		});
};

// Update a Wallet identified by the WalletId in the request
exports.update = (req, res) => {
	console.log(req.params.walletId);
	console.log(req.body);

	// Validate Request
	if (!req.body.wallet.title) {
		return res.status(400).send({
			message: 'Wallet content can not be empty'
		});
	}

	// Find note and update it with the request body
	Wallet.findByIdAndUpdate(req.params.walletId, {
		title: req.body.wallet.title,
		description: req.body.wallet.description
	})
		.then((wallet) => {
			if (!wallet) return res.status(404).send({ message: 'Wallet not found with id ' + req.params.walletId });
			res.send(wallet);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId')
				return res.status(404).send({ message: 'Wallet not found with id ' + req.params.walletId });
			return res.status(500).send({ message: 'Error updating Wallet with id ' + req.params.walletId });
		});
};

// Delete a Wallet with the specified WalletId in the request
exports.delete = (req, res) => {
	Wallet.findByIdAndRemove(req.params.walletId)
		.then((wallet) => {
			if (!wallet) {
				return res.status(404).send({ message: 'Wallet not found with id ' + req.params.walletId });
			}
			res.send({ message: 'Wallet deleted successfully!' });
		})
		.catch((err) => {
			if (err.kind === 'ObjectId' || err.title === 'NotFound') {
				return res.status(404).send({ message: 'Wallet not found with id ' + req.params.walletId });
			}
			return res.status(500).send({ message: 'Could not delete Wallet with id ' + req.params.walletId });
		});
};
