const {isAuth} = require("../helpers/auth");

const express = require('express');
const User = require("../models/AuthorUser");
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const router = express.Router();

/* GET users listing. */
router.post('/auth', auth, function (req, res) {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.robustness !== 0,
        isAuthenticated: true,
        email: req.user.email,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.use.image,
        history: req.user.history
    })
});

/*
    Register new user with a default profile
*/
// router.post("/register", (req, res) => {
//     const user = new User(req.body)
//     const profile = new Profile({
//         author: user._id
//     });
//     // noinspection JSIgnoredPromiseFromCall
//     user.save((err, doc) => {
//         if (err) return res.json({success: false, err})
//         // noinspection JSIgnoredPromiseFromCall
//         profile.save((err, _) => {
//             if (err) return res.json({success: false, err})
//             return res.status(200).json({success: true, doc: doc})
//         })
//     })
// })
//
// router.post("/login", (req, res) => {
//     User.findOne({email: req.body.email}, (err, user) => {
//         if (err) return res.status(400).json({success: false})
//         if (!user) return res.json({
//             loginSuccess: false,
//             message: "Email not found!"
//         })
//
//         user.comparePassword(req.body.password, (err, isMatch) => {
//             if (!isMatch) {
//                 return res.json({loginSuccess: false, message: "Authenticate failed"})
//             }
//
//             user.generateToken((err, user) => {
//                 if (err) return res.status(400).json({err})
//                 res.cookie("w_authExp", user.tokenExp)
//                 res.cookie("w_auth", user.token).status(200).json({
//                     loginSuccess: true,
//                     userId: user._id
//                 })
//             })
//         })
//     })
// })

// noinspection JSCheckFunctionSignatures
router.post('/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},
        {token: "", tokenExp: ""},
        (err, doc) => {
            if (err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})


router.post('/getProfile', auth, (req, res) => {
    console.log("Get Profile")
    Profile.findOne({author_id: req.user_id})
        .exec((err, doc) => {
            if (err) return res.json({success: false, err})
            return res.status(200).json({
                success: true,
                doc: doc
            })
        })
})

module.exports = router;
