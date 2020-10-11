const express = require("express")
const Post = require("../models/Post");
const router = express.Router()
router.post("/savePost", (req, res) => {
    console.log("Server Save ShowPost", req.body)
    let post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    })
    // noinspection JSIgnoredPromiseFromCall
    post.save((err, doc) => {
        if (err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true, doc: doc})
    })
})

router.post("/getPost", (req, res) => {
    console.log("Server Get ShowPost", req.body)
    // noinspection JSIgnoredPromiseFromCall
    Post.findById(req.body.postId)
        .populate("Author")
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, doc: doc})
        })
})

router.get("/getAllPosts", (req, res) => {
    console.log("Server Load All Posts")
    // noinspection JSIgnoredPromiseFromCall
    Post.find()
        .populate("Author")
        .exec((err, doc) => {
            if (err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, doc: doc})
        })
})

module.exports = router