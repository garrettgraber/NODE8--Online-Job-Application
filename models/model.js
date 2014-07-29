
var mongoose = require('mongoose');

var workerSchema = mongoose.Schema({

	name: String,
	bio: String,
	skills: String,
	years: String,
	why: String
});

var Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;