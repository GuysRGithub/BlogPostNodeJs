// noinspection JSUnresolvedVariable

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const moment = require("moment")

const bcrypt = require("bcrypt")
const saltRounds = 10
const secretKey = process.env.JWT_SECRET
const crypto = require("crypto");

// noinspection JSValidateTypes
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
    hashed_password: {
        type: String,
        trim: true,
        required: true,
    },
    salt: String,
    resetPasswordLink: {
        type: String,
        default: "",
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

userSchema.statics.findByToken = function (token, cb) {
    let user = this;

    jwt.verify(token, secretKey, function (err, decode) {
        user.findOne({_id: decode, token: token}, function (err, user) {
            if (err) return cb(err)
            cb(null, user)
        })
    })
}


/**/
userSchema
    .virtual("password")
    .set(function (password) {
        // Use normal, not arrow function to access this
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema.methods = {
    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + "";
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto
                .createHash("sha1", this.salt)
                .update(password)
                .digest("hex");
        } catch (err) {
            return "";
        }
    },

    authenticate: function (plainPassword) {
        return this.encryptPassword(plainPassword) === this.hashed_password;
    },
};

const AuthorUser = mongoose.model("Author", userSchema)

module.exports = AuthorUser