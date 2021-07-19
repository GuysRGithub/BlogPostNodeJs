// noinspection JSUnresolvedVariable

const express = require('express');
const AuthorUser = require("../models/AuthorUser");
const Profile = require("../models/Profile");
const router = express.Router();
const UserMediaLibrary = require("../models/UserMediaLibrary");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js")
const auth = require("../middleware/auth");

router.patch("/update", auth, (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, config.jwtSecretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Something went wrong or you are not authorized to do this action",
                });
            } else {
                const {_id} = decoded;
                const {name, email, newPassword, oldPassword} = req.body;
                // check if user exit
                AuthorUser.findById({
                    _id,
                }).exec((err, user) => {
                    if (err || !user) {
                        return res.status(401).json({
                            error: "User with that email does not exits. Please sign up.",
                        });
                    }
                    /*      //////////////////////          CHECK PASSWORD             ///////////////////////     */
                    if (!user.authenticate(oldPassword)) {
                        return res.status(401).json({
                            error: "Not authorized.",
                        });
                    }

                    if (newPassword) {
                        user.password = newPassword;
                    }

                    if (email) {
                        user.email = email;
                    }

                    if (name) {
                        user.name = name;
                    }

                    /*      //////////////////////          UPDATE USER             ///////////////////////     */
                    user.save((err, _) => {
                        if (err) {
                            return res.json({message: "Failed to update user. Please try again."})
                        }
                        /*      //////////////////////          RESPONSE             ///////////////////////     */
                        const token = jwt.sign(
                            {
                                _id: _id,
                                email: email,
                                name: name,
                            },
                            config.jwtSecretKey,
                            {
                                expiresIn: "7d",
                            }
                        );
                        return res.json({
                            message: "Update user successful",
                            token,
                            user: {
                                _id,
                                name,
                                email,
                            },
                        });
                    })
                });
            }
        });
    } else {
        return res.status(401).json({
            message: "You are not authorized.",
        });
    }


});
/* GET users listing. */
router.post('/auth', auth, function (req, res) {
    res.status(200).json({
        _id: req.user._id,
        isAuthenticated: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        // role: req.user.role,
        // image: req.use.image,
        // history: req.user.history
    })
});

router.post('/logout', auth, (req, res) => {
    AuthorUser.findOneAndUpdate({_id: req.user._id},
        {token: "", tokenExp: ""},
        (err) => {
            if (err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})

router.post('/getProfile', auth, (req, res) => {
    Profile.findOne({author_id: req.user_id})
        .exec((err, doc) => {
            if (err) return res.json({success: false, err})
            return res.status(200).json({
                success: true,
                doc: doc
            })
        })
})

router.get('/getMediaLibrary', auth, async (req, res) => {
    const {token} = req.cookies;
    let user = null;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Something went wrong when verify token, may be need to login",
                });
            } else {
                const {_id} = decoded;
                user = await AuthorUser.findById(_id).exec()
                if (user == null) return
                // noinspection JSIgnoredPromiseFromCall
                await UserMediaLibrary.findOne({"author": user._id})
                    .populate("Author")
                    .exec((err, doc) => {
                        if (err) return res.status(400).json({success: false, err})
                        return res.status(200).json({success: true, doc: doc})
                    })
            }
        });
    } else {
        return res.json({
            message: "error happening please try again",
        });
    }

})

module.exports = router;
