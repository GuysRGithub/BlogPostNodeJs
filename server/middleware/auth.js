const AuthorUser = require("../models/AuthorUser")
const jwt = require("jsonwebtoken");
const config = require("../config/config")

let auth = (req, res, next) => {
    if (!req.cookies) {
        return res.json({
            isAuthenticated: false,
            error: true
        })
    }
    const {token} = req.cookies;
    if (!token) {
        return res.json({
            isAuthenticated: false,
            error: true
        })
    }

    jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
        if (err || decoded == null) return
        const {_id} = decoded;
        AuthorUser.findById(_id, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.json({
                    isAuthenticated: false,
                    error: true
                })
            }

            req.token = token
            req.user = user
            next()
        })
    })

}

module.exports = auth