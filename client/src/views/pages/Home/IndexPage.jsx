import React, {useEffect, useState} from "react";
import HeaderLight from "../../components/Shared/HeaderLight";
import FooterLight from "../../components/Shared/FooterLight";
import {Link} from "react-router-dom"
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config";
import {toast} from "react-toastify";
import PostViewModel from "../../../view_models/PostViewModel";
import ImageEditor from "../../components/EditorComponents/ImageEditor";
import * as ReactDOM from "react-dom";

export default function () {

    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        Axios.get(`${BLOG_SERVER_URL}/getAllPosts`)
            .then(response => {
                if (response.data.success) {
                    let posts = []
                    response.data.doc.map(post => {
                        console.log(
                            new Date(parseInt(post._id.toString().substring(0, 8), 16) * 1000)
                        )
                        let postView = new PostViewModel(post)
                        posts.push(postView)
                    })
                    setPosts(posts)
                } else {
                    toast.error("Failed to load posts!")
                }
            })
            .catch(err => {
                toast.error("Something went wrong!")
            })
    }, [])

    const x = (e) => {
        ReactDOM.render(<ImageEditor/>, document.getElementById("fucking"))
    }
    return (<div onLoad={x}>
            <HeaderLight/>

            <section className="entry-section mt-24 px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-dark-primary">Latest posts</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="grid-cols-3 gap-16 grid">
                    {Posts.map((post) => (
                        <div key={post._id}>
                            <div>
                                <img className="img-post-fixed-height"
                                     src={post.src || require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg").default}
                                     alt=""/>
                            </div>
                            <div className="pr-6">
                                <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
                                <p className="color-gray-fade-primary italic fs-sm-2">{post.createdAt}</p>
                                <Link to={`/blogs/${post._id}`}>
                                    <div className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                                        More<i className="fa fa-arrow-right ml-2"/></div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="entry-section mt-24 px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-dark-primary">Popular posts</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="grid-cols-4 gap-16 grid">
                    {Posts.map(post => (
                        <div>
                            <div>
                                <img className="img-post-fixed-height-card"
                                     src={post.src || require("../../../assets/images/posts/GNispE-ssZQyBTMJbGDDsMhq.jpg").default}
                                     alt=""/>
                            </div>
                            <div className="pr-6 bg-white shadow-md px-3 py-5">
                                <h6 className="mt-lg-5 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
                                <p className="color-gray-fade-primary italic fs-sm-2">{post.createdAt}</p>
                                <div className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                                    More<i className="fa fa-arrow-right ml-2"/></div>
                            </div>
                        </div>
                    ))}

                </div>
            </section>

            <section className="mt-24 px-32">
                <div className="relative">
                    <img src={require("../../../assets/images/posts/newsletter.jpg").default} alt=""
                         className="h-128 w-full object-cover"/>
                    <div className="center-inner p-12 bg-white opacity-4-5">
                        <h5 className="font-josesans color-dark-primary">Newsletter subscriber</h5>
                        <p className="color-gray-fade-primary fs-sm-2 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi ipsa maiores nam nulla
                            obcaecati, sapiente similique! Cupiditate dolorum earum nobis non odio odit praesentium,
                            quibusdam reprehenderit tempora temporibus, totam vitae?
                        </p>
                        <div className="mt-2 flex">
                            <input placeholder="Email"
                                   className="focus:outline-none border-solid border-black border px-3"/>
                            <div
                                className="border border-4 border-black border-solid p-3 ml-3 cursor-pointer">Subscribe
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <div id="fucking"></div>

            <FooterLight/>
        </div>
    )
}
