const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const moment = require("moment")

const postSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        maxlength: 50,
        ref: "Author"
    },
    category: {
        type: String,
        maxlength: 50
    },
    content: String,
}, {timestamp: true})

const Post = mongoose.model("Post", postSchema)

module.exports = Post