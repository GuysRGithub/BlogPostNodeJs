const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 10
const moment = require("moment")
const secretKey = require("../config/config").key

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50,
        minlength: 3
    },
    firstname: {
        type: String,
        maxlength: 50,
        minlength: 3
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: String,
    tokenExp: Number
})

userSchema.pre("save", function (next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err)
                user.password = hash;
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    let user = this;
    let token = jwt.sign(user._id.toHexString(), secretKey)
    user.tokenExp = moment().add(1, 'hour').valueOf();
    user.token = token

    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.methods.findByToken = function (token, cb) {
    let user = this;

    jwt.verify(token, secretKey, function (err, decode) {
        user.findOne({_id: decode, token: token}, function (err, user) {
            if (err) return cb(err)
            cb(null, user)
        })
    })
}

const AuthorUser = mongoose.model("Author", userSchema)

module.exports = AuthorUser