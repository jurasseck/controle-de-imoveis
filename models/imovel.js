var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imovelSchema = new Schema({
	title: String,
	description: String,
	address:{
		street: String,
		number: String,
		neighborhood: String,
		city: String,
		latitude: String,
		longitude: String
	},
	tags:[
		{type: String}
	],
	price: Number,
	created_at: {
		type: Date,
		default: Date.now
	},
	created_by: String,
	status: Boolean
});

module.exports = mongoose.model('Imovel', imovelSchema, 'imoveis');