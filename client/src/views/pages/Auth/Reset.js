import React, { useState, useEffect } from "react";
import authSvg from "../../../assets/reset.svg";
import { ToastContainer, toast } from "react-toastify";
const Axios = require("axios");
function ResetPassword(props) {
  const [FormData, setFormData] = useState({
    password: "",
    passwordConfirm: "",
    token: "",
  });

  const { password, passwordConfirm, token } = FormData;

  useEffect(() => {
    let token = props.match.params.token;
    if (token) {
      setFormData({ ...FormData, token });
    }
  }, []);

  const handleChange = (text) => (e) => {
    setFormData({ ...FormData, [text]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirm && password && passwordConfirm) {
      let data = {
        newPassword: password,
        resetPasswordLink: token,
      };
      console.log("Token", token);
      Axios.put(`${process.env.REACT_APP_API_URL}/passwords/reset`, data)
        .then((res) => {
          if (res.data.err) {
            return toast.error(
              `${res.data.err}`
            );  
          }
          setFormData({ ...FormData, password: "", passwordConfirm: "" });
          console.log(res);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(
            `Token Expired, Please request new reset`
          );
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <ToastContainer />
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <form
            className="w-full flex-1 mt-8 text-indigo-500"
            onSubmit={handleSubmit}
          >
            <input
              type="password"
              placeholder="Password"
              onChange={handleChange("password")}
              value={password}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100
            border-gray-200 placeholder-gray-500 text-sm focus:outline-none
            focus:border-gray-400 focus:bg-white my-2"
            />
            <input
              type="password"
              placeholder="PasswordConfirm"
              onChange={handleChange("passwordConfirm")}
              value={passwordConfirm}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white my-2"
            />

            <button
              type="submit"
              className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
            <i className="fas fa-sign-in-alt w-6 ml-2"></i>
            <span className="ml-3">Submit</span>
              
            </button>
          </form>
        </div>
      </div>

      <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${authSvg})` }}
          ></div>
        </div>
    </div>
  );
}

export default ResetPassword;
