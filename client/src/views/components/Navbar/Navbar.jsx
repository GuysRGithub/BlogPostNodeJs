import React from "react";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <header id="header-nav"
                className="site-header primary-font th-flex sm:th-flex-no-wrap th-flex-wrap th-justify-center th-items-center sm:th-p-lg th-p-base">
            <div
                className="site-branding th-stack--sm sm:th-text-align-unset th-text-center sm:th-mb-0 th-mb-base th-w-full">
                <p className="site-title th-uppercase th-text-xl th-mb-0"><a href="https://appetitedemo.wordpress.com/"
                                                                             rel="home">Appetite</a></p>
                <p className="site-description th-text-base th-font-normal th-hidden th-mb-0">Appetite is a clean,
                    flexible and fully responsive WordPress theme with special features for restaurants and cafes</p>
            </div>

            <nav id="site-navigation" className="site-menu main-navigation th-uppercase lg:th-block th-hidden th-w-full"
                 aria-label="Primary Menu">
                <ul className="menu th-flex th-flex-wrap th-justify-end">
                    <li
                        className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-43">
                        <Link to="/">Home</Link>
                    </li>
                    <li
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-124">
                        <a
                        href="https://appetitedemo.wordpress.com/our-menu/">Menu</a>
                    </li>
                    <li
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-99">
                        <Link to="/blogs/posts/index">Blog</Link>
                    </li>
                    <li
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-46">
                        <a href="#">Features</a><span className="arrow-icon" aria-hidden="true"></span>
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
                    <li
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-166">
                        <a target="_blank" rel="noopener noreferrer"
                           href="https://theme.wordpress.com/themes/appetite/support/">Support</a>
                        <span className="arrow-icon" aria-hidden="true"></span>
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
                    <li id="menu-item-42"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-42"><a
                        href="https://appetitedemo.wordpress.com/testimonial/">Testimonials</a></li>
                </ul>
            </nav>


            <button id="sidebar-button"
                    className="toggle-sidebar-button clean-button th-uppercase th-flex th-items-center lg:th-ml-sm"
                    type="button" aria-expanded="false">
                <svg className="svg-icon th-fill-current" width="24" height="24" aria-hidden="true" role="img"
                     focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-darkreader-inline-fill="" data-darkreader-inline-stroke=""
                     >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span className="screen-reader-text header-search">Search</span>
                <svg className="svg-icon th-fill-current" width="24" height="24" aria-hidden="true" role="img"
                     focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-darkreader-inline-fill="" data-darkreader-inline-stroke=""
                     >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span className="header-menu lg:th-hidden th-block">Menu</span>
                <svg className="svg-icon th-fill-current" width="24" height="24" aria-hidden="true" role="img"
                     focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     data-darkreader-inline-fill="" data-darkreader-inline-stroke=""
                     >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </header>
    )
}

export default Navbar

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