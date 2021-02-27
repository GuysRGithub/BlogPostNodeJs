const cookie = require("js-cookie");

exports.setCookie = (key, value) => {
    cookie.set(key, value, {
        expires: 1 // 1 day
    })
}

exports.removeCookie = (key) => {
    if (typeof window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

exports.getCookie = key => {
    if (typeof window !== 'undefined') {
        return cookie.get(key)
    }
}

exports.setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

exports.removeLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem(key)
    }
}

exports.authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage("user", response.data.user)
    next()
}

exports.signout = next => {
    removeCookie("token")
    removeLocalStorage("user")
}

exports.isAuth = () => {
    if (window !== 'undefiend') {
        const cookieChecked = getCookie("token")

        if (cookieChecked) {
            if (localStorage.getItem("user")) {
                return JSON.parse(localStorage.getItem("user"))
            } else {
                return false
            }
        }
    }
}

exports.updateUser = (response, next) => {
    if (typeof window !== "undefined") {
        let auth = JSON.parse(localStorage.getItem("user"))
        auth = response.data
        localStorage.setItem("user", JSON.stringify(auth))
    }
    next()
}