const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Student Schema
var StudentSchema = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	address: [{
		street_address:{type: String},
		city:{type: String},
		state:{type: String},
		zip:{type: String}
	}],
	username: {
		type: String
	},
	email: {
		type: String
	},
	classes:[{
		class_id:{type: [mongoose.Schema.Types.ObjectId]},
		class_title: {type:String}
	}]
	
});

module.exports = mongoose.model('Student', StudentSchema);
