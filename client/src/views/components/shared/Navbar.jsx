import React from "react";
import {Link, Redirect} from "react-router-dom";
import {isAuth} from "../../../helpers/auth";

function Navbar() {
    return (
        <header className="py-8 px-8 lg:px-16 primary-font flex">
            <div
                className="">
                <p className="font-josesans font-bold color-primary-dark">GUYS</p>
            </div>

            <nav className="navigation w-full"
                 aria-label="Primary Menu">
                <ul className="menu flex flex-wrap justify-end">
                    <li className="color-gray-primary font-bold">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <Link to="/blogs/index">Blog</Link>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <a href="#">Features</a><span className="arrow-icon" aria-hidden="true"/>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <Link to="/blogs/posts/index">Testimonial</Link>
                    </li>

                    {isAuth() ?
                        <li className="color-gray-fade-primary font-bold">
                            <Link to="/users/logout">Logout</Link>
                        </li>
                        :
                        <li className="color-gray-fade-primary font-bold">
                            <Link to="/users/login">Login</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Navbar