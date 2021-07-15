const express = require("express")
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const AuthorUser = require("../models/AuthorUser");
const router = express.Router()
const jwt_secret_key = process.env.JWT_SECRET
router.post("/savePost", (req, res) => {
    let user = null;
    const {token} = req.cookies;
    const blogId = req.body.blogId
    if (token) {
        jwt.verify(token, jwt_secret_key, async (err) => {
            if (err) {
                return res.status(401).json({
                    error: "Something went wrong when verify token, may be need to login",
                });
            } else {
                ////////////////////////////////          UPDATE BLOG       ////////////////////////////////
                if (blogId != null) {
                    Post.updateOne({_id: blogId}, {title: req.body.title, content: req.body.content}, function (err, _) {
                        if (err) {
                            return res.status(401).json({
                                error: "blog not found!",
                            });
                        } else {
                            return res.status(200).json({success: true})
                        }
                    })
                    ////////////////////////////          INSERT BLOG       ///////////////////////////
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
                    await post.save((err, _) => {
                        if (err) return res.status(400).json({success: false, err})
                        return res.status(200).json({success: true})
                    })
                }
            }
        });
    } else {
        return res.json({
            message: "error happening please try again",
        });
    }

})

router.post("/getPost", (req, res) => {
    // noinspection JSIgnoredPromiseFromCall
    Post.findById(req.body.postId)
        .populate("Author")
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            if (doc == null) return res.status(400).json({success: false, err: "Not found"})
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