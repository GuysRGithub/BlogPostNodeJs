const express = require('express');
const multer = require("multer");
const router = express.Router();
const path = require("path")
const fs = require("fs")

const multiparty = require("connect-multiparty")
const MultiPartyMiddleware = multiparty({uploadDir: "./uploads/images"})

/* GET home page. */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".png") {
            return cb(res.status(400).end("Only jpg and png are allowed", false));
        }
        cb(null, true);
    },
});

const upload = multer({ storage: storage }).single("file");

router.post('/', MultiPartyMiddleware, function(req, res, next) {
    let tempFile = req.files.upload
    let tempFilePath = tempFile.path

    const targetUrl = path.join(__dirname, "./uploads/images/" + tempFile.name)

    if (path.extname(tempFile.originalFilename).toLowerCase() === ".png" || ".jpg") {
        fs.rename(tempFilePath, targetUrl, err => {
            // if (err) return console.log(err);
            res.status(200).json({
                uploaded: true,
                url: require("../config/config").domain + `${tempFilePath}`
            })
        })
    }
    console.log("Uploads")
});

module.exports = router;
