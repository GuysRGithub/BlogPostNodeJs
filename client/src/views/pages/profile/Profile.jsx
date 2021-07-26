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
import Newsletter from "../../components/home/Newsletter";

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
                    <section id="top" className="relative h-screen flex justify-center items-center mb-8 shadow-md">
                        <div className="text-center text-white">
                            <div className="">
                                <img src={require("../../../assets/images/profile/tropical-5074304_640.jpg").default}
                                     alt=""
                                     className="absolute top-0 left-0 w-full max-h-full z-neg-10"/>
                            </div>
                            <header className="w-8/12 text-center mx-auto">
                                <h2 className="font-josesans">{Profile.introduction}</h2>
                            </header>
                            <footer>
                                {/*<div*/}
                                {/*    className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto border inline-block px-5 py-2">*/}
                                {/*    <a href="">Read More</a>*/}
                                {/*</div>*/}
                            </footer>
                        </div>
                    </section>
                    {/* Portfolio */}
                    <section id="portfolio"
                             className="flex justify-center items-center text-center px-16 py-16 shadow-md">
                        <div className="container">
                            <header>
                                <h2 className="font-josesans fs-5 font-bold">Portfolio</h2>
                            </header>
                            <div className="my-4">
                                <p className="fs-2 my-8 color-gray-fade-primary">
                                    {Profile.portfolio}
                                </p>
                            </div>
                            <div className="flex">
                                <div className="w-4/12 pr-4 col-12-mobile">
                                    <article className="py-4">
                                        <a href="#" className="image fit"><img
                                            src={require("../../../assets/images/profile/mockup-3684376_640.jpg").default}
                                            alt=""/></a>
                                        <header>
                                            <h3>Ipsum Feugiat</h3>
                                        </header>
                                    </article>
                                    <article className="py-4">
                                        <a href="#" className="image fit"><img
                                            src={require("../../../assets/images/profile/pic03.jpg").default}
                                            alt=""/></a>
                                        <header>
                                            <h3>Rhoncus Semper</h3>
                                        </header>
                                    </article>
                                </div>
                                <div className="w-4/12 pr-4 col-12-mobile">
                                    <article className="py-4">
                                        <a href="#" className="image fit"><img
                                            src={require("../../../assets/images/profile/photography-3749383_640.jpg").default}
                                            alt=""/></a>
                                        <header>
                                            <h3>Magna Nullam</h3>
                                        </header>
                                    </article>
                                    <article className="py-4">
                                        <a href="#" className="image fit"><img
                                            src={require("../../../assets/images/profile/pic05.jpg").default}
                                            alt=""/></a>
                                        <header>
                                            <h3>Natoque Vitae</h3>
                                        </header>
                                    </article>
                                </div>
                                <div className="w-4/12 pr-4 col-12-mobile">
                                    <article className="py-4">
                                        <a href="#" className="image fit"><img
                                            src={require("../../../assets/images/profile/sunset-4509879_1280.jpg").default}
                                            alt=""/></a>
                                        <header>
                                            <h3>Dolor Penatibus</h3>
                                        </header>
                                    </article>
                                    <article className="py-4">
                                        <a href="#" className="image fit"><img
                                            src={require("../../../assets/images/profile/tropical-5074304_640.jpg").default}
                                            alt=""/></a>
                                        <header>
                                            <h3>Orci Convallis</h3>
                                        </header>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* About Me */}
                    <section id="about" className="flex justify-center items-center text-center px-16 py-16 shadow-md">
                        <div>
                            <header>
                                <h2 className="font-josesans font-bold fs-5">About Me</h2>
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
                        <div className="container">
                            <header>
                                <h2 className="font-josesans font-bold fs-5">Contact</h2>
                            </header>
                            <p className="fs-2 my-8 color-gray-fade-primary">
                                Elementum sem parturient nulla quam placerat viverra
                                mauris non cum elit tempus ullamcorper dolor. Libero rutrum ut lacinia
                                donec curae mus. Eleifend id porttitor ac ultricies lobortis sem nunc
                                orci ridiculus faucibus a consectetur. Porttitor curae mauris urna mi dolor.</p>
                            <Newsletter/>
                        </div>
                    </section>
                    {/* Posts */}
                    <section id="posts" className="px-16 py-16 shadow-md">
                        <h2 className="font-josesans font-bold fs-5">Posts</h2>
                        {Posts.length > 0 && (<div>
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