import React from "react";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

export default () => {
    return (<div className="app-header w-100 position-relative relative">
        <Navbar/>
        <div className="welcome-header-text-light background-none ml-4 lg:ml-8">
            <div>
                <h2 className="font-josesans font-bold color-primary-dark">Welcome to our Blogger for Fantasy
                    Stories</h2>
                <div className="mt-5">
                    <p className="font-josesans font-bold color-gray-primary fs-sm-2 w-6/12">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the
                        industry's standard dummy text ever since the 1500s.
                    </p>
                </div>
                <div className="mt-3 border border-fade-gray-wide hover:border-highlight py-2 px-3 inline-block">
                    <Link to={`/blogs/index`}>
                        <div className="color-yellow-light cursor-pointer font-bold font-roboto">Read our Stories<i
                            className="fa fa-arrow-right ml-2"/></div>
                    </Link>
                </div>

            </div>
            <div className="z-neg-10 img-header md:w-10/12">
                <img className="object-cover h-100 rounded-sm"
                     src={require("../../../assets/images/posts/RzaDRA3Stct09BOROS6C-TE5.jpg").default} alt=""/>
            </div>
        </div>
    </div>)
}