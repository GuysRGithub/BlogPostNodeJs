import React, {useState} from "react";
import {toast} from "react-toastify";
import Axios from "axios";
import {isAuth} from "../../../helpers/auth";
import {Link, Redirect} from "react-router-dom";
import {USER_REGISTER_SERVER_URL} from "../../../config/router_path";
import authSvg from "../../../assets/images/svg/auth.svg";

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
        <div className="min-h-screen bg-gray-100 text-gray-900 flex md:flex-wrap lg:flex-no-wrap justify-center py-16 lg:p-16 rounded-lg overflow-hidden">
            {isAuth() ? <Redirect to="/"/> : null}
            <div className="xl:w-5/12 lg:w-6/12 w-9/12 m-0 bg-white shadow flex flex-col justify-center items-center py-12">
                <div className="m-0 bg-white flex-1 w-9/12 sm:w-full">
                    <div className="mt-5 flex w-full flex-col items-center">
                        <h1 className="font-josesans font-extrabold">Sign Up</h1>
                        <form
                            className="max-w-screen-xl flex-1 mt-5 text-indigo-500"
                            onSubmit={handleSubmit}>
                            <div className="mx-auto max-w-xs relative">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    onChange={handleChange("name")}
                                    value={name}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-2"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleChange("email")}
                                    value={email}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-2"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange("password")}
                                    value={password}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-2"
                                />
                                <input
                                    type="password"
                                    placeholder="Password Confirm"
                                    onChange={handleChange("passwordConfirm")}
                                    value={passwordConfirm}
                                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-2"
                                />

                                <div className="w-full">
                                    <button type="submit"
                                            className="d-flex d-inline-block font-roboto outline-none-imp font-weight-bold align-items-center duration-500 mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full p-5 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <i className="fa fa-sign-in-alt mr-3 duration-500"/>Register
                                    </button>
                                </div>
                            </div>
                        </form>
                   </div>
                </div>
                <div className="my-8 border-b text-center flex w-full sm:w-9/12">
                    <span className="border-b border-solid flex-grow"/>
                    <div
                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                        Or sign in with email or social
                    </div>
                    <span className="border-b border-solid flex-grow"/>
                </div>
                <Link to="/users/login" className="no-style w-9/12 sm:w-full max-w-xs">
                    <div className="w-full flex justify-center">
                        <button
                            className="flex inline-block font-roboto outline-none-imp align-items-center duration-500 mt-2 tracking-wide font-bold bg-indigo-200 w-full p-5 rounded-lg hover:bg-indigo-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                            <i className="fa fa-user-plus mr-3 duration-500"/>Sign In
                        </button>
                    </div>
                </Link>
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
