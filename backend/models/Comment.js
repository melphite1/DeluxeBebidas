const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
	comment: {
		type: String,
		require: true,
		trim: true,
	},
	productId: {
		type: mongoose.Schema.ObjectId,
		ref: "product",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
	rate: {
		type: Number
	}
},{timestamps:true})
const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment
