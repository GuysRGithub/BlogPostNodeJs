import React from 'react'
import {Link} from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="site-menu navigation w-full flex justify-center my-5"
                 aria-label="Primary Menu">
                <ul className="flex flex-wrap justify-center">
                    <li className="color-gray-primary font-bold">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="color-gray-fade-primary">
                        <a href="https://appetitedemo.wordpress.com/our-menu/">Menu</a>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <Link to="/blogs/posts/index">Blog</Link>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <a href="#">Features</a>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <a target="_blank" rel="noopener noreferrer"
                           href="https://theme.wordpress.com/themes/appetite/support/">Support</a>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <Link to="/blogs/posts/index">Testimonial</Link>
                    </li>
                </ul>
            </div>

            <div className="flex justify-center list-none child-mx-1 my-5">
                <li className="color-gray-fade-primary font-bold">
                    <Link to="/blogs/posts/index"><i className="fab fa-facebook-f"/></Link>
                </li>
                <li className="color-gray-fade-primary">
                    <Link to="/blogs/posts/index"><i className="fab fa-instagram"/></Link>
                </li>
                <li className="color-gray-fade-primary font-bold">
                    <Link to="/blogs/posts/index"><i className="fab fa-twitter"/></Link>
                </li>
                <li className="color-gray-fade-primary font-bold">
                    <Link to="/blogs/posts/index"><i className="fab fa-pinterest"/></Link>
                </li>
                <li className="color-gray-fade-primary font-bold">
                    <Link to="/blogs/posts/index"><i className="fab fa-facebook"/></Link>
                </li>
                <li className="color-gray-fade-primary font-bold">
                    <Link to="/blogs/posts/index"><i className="fab fa-facebook"/></Link>
                </li>
            </div>

            <div className="site-copyright text-center my-5 font-josesans">
                2020 Guys<span className="footer-content">• 1234 Street, Seattle WA • 813 283 811</span>
            </div>
        </footer>
    )
}

export default Footer