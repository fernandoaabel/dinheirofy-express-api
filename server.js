const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

// Enable Cors
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('../dinheirofy-express-api/config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true
	})
	.then(() => {
		console.log('Successfully connected to the database');
	})
	.catch((err) => {
		console.log('Could not connect to the database. Exiting now...', err);
		process.exit();
	});

// define a simple route
app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to dinheirofy-express-api.'
	});
});

// Require Users routes
require('../dinheirofy-express-api/app/routes/user.routes.js')(app);
require('../dinheirofy-express-api/app/routes/wallet.routes.js')(app);

// listen for requests
app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
