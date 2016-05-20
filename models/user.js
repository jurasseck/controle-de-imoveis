var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	access: {
		username: String,
		password: String,
		admin: Boolean
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', userSchema, 'usuarios');