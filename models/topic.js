var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/topic')

var Schema = mongoose.Schema

var topicSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	article: {
		type: String,
		required: true
	},
	wrote_time: {
		type: Date,
		default: Date.now
	},
	userID: {
		type: String
	}
})

module.exports = mongoose.model('Topic', topicSchema)