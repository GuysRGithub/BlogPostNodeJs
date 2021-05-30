import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Button from "antd";
import {Link} from "react-router-dom";
import NavbarLight from "../Navbar/NavbarLight";

export default (props) => {
    return (<div className="app-header w-100 position-relative relative">
        <NavbarLight/>
        <div className="welcome-header-text-light background-none ml-8">
            <div className="w-8/12">
                <h2 className="font-josesans font-bold color-dark-primary">Welcome to our Blogger for Fantasy Stories</h2>
                <div className="mt-5">
                    <p className="font-rubik font-normal fs-sm-1 color-gray-fade-primary w-6/12">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the
                        industry's standard dummy text ever since the 1500s.
                    </p>
                </div>
                <div className="mt-5">
                    <Link to="/" className="">Read our Story</Link>
                </div>
            </div>

            <div className="z-neg-10 img-header">
                <img className="object-cover h-100 rounded-sm"
                     src={require("../../../assets/images/posts/RzaDRA3Stct09BOROS6C-TE5.jpg").default} alt=""/>
            </div>
        </div>
    </div>)
}