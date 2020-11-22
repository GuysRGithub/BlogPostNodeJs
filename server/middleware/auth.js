const User = require("../models/AuthorUser")

let auth = (req, res, next) => {
    if (!req.cookies) return
    let token = req.cookies["token"]
    if (token) {
        next()
    }
    // if (window !== 'undefiend') {
    //     const cookieChecked = getCookie("token")
    //
    //     if (cookieChecked) {
    //         if (localStorage.getItem("user")) {
    //             next()
    //         } else {
    //             return false
    //         }
    //     }
    // }
}
// let auth = (req, res, next) => {
//     if (window !== 'undefiend') {
//         const cookieChecked = getCookie("token")
//
//         if (cookieChecked) {
//             if (localStorage.getItem("user")) {
//                 next()
//             } else {
//                 return false
//             }
//         }
//     }
//     if (!req.cookie) return
//     let token = req.cookie.get("w_auth")
//
//     User.findByToken(token, (err, user) => {
//         if (err) throw err;
//         if (!user) {
//             return res.json({
//                 isAuthenticated: false,
//                 error: true
//             })
//         }
//
//         req.token = token
//         req.user = user
//         next()
//     })
// }


module.exports = auth