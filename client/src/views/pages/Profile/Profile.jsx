import React, {useEffect, useState} from 'react'
// import "../../assets/css/html_template_style/main.scss"
// import "./profile.scss"
// import "../../assets/css/profile.scss"
import PostCardVertical from "../../components/Shared/PostCardVertical.jsx";
import Axios from "axios";
import {BLOG_SERVER_URL, USER_SERVER_URL} from "../../../config/config.js";
import PostViewModel from "../../../view_models/PostViewModel.js";
import PostCard from "../../components/Shared/PostCard.jsx";
import {isAuth} from "../../../helpers/auth";
import {Redirect} from "react-router-dom";
import {USER_GET_PROFILE_SERVER_URL} from "../../../config/router_path";


export const Profile = (props) => {

    const [Posts, setPosts] = useState([]);
    const [Profile, setProfile] = useState({});

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        Axios.get(`${BLOG_SERVER_URL}/getAllPosts`)
            .then(response => {
                if (response.data.success) {
                    // setPosts(response.data.doc)
                    let posts = []
                    console.log("Loaded Posts: ", response.data.doc)
                    response.data.doc.map(post => {
                        // let match = post.content.match(srcReg)

                        // console.log("Author", post.author)
                        let content = post.content
                        // let postView = {
                        //     id: post._id,
                        //     title: post.title,
                        //     author: post.author,
                        //     content: removePostImageFromPostContent(content),
                        //     src: getSrcFromPostContent(content)
                        // }
                        let postView = new PostViewModel(post)
                        posts.push(postView)
                        // postsText.push(post.content.replace(match[0]))
                        // return match[1]
                    })
                    // console.log("Text", postsText)

                    // setImagesSrc(images)
                    // console.log("Images Src", images)

                    setPosts(posts)
                    console.log("Post Processed: ", posts)
                } else {
                    // alert("Failed to load posts...")
                }
            })
            .catch(err => {
                // alert("Something went wrong!")
                console.log(err)
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
                    // alert("Failed to load posts...")
                }
            })
            .catch(err => {
                // alert("Something went wrong!")
                console.log(err)
            })
    }, [])


    return (
        <div className="dark-theme">
            {!isAuth() ? <Redirect to="/login"/> : null}
            <div id="header-profile">
                <div className="top">
                    {/* Logo */}
                    <div id="logo">
                        <span className="image"><img className="img-avatar" src={require("../../../assets/images/profile/cat-4977436_640.jpg")} alt=""/></span>
                        <h1 id="title" className="font-jose-sans">{user.name}</h1>
                        <p className="mt-3 font-pt-serif">Hyperspace Engineer</p>
                    </div>
                    {/* Nav */}
                    <nav id="nav">
                        <ul>
                            <li><a href="#top" id="top-link"><span className="icon solid fa-home">Intro</span></a></li>
                            <li><a href="#portfolio" id="portfolio-link"><span
                                className="icon solid fa-th">Portfolio</span></a></li>
                            <li><a href="#about" id="about-link"><span
                                className="icon solid fa-user">About Me</span></a></li>
                            <li><a href="#contact" id="contact-link"><span
                                className="icon solid fa-envelope">Contact</span></a></li>
                            <li><a href="#posts" id="contact-link"><span
                                className="icon solid fa-envelope">Posts</span></a></li>
                        </ul>
                    </nav>
                </div>
                <div className="bottom">
                    {/* Social Icons */}
                    <ul className="icons">
                        <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a>
                        </li>
                        <li><a href="#" className="icon brands fa-facebook-f"><span
                            className="label">Facebook</span></a></li>
                        <li><a href="#" className="icon brands fa-github"><span className="label">Github</span></a></li>
                        <li><a href="#" className="icon brands fa-dribbble"><span className="label">Dribbble</span></a>
                        </li>
                        <li><a href="#" className="icon solid fa-envelope"><span className="label">Email</span></a></li>
                    </ul>
                </div>
            </div>
            {/* Main */}
            <div id="main">
                {/* Intro */}
                <section id="top" className="one dark cover background-dark">
                    <div className="container">
                        <header>
                            <h2 className="alt">{Profile.introduction}</h2>
                            {/*<p>Ligula scelerisque justo sem accumsan diam quis<br/>*/}
                            {/*    vitae natoque dictum sollicitudin elementum.</p>*/}
                        </header>
                        <footer>
                            <a href="#portfolio" className="button scrolly">Magna Aliquam</a>
                        </footer>
                    </div>
                </section>
                {/* Portfolio */}
                <section id="portfolio" className="two background-dark">
                    <div className="container">
                        <header>
                            <h2>Portfolio</h2>
                        </header>
                        <div className="mb-3">
                            <p>{Profile.portfolio}</p>
                        </div>
                        <div className="row">
                            <div className="col-4 col-12-mobile">
                                <article className="item">
                                    <a href="#" className="image fit"><img
                                        src={require("../../../assets/images/profile/mockup-3684376_640.jpg")} alt=""/></a>
                                    <header>
                                        <h3>Ipsum Feugiat</h3>
                                    </header>
                                </article>
                                <article className="item">
                                    <a href="#" className="image fit"><img
                                        src={require("../../../assets/images/profile/pic03.jpg")} alt=""/></a>
                                    <header>
                                        <h3>Rhoncus Semper</h3>
                                    </header>
                                </article>
                            </div>
                            <div className="col-4 col-12-mobile">
                                <article className="item">
                                    <a href="#" className="image fit"><img
                                        src={require("../../../assets/images/profile/photography-3749383_640.jpg")} alt=""/></a>
                                    <header>
                                        <h3>Magna Nullam</h3>
                                    </header>
                                </article>
                                <article className="item">
                                    <a href="#" className="image fit"><img
                                        src={require("../../../assets/images/profile/pic05.jpg")} alt=""/></a>
                                    <header>
                                        <h3>Natoque Vitae</h3>
                                    </header>
                                </article>
                            </div>
                            <div className="col-4 col-12-mobile">
                                <article className="item">
                                    <a href="#" className="image fit"><img
                                        src={require("../../../assets/images/profile/sunset-4509879_1280.jpg")} alt=""/></a>
                                    <header>
                                        <h3>Dolor Penatibus</h3>
                                    </header>
                                </article>
                                <article className="item">
                                    <a href="#" className="image fit"><img
                                        src={require("../../../assets/images/profile/tropical-5074304_640.jpg")} alt=""/></a>
                                    <header>
                                        <h3>Orci Convallis</h3>
                                    </header>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
                {/* About Me */}
                <section id="about" className="three background-dark">
                    <div className="container">
                        <header>
                            <h2>About Me</h2>
                        </header>
                        <a href="#" className="image featured"><img
                            src={require("../../../assets/images/profile/pic08.jpg")} alt=""/></a>
                        <p>{Profile.about}</p>
                    </div>
                </section>
                {/* Contact */}
                <section id="contact" className="four background-dark">
                    <div className="container">
                        <header>
                            <h2>Contact</h2>
                        </header>
                        <p>Elementum sem parturient nulla quam placerat viverra
                            mauris non cum elit tempus ullamcorper dolor. Libero rutrum ut lacinia
                            donec curae mus. Eleifend id porttitor ac ultricies lobortis sem nunc
                            orci ridiculus faucibus a consectetur. Porttitor curae mauris urna mi dolor.</p>
                        <form method="post" action="#">
                            <div className="row">
                                <div className="col-6 col-12-mobile"><input type="text" name="name" placeholder="Name"/>
                                </div>
                                <div className="col-6 col-12-mobile"><input type="text" name="email"
                                                                            placeholder="Email"/></div>
                                <div className="col-12">
                                    <textarea name="message" placeholder="Message" defaultValue={""}/>
                                </div>
                                <div className="col-12">
                                    <input type="submit" defaultValue="Send Message"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Posts */}
                <section id="posts" className="background-dark">
                    <header>
                        <h2>Posts</h2>
                    </header>
                    {Posts.length > 0 && (<div>
                            {Posts.map((post) => (<div className="myl-10">
                                    {PostCardVertical({postViewSeparate: post})}
                                </div>

                            ))}
                        </div>
                    )}
                    {/*{PostCardVertical({})}*/}
                </section>
            </div>
            {/* Footer */}
            <div id="footer" className="background-dark">
                {/* Copyright */}
                <ul className="copyright">
                    <li>© Untitled. All rights reserved.</li>
                    <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                </ul>
            </div>
        </div>
    );
}