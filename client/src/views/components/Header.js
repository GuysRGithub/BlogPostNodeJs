import React from "react";
import Navbar from "./Navbar/Navbar";
import Button from "antd";
import {Link} from "react-router-dom";

export default (params) => {
    return (<div id="header" className="app-header w-100 text-center position-relative">
        <Navbar/>

        <div className="welcome-header-text font-weight-bold">
            <h2>Welcome to our Restaurant</h2>
            <div className="header-description">
                <p>Restaurants range from inexpensive and informal lunching or dining places catering to people working
                    nearby, with modest food served in simple settings at low prices, to expensive establishments
                    serving
                    refined food and fine wines in a formal setting. In the former case, customers usually wear casual
                    clothing.</p>
            </div>

            <div className="mt-5">
                <Link className="btn-custom room-link">Read our Story</Link>
            </div>

        </div>


    </div>)
}