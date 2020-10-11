import Axios from "axios";
import {USER_SERVER_URL, BLOG_SERVER_URL} from "../config/Config";
import {AUTH_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER, SAVE_POST} from "./types";

export function registerUser(data) {
    const request = Axios.post(`${USER_SERVER_URL}/register`, data)
        .then(response => response.data)

    console.log("Request Register: ", request)
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(data) {
    const request = Axios.post(`${USER_SERVER_URL}/login`, data)
        .then(response => response.data)

    console.log("Request Login: ", request)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function logoutUser(data) {
    const request = Axios.post(`${USER_SERVER_URL}/logout`, data)
        .then(response => response.data)

    console.log("Request Logout: ", request)
    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function auth(data) {
    const request = Axios.post(`${USER_SERVER_URL}/auth`, data)
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