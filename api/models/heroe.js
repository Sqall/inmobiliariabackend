const mongoose = require('mongoose');

const heroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type: String, required: true},
	location:String,
	needs:[String]
});

module.exports = mongoose.model('Hero',heroSchema);