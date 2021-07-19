import cookie from "js-cookie"

import React, {useEffect} from "react";
import {useDispatch} from "react-redux"
import {auth} from "../actions/user_actions";

// null   Anyone Can go inside
// true   only logged in user can go inside
// false  logged in user can't go inside
export default function (SpecificComponent, option, adminRoute=null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch()
        useEffect(() => {
            dispatch(auth()).then(response => {
                // Not Login
                if (!response.payload.isAuthenticated) {
                    if (option) {
                        props.history.push('/users/login')
                    }
                } else {
                    // Admin page but not admin user
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push("/")
                    }

                    // Logged in but go to login page
                    else {
                        if (option === false) {
                            props.history.push("/")
                        }
                    }
                }
            })
        }, [])

        return <SpecificComponent {...props} />
    }

    return AuthenticationCheck
}

export const setCookie = (key, value) => {
    cookie.set(key, value, {
        expires: 1 // 1 day
    })
}

export const removeCookie = (key) => {
    if (window !== undefined) {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = key => {
    if (window !== undefined) {
        return cookie.get(key)
    }
}

export const setLocalStorage = (key, value) => {
    if (window !== undefined) {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if (window !== undefined) {
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
    next()
}

export const isAuth = () => {
    if (window !== undefined) {
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
    if (window !== undefined) {
        let auth = JSON.parse(localStorage.getItem("user"))
        auth = response.data
        localStorage.setItem("user", JSON.stringify(auth))
    }
    next()
}
