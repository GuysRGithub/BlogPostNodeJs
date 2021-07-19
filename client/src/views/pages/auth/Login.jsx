import React, {useState} from "react";
import {toast} from "react-toastify";
import Axios from "axios";
import {authenticate, isAuth} from "../../../helpers/auth";
import {Link, Redirect} from "react-router-dom";
import {GoogleLogin} from "react-google-login";
import authSvg from "../../../assets/images/svg/login.svg";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"
import {
    USER_FACEBOOK_LOGIN_SERVER_URL,
    USER_GOOGLE_LOGIN_SERVER_URL,
    USER_LOGIN_SERVER_URL
} from "../../../config/router_path";

export const Login = (props) => {
    const [FormData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = FormData;

    const handleChange = (text) => (e) => {
        setFormData({...FormData, [text]: e.target.value});
    };

    // Facebook
    const sendFacebookToken = (userId, accessToken) => {
        Axios.post(`${USER_FACEBOOK_LOGIN_SERVER_URL}`, {
            userId, accessToken
        }).then(response => {
            console.log(response);
            informParent(response)
        }).catch(err => {
            console.log(err);
            toast.error("Facebook auth failed", err)
        })
    }

    // Google token
    const sendGoogleToken = (tokenId) => {
        Axios.post(`${USER_GOOGLE_LOGIN_SERVER_URL}`, {
            tokenId: tokenId,
        })
            .then((response) => {
                console.log(response);
                informParent(response);
            })
            .catch(() => {
                toast.error("Google login failed");
            });
    };

    // Login with google success to authenticate and redirect

    const informParent = (response) => {
        authenticate(response, () => {
            isAuth() && isAuth.role === "admin"
                ? props.history.push("/admin")
                : props.history.push("/private");
        });
    };

    const responseGoogle = (response) => {
        sendGoogleToken(response.tokenId);
    };

    const responseFacebook = (response) => {
        // Must be spell correct or it not work
        // noinspection JSUnresolvedVariable
        sendFacebookToken(response.userID, response.accessToken)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            let data = {
                email,
                password,
            };
            Axios.post(`${USER_LOGIN_SERVER_URL}`, data)
                .then((response) => {
                    authenticate(response, () => {
                        setFormData({
                            ...FormData,
                            email: "",
                            password: "",
                        });
                        toast.success(`Login Successful. Welcome back ${response.data.user.name}`);
                        isAuth() && isAuth().role === "admin"
                            ? props.history.push("/admin")
                            : props.history.push("/");

                    });

                })
                .catch((err) => {
                    toast.error(err.response.data.error);
                });
        } else {
            toast.error("Please fill all fields");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex md:flex-wrap lg:flex-no-wrap justify-center py-16 lg:p-16 rounded-lg">
            {isAuth() ? <Redirect to="/"/> : null}
            <div className="xl:w-5/12 lg:w-6/12 w-9/12 m-0 bg-white shadow flex flex-col justify-center items-center py-12">
                <div className="lg:w-6/12 sm:w-8/12 w-11/12 flex flex-col items-center max-w-xs">
                    <h1 className="text-2xl xl:text-3xl font-extrabold font-josesans">Sign In For Blogs</h1>
                    <div className="w-full flex-1 mt-8 text-indigo-500 flex flex-col items-center">
                        <GoogleLogin
                            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            autoLoad={false}
                            cookiePolicy={"single_host_origin"}
                            render={renderProps =>
                                <div className="w-full flex justify-center">
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className="flex inline-block f6 my-2 p-5 font-roboto outline-none-imp font-bold align-items-center duration-500 text-gray-800 flex justify-center w-100 bg-indigo-200 hover:bg-indigo-400 rounded-md font-extrabold">
                                        <i className="fab fa-google mr-3 duration-500"/>Sign In With Google
                                    </button>
                                </div>
                            }
                        >
                        </GoogleLogin>

                        <FacebookLogin
                            appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`} // Facebook App ID
                            autoLoad={false} // when open login page it will go to login with facebook if set autoLoad = true
                            callback={responseFacebook}
                            render={renderProps =>
                                <div className="w-full flex justify-center">
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className="flex inline-block f6 my-2 p-5 font-roboto outline-none-imp font-bold align-items-center duration-500 text-gray-800 flex justify-center w-100 bg-indigo-200 hover:bg-indigo-400 rounded-md font-extrabold">
                                        <i className="fab fa-facebook mr-3 duration-500"/>Sign In With Facebook
                                    </button>
                                </div>
                            }
                        >
                        </FacebookLogin>

                        <Link to="/users/register" className="no-style w-100">
                            <div className="w-full flex justify-center">
                                <button
                                    className="flex inline-block f6 my-2 p-5 font-roboto outline-none-imp font-bold align-items-center duration-500 text-gray-800 flex justify-center w-100 bg-indigo-200 hover:bg-indigo-400 rounded-md font-extrabold">
                                    <i className="fa fa-user-plus mr-3 duration-500"/>Sign Up
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="my-5 border-b text-center flex w-8/12">
                    <span className="border-b border-solid flex-grow"/>
                    <div
                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                        Or sign with email
                    </div>
                    <span className="border-b border-solid flex-grow"/>
                </div>
                <div className="lg:w-6/12 sm:w-8/12 flex flex-col items-center w-11/12">
                    <form
                        className="w-full my-2 text-indigo-500"
                        onSubmit={handleSubmit}>
                        <div className="max-w-xs relative mx-auto">
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
                                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:shadow-md my-2"
                            />

                            <div className="w-full d-flex justify-content-center">
                                <button type="submit"
                                        className="d-flex d-inline-block font-roboto outline-none-imp font-weight-bold align-items-center duration-500 mt-2 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full p-5 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <i className="fa fa-sign-in-alt mr-3 duration-500"/>Sign In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                     style={{backgroundImage: `url(${authSvg})`}}>
                </div>
            </div>
        </div>
    );
};
