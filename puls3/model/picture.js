// Sample mongoose Schema (Person class)

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var pictureSchema = new Schema({
	title: String,
	image: String,
	author: String,
	votes: String
});

// Export the Schema

module.exports = mongoose.model('Picture', pictureSchema );
