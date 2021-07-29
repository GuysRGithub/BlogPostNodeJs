import React, {useEffect, useState} from 'react'
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config.js";
import {USER_GET_PROFILE_SERVER_URL} from "../../../config/router_path";
import {isAuth} from "../../../helpers/auth";
import PostCardHorizontal from "../../components/profile/PostCardHorizontal.tsx";
import PostViewModel from "../../../view_models/PostViewModel.js";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import Footer from "../../components/shared/Footer";

export const Profile = () => {

    const [Posts, setPosts] = useState([]);
    const [Profile, setProfile] = useState({});

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        Axios.get(`${BLOG_SERVER_URL}/getAllPosts`)
            .then(response => {
                if (response.data.success) {
                    let posts = []
                    response.data.doc.map(post => {
                        let postView = new PostViewModel(post)
                        posts.push(postView)
                    })
                    setPosts(posts)
                } else {
                    toast.error("Failed to load posts...")
                }
            })
            .catch(err => {
                toast.error("Error: ", err.response.data.error)
            })

        let profile_params = {
            user_id: user._id
        }

        Axios.post(`${USER_GET_PROFILE_SERVER_URL}`, profile_params)
            .then(response => {
                console.log("response", response)
                if (response.data.success) {
                    setProfile(response.data.doc)
                } else {
                    toast.error("Failed to load posts!")
                }
            })
            .catch(err => {
                toast.error("Error: ", err.data.response.data)
            })
    }, [])


    return (
        <>
            <div className="flex justify-end">
                {!isAuth() ? <Redirect to="/login"/> : null}
                <div id="header-profile"
                     className="w-1/5 h-screen py-8 pr-8 flex flex-col justify-between shadow-md fixed left-0 top-0">
                    <div className="top flex flex-col items-end">
                        {/* Logo */}
                        <div id="logo" className="flex flex-col items-end w-full">
                        <span className="image ml-auto">
                            <img className="img-avatar"
                                 src={require("../../../assets/images/profile/cat-4977436_640.jpg").default}
                                 alt=""/>
                        </span>
                            <h1 id="title" className="font-josesans capitalize">{user.name}</h1>
                            <p className="mt-3 font-pt-serif">Hyperspace Engineer</p>
                        </div>
                        {/* Nav */}
                        <nav id="nav">
                            <ul>
                                <li><a href="#top" id="top-link" className="w-full flex justify-between items-center">
                                    <span>Intro</span><i className="icon fa solid fa-home"/>
                                </a></li>
                                <li><a href="#portfolio" id="portfolio-link" className="">
                                    <span>Portfolio</span><i className="icon solid fa fa-th"/>
                                </a></li>
                                <li><a href="#about" id="about-link"
                                       className="w-full flex justify-between items-center">
                                    <span>About Me</span><i className="icon solid fa fa-user"/>
                                </a></li>
                                <li><a href="#contact" id="contact-link"
                                       className="w-full flex justify-between items-center">
                                    <span>Contact</span><i className="icon solid fa fa-envelope"/>
                                </a></li>
                                <li><a href="#posts" id="contact-link"
                                       className="w-full flex justify-between items-center">
                                    <span>Posts</span><i className="icon solid fa fa-envelope"/>
                                </a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="bottom">
                        {/* Social Icons */}
                        <ul className="icons flex justify-end child-mx-2-n-edge">
                            <li><a href="#" className="fa-lg fab fa-twitter"/></li>
                            <li><a href="#" className="fa-lg fab fa-facebook-f"/></li>
                            <li><a href="#" className="fa-lg fab fa-github"/></li>
                            <li><a href="#" className="fa-lg fab fa-dribbble"/></li>
                            <li><a href="#" className="fa-lg fa fa-envelope"/></li>
                        </ul>
                    </div>
                </div>
                {/* Main */}
                <div id="main" className="w-4/5">
                    {/* Intro */}
                    <section id="top" className="relative h-4/5 flex justify-center items-center mb-8 shadow-md">
                        <div className="text-left mx-16">
                            {/*<div className="">*/}
                            {/*    <img src={require("../../../assets/images/profile/tropical-5074304_640.jpg").default}*/}
                            {/*         alt=""*/}
                            {/*         className="absolute top-0 left-0 w-full max-h-full z-neg-10"/>*/}
                            {/*</div>*/}
                            <header className="">
                                <h2 className="font-josesans fs-5 font-bold">{Profile.introduction}</h2>
                            </header>
                            <div className="mt-8">
                                <p className="fs-2 my-8 color-gray-fade-primary">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab asperiores assumenda
                                    aut consequatur deleniti dolore ea eveniet iste libero modi molestias neque possimus
                                    praesentium, quos reiciendis rem ut vel veniam.
                                </p>
                            </div>
                            <footer>
                                <div
                                    className="color-yellow-light mt-8 cursor-pointer font-bold font-roboto border inline-block px-5 py-2">
                                    <a href="">Learn more</a>
                                </div>
                            </footer>
                        </div>
                    </section>
                    {/* Portfolio */}
                    <section id="portfolio"
                             className="flex justify-center items-center text-center px-16 py-16 shadow-md">
                        <div className="text-left">
                            <header>
                                <h2 className="font-josesans fs-5 font-bold">Portfolio</h2>
                            </header>
                            <div className="my-4">
                                <p className="fs-2 my-8 color-gray-fade-primary">
                                    {Profile.portfolio}
                                </p>
                            </div>
                            <div className="flex">
                                {[...Array(3).keys()].map(i => (
                                    <div className="md:w-4/12 pr-4 col-12-mobile w-full">
                                        {Posts.slice(i * 2, i * 2 + 2).map(post => (
                                            <article className="py-4 mt-4 bg-white shadow-md">
                                                <a href="#" className="image fit"><img
                                                    src={post.src || require("../../../assets/images/profile/mockup-3684376_640.jpg").default}
                                                    alt=""/></a>
                                                <header>
                                                    <h5 className="font-josesans text-center fs-2 mt-4">{post.title}</h5>
                                                </header>
                                            </article>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    {/* About Me */}
                    <section id="about" className="flex justify-center items-center text-center px-16 py-16 shadow-md">
                        <div className="text-left">
                            <header>
                                <h2 className="font-josesans text-left font-bold fs-5">About Me</h2>
                            </header>
                            <div className="my-8">
                                <a href="#">
                                    <img src={require("../../../assets/images/profile/pic08.jpg").default} alt=""/>
                                </a>
                            </div>
                            <p className="fs-2 my-8 color-gray-fade-primary">
                                {Profile.about}
                            </p>
                        </div>
                    </section>
                    {/* Contact */}
                    <section id="contact"
                             className="flex justify-center items-center text-center px-16 py-16 shadow-md">
                        <div className="text-left">
                            <header>
                                <h2 className="font-josesans font-bold fs-5">Contact</h2>
                            </header>
                            <p className="fs-2 my-8 color-gray-fade-primary">
                                Elementum sem parturient nulla quam placerat viverra
                                mauris non cum elit tempus ullamcorper dolor. Libero rutrum ut lacinia
                                donec curae mus. Eleifend id porttitor ac ultricies lobortis sem nunc
                                orci ridiculus faucibus a consectetur. Porttitor curae mauris urna mi dolor.
                            </p>
                            <div className="flex">
                                <div className="w-8/12 flex-shrink-0">
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className="w-full px-8 mr-4 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-2"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full px-8 ml-4 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-2"
                                        />
                                    </div>
                                    <div>
                                    <textarea
                                        placeholder="Message"
                                        className="w-full h-48 px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-2"
                                    />
                                    </div>
                                </div>
                                <div className="ml-8">
                                    <div className="">
                                        <p className="fs-2 color-gray-fade-primary">
                                            <i className="fas fa-home fa-1x mt-2 mr-4"/>
                                            1234 Somewhere Rd.
                                            Nashville, TN 00000
                                            United States
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <p className="fs-2 color-gray-fade-primary">
                                            <i className="fas fa-phone fa-1x mt-2 mr-4"/>
                                            000-000-0000
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <p className="fs-2 color-gray-fade-primary">
                                            <i className="fas fa-mail-bulk fa-1x mt-2 mr-4"/>
                                            hello@untitled.tld
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                    {/* Posts */}
                    <section id="posts" className="px-16 py-16 shadow-md">
                        <h2 className="font-josesans font-bold fs-5">Popular Posts</h2>
                        {Posts.length > 0 && (<div className="grid grid-cols-2 gap-8">
                                {Posts.map((post) => (<div className="myl-10">
                                        <PostCardHorizontal post={post}/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                    <Footer/>
                </div>
            </div>
        </>
    );
}