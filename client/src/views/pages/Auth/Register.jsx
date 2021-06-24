import React, {useState} from "react";
import authSvg from "../../../assets/images/svg/auth.svg";
import {ToastContainer, toast} from "react-toastify";
import Axios from "axios";
import {isAuth} from "../../../helpers/auth";
import {Link, Redirect} from "react-router-dom";
import {USER_REGISTER_SERVER_URL} from "../../../config/router_path";

export const Register = () => {
    const [FormData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const {email, name, password, passwordConfirm} = FormData;

    const handleChange = (text) => (e) => {
        setFormData({...FormData, [text]: e.target.value});
        console.log({email, name, password, passwordConfirm});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && password) {
            if (password === passwordConfirm) {
                let data = {
                    email,
                    name,
                    password,
                    passwordConfirm,
                };
                Axios.post(`${USER_REGISTER_SERVER_URL}`, data)
                    .then((response) => {
                        // if (response.er)
                        if (response.data.success || !response.data.error) {
                            setFormData({
                                ...FormData,
                                name: "",
                                email: "",
                                password: "",
                                passwordConfirm: "",
                            });
                            toast.success(response.data.message);

                        } else if (response.data.error) {
                            toast.error("Email has taken");
                        }
                        console.log("Response Register", response)

                    })
                    .catch((err) => {
                        toast.error("Something wrong", err);
                    });
            } else {
                toast.error("Passwords does not match");
            }
        } else {
            toast.error("Please fill all fields");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            {isAuth() ? <Redirect to="/"/> : null}
            {/*<ToastContainer />*/}
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="mt-5 flex flex-col items-center">
                    <h1 className="font-josesans font-extrabold">Sign Up</h1>
                    <form
                        className="w-full flex-1 mt-5 text-indigo-500"
                        onSubmit={handleSubmit}
                    >
                        <div className="mx-auto max-w-xs relative">
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={handleChange("name")}
                                value={name}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={handleChange("email")}
                                value={email}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={handleChange("password")}
                                value={password}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                            />
                            <input
                                type="password"
                                placeholder="PasswordConfirm"
                                onChange={handleChange("passwordConfirm")}
                                value={passwordConfirm}
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
                            />

                            <div className="w-full d-flex justify-content-center">
                                <button type="submit"
                                        className="d-flex d-inline-block font-roboto outline-none-imp font-weight-bold align-items-center duration-500 mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full p-5 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <i className="fa fa-sign-in-alt mr-3 duration-500"/>Register
                                </button>
                            </div>
                        </div>
                        <div className="my-5 border-b-text-center">
                            <div
                                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Or sign with email or social login
                            </div>
                        </div>
                        <Link to="/login">
                            <div className="w-full d-flex justify-content-center">
                                <button
                                    className="d-flex d-inline-block f6 my-5 p-5 font-roboto outline-none-imp font-weight-bold align-items-center duration-500 text-gray-800 flex justify-center w-100">
                                    <i className="fa fa-user-plus mr-3 duration-500"/>Sign In
                                </button>
                            </div>
                        </Link>
                    </form>
                </div>
            </div>
            <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
                <div
                    className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
                    style={{backgroundImage: `url(${authSvg})`}}
                >

                </div>
            </div>
        </div>
    );
};
