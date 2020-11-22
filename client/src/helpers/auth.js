import cookie from "js-cookie"

export const setCookie = (key, value) => {
    cookie.set(key, value, {
        expires: 1 // 1 day
    })
}

export const removeCookie = (key) => {
    if (window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = key => {
    if (window !== 'undefiend') {
        return cookie.get(key)
    }
}

export const setLocalStorage = (key, value) => {
    if (window !== "undefiend") {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (window !== "undefiend") {
        localStorage.removeItem(key)
    }
}

export const authenticate = (response, next) => {
    setCookie('token', response.data.token)
    setLocalStorage("user", response.data.user)
    next()
}

export const signout = next => {
    removeCookie("token")
    removeLocalStorage("user")
}

export const isAuth = () => {
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

export const updateUser = (response, next) => {
    if (window !== "undefiend") {
        let auth = JSON.parse(localStorage.getItem("user"))
        auth = response.data
        localStorage.setItem("user", JSON.stringify(auth))
    }
    next()
}