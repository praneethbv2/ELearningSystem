const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// User Schema
var UserSchema = new Schema({
	username: {
		type: String
	},
	email: {
		type: String
	},
	password:{
		type:String,
		bcrypt: true
	},
	type:{
		type:String
	}
	
});

module.exports = mongoose.model('User', UserSchema);
