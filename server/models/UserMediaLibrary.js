const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const moment = require("moment")

const mediaSchema = mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        maxlength: 50,
        ref: "Author"
    },

    images: {
        type: Array
    },

    videos: {
        type: Array
    }
}, {timestamp: true})

const UserMediaLibrary = mongoose.model("UserMediaLibrary", mediaSchema)

module.exports = UserMediaLibrary