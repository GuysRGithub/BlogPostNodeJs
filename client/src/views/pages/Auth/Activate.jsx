import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Axios from "axios";
import { isAuth } from "../../../helpers/auth";
import { Redirect } from "react-router-dom";
import {USER_ACTIVATE_SERVER_URL} from "../../../config/router_path";
const jwt = require("jsonwebtoken");

function Activate(props) {
  const [FormData, setFormData] = useState({
    name: "",
    token: "",
    show: true,
  });

  
  useEffect(() => {
    // get token from params url and decode this token to get name
    let token = props.match.params.token;
    let {name} = jwt.decode(token);
    if (token) {
      setFormData({...FormData, name, token });
    }
  }, []);

  const { name, token } = FormData;
  // console.log("Name, Token", name);
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${USER_ACTIVATE_SERVER_URL}`, {
      token,
    })
      .then((res) => {
        setFormData({ ...FormData, show: false });
        toast.success(res.data.message);
        props.history.push("/login")
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      {/* {isAuth() ? <Redirect to="/" /> : null} */}
      {/*<ToastContainer />*/}
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Welcome {name}
            </h1>
            <form
              className="w-full flex-1 mt-8 text-indigo-500"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto max-w-xs relative">
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Activate your account
                </button>
              </div>
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign up again
                </div>
              </div>
              <div className="flex flex-col items-center">
                <a
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  href="/register"
                  target="_self"
                >
                  <i className="fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500" />
                  <span className="ml-4">Sign Up</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activate;
