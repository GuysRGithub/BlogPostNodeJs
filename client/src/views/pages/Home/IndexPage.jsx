import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom"
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config";
import {toast} from "react-toastify";
import PostViewModel from "../../../view_models/PostViewModel";
import {getCookie} from "../../../helpers/data_process_helper";
import {getRandom} from "../../../helpers/asset_helper";
import PageLayout from "../../layouts/PageLayout";

const jwt = require("jsonwebtoken");

export default function () {

    const [posts, setPosts] = useState([]);
    const userId = jwt.decode(getCookie("token"))?.["_id"];

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
            .catch(_ => {
                toast.error("Something went wrong!")
            })
    }, [])

    return (<PageLayout>

            <section className="entry-section mt-24 px-16 xl:px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-dark-primary">Latest posts</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="lg:grid-cols-3 md:grid-cols-2 lg:gap-8 xl:gap-16 grid">
                    {posts.map((post) => (
                        <div key={post._id}>
                            <div>
                                <img className="img-post-fixed-height"
                                     src={post.src || require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg").default}
                                     alt=""/>
                            </div>
                            <div className="pr-6">
                                <h6 className="mt-3 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
                                <p className="color-gray-fade-primary italic fs-sm-2">{post.createdAt}</p>
                                <div className="flex justify-between">
                                    <Link to={`/blogs/${post._id}`}>
                                        <div
                                            className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                                            More<i className="fa fa-arrow-right ml-2"/></div>
                                    </Link>

                                    {post.authorId === userId && (
                                        <Link to={`/blogs/edit/${post._id}`}>
                                            <div
                                                className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Edit<i
                                                className="fa fa-arrow-right ml-2"/></div>
                                        </Link>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="entry-section mt-24 px-16 xl:px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-dark-primary">Popular posts</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-16 lg:gap-8 md:gap-8 grid">
                    {posts.map(post => (
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

            <section className="mt-24 px-16 xl:px-32">
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
                                   className="focus:outline-none border-solid border-black border px-3 fs-1 color-dark-primary"/>
                            <div
                                className="border border-4 border-black border-solid p-3 ml-3 cursor-pointer">Subscribe
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section className="mt-24 px-16 xl:px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-dark-primary">Top posts</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="flex justify-between flex-wrap lg:flex-no-wrap">
                    <div className="lg:w-6/12 md:w-100 lg:mr-6">
                        {getRandom(posts, 1).map((post) => (
                            <div key={post._id} className="flex flex-col h-full">
                                <img className="flex-grow object-cover"
                                     src={post.src || require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg").default}
                                     alt=""/>

                                <div className="pr-6">
                                    <h6 className="mt-3 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
                                    <p className="color-gray-fade-primary italic fs-sm-2">{post.createdAt}</p>
                                    <div className="flex justify-between">
                                        <Link to={`/blogs/${post._id}`}>
                                            <div
                                                className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                                                More<i className="fa fa-arrow-right ml-2"/></div>
                                        </Link>

                                        {post.authorId === userId && (
                                            <Link to={`/blogs/edit/${post._id}`}>
                                                <div
                                                    className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Edit<i
                                                    className="fa fa-arrow-right ml-2"/></div>
                                            </Link>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:w-6/12 md:w-100 grid sm:grid_cols-1 xl:grid-cols-2 gap-6">
                        {getRandom(posts, 4).map((post) => (
                            <div key={post._id}>
                                <div>
                                    <img className="img-post-fixed-height"
                                         src={post.src || require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg").default}
                                         alt=""/>
                                </div>
                                <div className="pr-6">
                                    <h6 className="mt-3 color-dark-primary font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
                                    <p className="color-gray-fade-primary italic fs-sm-2">{post.createdAt}</p>
                                    <div className="flex justify-between">
                                        <Link to={`/blogs/${post._id}`}>
                                            <div
                                                className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                                                More<i className="fa fa-arrow-right ml-2"/></div>
                                        </Link>

                                        {post.authorId === userId && (
                                            <Link to={`/blogs/edit/${post._id}`}>
                                                <div
                                                    className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Edit<i
                                                    className="fa fa-arrow-right ml-2"/></div>
                                            </Link>
                                        )}

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/*<div id="fucking"/>*/}
            <section className="entry-section mt-24 px-16 xl:px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-dark-primary">Popular Travel Posts</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="lg:grid-cols-4 md:grid-cols-2 grid-custom-row lg:gap-8 xl:gap-8 grid">
                    {posts.slice(0, 6).map((post, index) => (
                        <div key={post._id} className={"rounded-md relative overflow-hidden " + (index === 0 || index === 5 ? 'col-span-2' : 'row-span-2')}>
                            <div className="h-full w-full">
                                <img className="h-full w-full object-cover"
                                     src={post.src || require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg").default}
                                     alt=""/>
                            </div>
                            <div className="pr-6 absolute transform m-5 bottom-0">
                                <h6 className="mt-3 text-white font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
                                <p className="color-white-fade-primary italic fs-sm-2">{post.createdAt}</p>
                                <div className="flex justify-between">
                                    <Link to={`/blogs/${post._id}`}>
                                        <div
                                            className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                                            More<i className="fa fa-arrow-right ml-2"/></div>
                                    </Link>

                                    {post.authorId === userId && (
                                        <Link to={`/blogs/edit/${post._id}`}>
                                            <div
                                                className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Edit<i
                                                className="fa fa-arrow-right ml-2"/></div>
                                        </Link>
                                    )}

                                </div>
                            </div>
                            <div className="absolute top-0 m-5 right-0 py-1 px-5 rounded-3xl bg-white">
                                <p className="color-dark-primary font-bold uppercase fs-sm-2">Traveller</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </PageLayout>
    )
}
