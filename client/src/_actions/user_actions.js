import Axios from "axios";
import {USER_SERVER_URL, BLOG_SERVER_URL} from "../config/config.js";
import {AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, SAVE_POST} from "./types";
import {
    USER_AUTHENTICATE_SERVER_URL,
    USER_LOGIN_SERVER_URL,
    USER_LOGOUT_SERVER_URL,
    USER_REGISTER_SERVER_URL
} from "../config/router_path";

export function registerUser(data) {
    const request = Axios.post(`${USER_REGISTER_SERVER_URL}`, data)
        .then(response => response.data)

    console.log("Request Register: ", request)
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(data) {
    const request = Axios.post(`${USER_LOGIN_SERVER_URL}`, data)
        .then(response => response.data)

    console.log("Request Login: ", request)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser(data) {
    const request = Axios.post(`${USER_LOGOUT_SERVER_URL}`, data)
        .then(response => response.data)

    console.log("Request Logout: ", request)
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function auth(data) {
    const request = Axios.post(`${USER_AUTHENTICATE_SERVER_URL}`, data)
        .then(response => response.data)

    console.log("Request Auth: ", request)
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function savePost(data) {
    console.log("Save ShowPost", data)
    const request = Axios.post(`${BLOG_SERVER_URL}/savePost`, data)
        .then(response => response.data)

    console.log("Save ShowPost: ", data)
    return {
        type: SAVE_POST,
        payload: request
    }

}