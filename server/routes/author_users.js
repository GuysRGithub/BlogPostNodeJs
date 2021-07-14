// noinspection JSUnresolvedVariable

const express = require('express');
const AuthorUser = require("../models/AuthorUser");
const Profile = require("../models/Profile");
const router = express.Router();
const UserMediaLibrary = require("../models/UserMediaLibrary");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");

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
