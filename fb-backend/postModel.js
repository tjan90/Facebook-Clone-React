const mongoose = require('mongoose')

const postModel = mongoose.Schema({
    user: String,
    imgName: String,
    text: String,
    avatar: String,
    timestamp: String
});

db = mongoose.model('posts', postModel)
module.exports = db