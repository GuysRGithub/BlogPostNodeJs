const dotenv = require("dotenv")
if (process.env.NODE_ENV === 'production') {
    dotenv.config({
        path: `./.env.production`
    })
} else {
    dotenv.config({
        path: `./.env.development`
    })
}

const cors = require('cors')
const cookieParser = require("cookie-parser");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require("path");
const app = express();

let mode = "localhost"
if (mode === "localhost") {
    // Connection URL
    let url = 'mongodb://127.0.0.1:27017/BlogFullStack';
    // Use connect method to connect to the Server
    // noinspection JSIgnoredPromiseFromCall
    mongoose.connect(url, {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }, (err) => {
        if (err) {
            console.log("Error when connect to mongo server: ", err);
            return
        }
        console.log("Connected correctly to mongo server");
    });
} else {
    mongoose.connect(process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));
}

// noinspection JSCheckFunctionSignatures
app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({extended: true}));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));
// app.use('/uploads/images', express.static('uploads/images'));
// app.use(express.static('uploads'))
// app.use(express.static('public'))


app.use('/api/users', require('./routes/users'));
app.use("/api/blogs", require("./routes/blogs"))
app.use("/api/uploads", require("./routes/uploads"))
app.use("/api/users", require("./routes/auth"))


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

    // Set static folder
    // All the javascript and css files will be read and served from this folder
    app.use(express.static("client/build"));

    // index.html for all page routes    html or routing and navigation
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server Listening on ${port}`)
});