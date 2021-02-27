const express = require('express');
const router = express.Router();
const path = require("path")
const fs = require("fs")
const shell = require('shelljs');
const jwt = require("jsonwebtoken");

const Profile = require("../models/Profile");
const AuthorUser = require("../models/AuthorUser");
const UserMediaLibrary = require("../models/UserMediaLibrary.js")

const multiparty = require("connect-multiparty")
const multer = require("multer");
const MultiPartyMiddleware = multiparty({uploadDir: "./uploads/images"})

/* GET home page. */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});


const filterImages = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
        return cb("Only jpg and png are allowed", false);
    }
    cb(null, true);
}


const upload = multer({storage: storage});
const uploadSingle = multer({storage: storage, fileFilter: filterImages}).single("file");

router.post('/', MultiPartyMiddleware, function (req, res, next) {
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

router.post('/images', function (req, res, next) {

    const {token} = req.cookies;

    console.log("WTF", req.body)

    let userMediaLibrary = null;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log("Error Upload Token Failed", err);
                return res.status(401).json({
                    error: "Something went wrong when upload images, may be need to login",
                });
            } else {

                const {_id} = jwt.decode(token);

                const user = await AuthorUser.findById(_id).exec()

                if (user == null) return

                // const profile = new Profile({
                //     author: user._id
                // })

                userMediaLibrary = await UserMediaLibrary.findOne({author: user._id}).exec()

                if (userMediaLibrary == null) return

                const imageUploadPathRelative = path.join("uploads", "media", user.name, "images").toString()
                const imagesPathFull = path.join(path.resolve('./'), imageUploadPathRelative).toString()

                console.log(imagesPathFull)

                if (!fs.existsSync(imagesPathFull)) {
                    console.log("Not exits")
                    shell.mkdir("-p", imagesPathFull)
                    // fs.mkdir(imagesPath, function (e) {
                    //     console.log(e)
                    // })
                }
                // Upload
                const mediaStorage = multer.diskStorage({
                    destination: (req, file, cb) => {
                        cb(null, imageUploadPathRelative);
                    },
                    filename: (req, file, cb) => {
                        cb(null, `${Date.now()}_${file.originalname}`);
                    }
                });

                const uploadPostImages = multer({storage: mediaStorage, fileFilter: filterImages}).array("post_images");

                // req.files only available after upload using uploadPostImages
                console.log("Files Images Upload", req.files)

                uploadPostImages(req, res, (err) => {
                    if (err) {
                        console.log(err);
                        return res.json({success: false, err});
                    }
                    const imagesPath = []
                    const fileNames = []
                    for (let i = 0; i < req.files.length; i++) {
                        let file = req.files[i];
                        imagesPath.push(file.path)
                        fileNames.push(file.originalname)
                    }

                    console.log("Uploads Url", imagesPath)

                    userMediaLibrary.images = [...userMediaLibrary.images, ...imagesPath]
                    console.log("UserMediaLibrary", userMediaLibrary)
                    userMediaLibrary.save()

                    return res.json({
                        success: true,
                        imagesPath: imagesPath,
                        filenames: fileNames,
                    });
                });
            }
        });
    } else {
        return res.json({
            message: "error happening please try again",
        });
    }

    // let tempFile = req.files.upload
    // let tempFilePath = tempFile.path
    //
    // const targetUrl = path.join(__dirname, "./uploads/images/" + tempFile.name)


});

module.exports = router;
