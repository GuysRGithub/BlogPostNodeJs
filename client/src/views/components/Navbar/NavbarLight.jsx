import React from "react";
import {Link} from "react-router-dom";

function NavbarLight() {
    return (
        <header className="py-8 px-16 primary-font flex">
            <div
                className="site-branding th-stack--sm sm:th-text-align-unset th-text-center sm:th-mb-0 th-mb-base th-w-full">
                <p className="font-josesans font-bold color-dark-primary">GUYS</p>
                <p className="site-description th-text-base th-font-normal th-hidden th-mb-0 font-jose-sans">
                    Appetite is a clean,
                    flexible and fully responsive WordPress theme with special features for restaurants and cafes</p>
            </div>

            <nav className="site-menu navigation w-full"
                 aria-label="Primary Menu">
                <ul className="menu th-flex th-flex-wrap th-justify-end">
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
                        <a href="#">Features</a><span className="arrow-icon" aria-hidden="true"/>
                        <ul className="sub-menu">
                            <li id="menu-item-57"
                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-57"><a
                                href="https://appetitedemo.wordpress.com/typography/">Typography</a></li>
                            <li id="menu-item-56"
                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-56"><a
                                href="https://appetitedemo.wordpress.com/image-alignment/">Image Alignment</a></li>
                            <li id="menu-item-115"
                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-115"><a
                                href="https://appetitedemo.wordpress.com/our-locations/">Grid Template</a></li>
                            <li id="menu-item-116"
                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-116"><a
                                href="https://appetitedemo.wordpress.com/the-staff/">Grid Template (Full Width)</a></li>
                            <li id="menu-item-154"
                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-154"><a
                                href="https://appetitedemo.wordpress.com/full-width-template/">Full Width Template</a>
                            </li>
                            <li id="menu-item-59"
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-59"><a
                                href="https://appetitedemo.wordpress.com/2015/07/04/dinners-that-will-impress-your-date/">Paginated
                                Post</a></li>
                            <li id="menu-item-58"
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-58"><a
                                href="https://appetitedemo.wordpress.com/abcd">404 Page</a></li>
                        </ul>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <a target="_blank" rel="noopener noreferrer"
                           href="https://theme.wordpress.com/themes/appetite/support/">Support</a>
                        <span className="arrow-icon" aria-hidden="true"/>
                        <ul className="sub-menu">
                            <li id="menu-item-168"
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-168"><a
                                target="_blank" rel="noopener noreferrer"
                                href="https://www.youtube.com/watch?v=pz13kYxqUSk&amp;list=PLszLIx-B6H7NWzAUBwV9gzluQ2qfyga4x">Video
                                Tutorials</a></li>
                            <li id="menu-item-167"
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-167"><a
                                target="_blank" rel="noopener noreferrer"
                                href="https://premium-themes.forums.wordpress.com/forum/appetite">Support Forum</a></li>
                            <li id="menu-item-169"
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-169"><a
                                target="_blank" rel="noopener noreferrer" href="http://tdwp.us/contacts/">Contact Us</a>
                            </li>
                        </ul>
                    </li>
                    <li className="color-gray-fade-primary font-bold">
                        <Link to="/blogs/posts/index">Testimonial</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavbarLight

// <>
// <nav id="header-nav" className="navbar navbar-expand-lg navbar-dark">
//     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
// aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon">
//
//     </span>
// </button>
// <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
// <a className="navbar-brand" href="#">Univer Story</a>
// <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
// <li className="nav-item active">
// <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
// </li>
// <li className="nav-item">
// <a className="nav-link" href="#">Link</a>
// </li>
// <li className="nav-item">
// <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
// </li>
// </ul>
// <form className="form-inline my-2 my-lg-0">
// <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
// <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
// </form>
// </div>
// </nav>
// </>