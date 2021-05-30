const AuthorUser = require("../models/AuthorUser")
const jwt = require("jsonwebtoken");

const {getCookie} = require("../helpers/auth.js")
// let auth = (req, res, next) => {
//     console.log("Authorization...")
//     if (!req.cookies) return
//     let token = req.cookies["token"]
//     if (token) {
//         next()
//     }
//     // if (window !== 'undefiend') {
//     //     const cookieChecked = getCookie("token")
//     //
//     //     if (cookieChecked) {
//     //         if (localStorage.getItem("user")) {
//     //             next()
//     //         } else {
//     //             return false
//     //         }
//     //     }
//     // }
// }
let auth = (req, res, next) => {
    if (typeof window !== undefined) {
        const cookieChecked = getCookie("token")

        if (cookieChecked) {
            if (localStorage.getItem("user")) {
                next()
            } else {
                return false
            }
        }
    }
    if (!req.cookies) return
    // let token = req.cookies["w_auth"]
    const {token} = req.cookies;
    if (!token) return
    const {_id} = jwt.decode(token);

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
}


module.exports = auth