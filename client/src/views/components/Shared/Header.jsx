import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Button from "antd";
import {Link} from "react-router-dom";

export default (props) => {
    return (<div id="header" className="app-header w-100 text-center position-relative all-center relative">
        <Navbar/>
        <div className="welcome-header-text background-none">
            <h2 className="font-jose-sans font-bold">Welcome to our Blogger</h2>
            <div className="header-description">
                <p className="font-jose-sans font-normal">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged.
                </p>
            </div>

            <div className="mt-5">
                <Link to="/" className="custom-btn-primary room-link">Read our Story</Link>
            </div>

        </div>


    </div>)
}