const express = require("express")
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const AuthorUser = require("../models/AuthorUser");
const router = express.Router()
router.post("/savePost", (req, res) => {
    let user = null;
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Something went wrong when verify token, may be need to login",
                });
            } else {
                const {_id} = jwt.decode(token);
                user = await AuthorUser.findById(_id).exec()
                if (user == null) return
                let post = new Post({
                    title: req.body.title,
                    content: req.body.content,
                    author: user._id
                })

                // noinspection JSIgnoredPromiseFromCall
                await post.save((err, doc) => {
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

router.post("/getPost", (req, res) => {
    console.log("Server Get ShowPost", req.body)
    // noinspection JSIgnoredPromiseFromCall
    Post.findById(req.body.postId)
        .populate("Author")
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            console.log("Post: ", doc)
            return res.status(200).json({success: true, doc: doc})
        })
})

router.get("/getAllPosts", (req, res) => {
    Post.find()
        .populate("Author")
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, doc: doc})
        })
})

module.exports = router