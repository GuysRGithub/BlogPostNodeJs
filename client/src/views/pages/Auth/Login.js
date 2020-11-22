import React, {useState} from "react";
import authSvg from "../../../assets/login.svg";
import {ToastContainer, toast} from "react-toastify";
import Axios from "axios";
import {authenticate, isAuth} from "../../../helpers/auth";
import {Link, Redirect} from "react-router-dom";
import {GoogleLogin} from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

export const Login = (props) => {
    const [FormData, setFormData] = useState({
        email: "",
        password: "",
    });

    const {email, password} = FormData;

    const handleChange = (text) => (e) => {
        console.log({email, password});
        setFormData({...FormData, [text]: e.target.value});
    };

    // Facebook
    const sendFacebookToken = (userId, accessToken) => {
        Axios.post(`${process.env.REACT_APP_API_URL}/facebook/login`, {
            userId, accessToken
        }).then(response => {
            console.log(response);
            informParent(response)
        }).catch(err => {
            console.log(err);
            toast.error("Facebook Auth failed", err)
        })
    }

    // Google token
    const sendGoogleToken = (tokenId) => {
        Axios.post(`${process.env.REACT_APP_API_URL}/google/login`, {
            tokenId: tokenId,
        })
            .then((response) => {
                console.log(response);
                informParent(response);
            })
            .catch((err) => {
                toast.error("Google login failed");
            });
    };

    // Login with google sucsess to authen and redirect

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
        sendFacebookToken(response.userID, response.accessToken)

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email", password);
        if (email && password) {
            let data = {
                email,
                password,
            };
            Axios.post(`${process.env.REACT_APP_API_URL}/login`, data)
                .then((response) => {
                    authenticate(response, () => {
                        setFormData({
                            ...FormData,
                            email: "",
                            password: "",
                        });

                        toast.success("Login Successful");
                    });

                    isAuth() && isAuth().role === "admin"
                        ? props.history.push("/admin")
                        : props.history.push("/");

                    toast.success(`Hey ${response.data.user.name} Welcome back`);
                })
                .catch((err) => {
                    toast.error(err);
                });
        } else {
            toast.error("Please fill all fields");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            {isAuth() ? <Redirect to="/"/> : null}
            <ToastContainer/>
            <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
                    <form
                        className="w-full flex-1 mt-8 text-indigo-500"
                        onSubmit={handleSubmit}
                    >
                        <div className="mx-auto max-w-xs relative">
                            <input
                                type="email"
                                placeholder="example@gmail.com"
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

                            <button
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="my-12 border-b-text-center">
                            <div
                                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Or sign with email or social login
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div>

                            </div>
                            <GoogleLogin
                                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                                render={(renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'"
                                    >
                                        Sign In with Google
                                    </button>
                                )}
                            >
                            </GoogleLogin>

                            <FacebookLogin
                                appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`} // Facebook App ID
                                autoLoad={false} // when open login page it will go to login with facebook if set autoLoad = true
                                callback={responseFacebook}
                                render={renderProps =>
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className="w-full max-w-xs font-bold shadow-sm mt-3 rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'"
                                    >
                                        Sign In Facebook
                                    </button>
                                }
                            >

                            </FacebookLogin>

                            <Link
                                to="/register"
                                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 mb-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                            >
                                Sign up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div
                    className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style={{backgroundImage: `url(${authSvg})`}}
                >

                </div>
            </div>
        </div>
    );
};
