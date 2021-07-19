import React, {useEffect, useState} from "react";
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config.js";
import {toast} from "react-toastify";
import SideCard from "../../components/shared/SideCard.jsx";
import PageLayout from "../../layouts/PageLayout";
import {Link} from "react-router-dom";
import PostViewModel from "../../../view_models/PostViewModel.js";

const BlogIndex = () => {

    const [Posts, setPosts] = useState([]);
    const numPostSide = 4;

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
                    toast.error("Failed to load posts!")
                }
            })
            .catch(err => {
                toast.error("Something went wrong!")
            })
    }, [])

    return (
        <PageLayout>
            {/*<HeaderLight/>*/}
            <div className="flex flex-wrap justify-between my-16 px-16">
                <div className="xl:w-8/12 md:w-100">
                    <section className="entry-section px-5">
                        <div className="flex justify-between my-2">
                            <h5 className="font-josesans color-primary-dark">Latest posts</h5>
                            <p className="color-gray-fade-primary">View all</p>
                        </div>
                        <div className="sm:grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-16 grid">
                            {Posts.map((post) => (
                                <div key={post._id}>
                                    <div>
                                        <img className="img-post-fixed-height"
                                             src={post.src || require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg").default}
                                             alt=""/>
                                    </div>
                                    <div className="pr-6">
                                        <h6 className="mt-3 color-primary-dark font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
                                        <p className="color-gray-fade-primary italic fs-sm-2">{post.createdAt}</p>
                                        <Link to={`/blogs/${post._id}`}>
                                            <div
                                                className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                                                More<i className="fa fa-arrow-right ml-2"/></div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="entry-section mt-24">
                        <div className="flex justify-between my-2">
                            <h5 className="font-josesans color-primary-dark">Popular posts</h5>
                            <p className="color-gray-fade-primary">View all</p>
                        </div>
                        <div className="sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:gap-16 grid">
                            {Posts.map(post => (
                                <div>
                                    <div>
                                        <img className="img-post-fixed-height-card"
                                             src={post.src || require("../../../assets/images/posts/GNispE-ssZQyBTMJbGDDsMhq.jpg").default}
                                             alt=""/>
                                    </div>
                                    <div className="pr-6 bg-white shadow-md px-3 py-5">
                                        <h6 className="mt-lg-5 color-primary-dark font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
                                        <p className="color-gray-fade-primary italic fs-sm-2">{post.createdAt}</p>
                                        <div
                                            className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                                            More<i className="fa fa-arrow-right ml-2"/></div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </section>
                </div>

                <section className="xl:w-3/12 md:w-100">
                    <div>
                        <h5 className="fw-8 font-pt-serif pb-4 border-white border-solid border-b-2">Trending
                            Articles</h5>
                        <div
                            className="md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-1">
                            {Posts.map((post) => (
                                <>
                                    {SideCard({postViewSeparate: post})}
                                </>
                            ))}
                        </div>

                    </div>
                    <div className="mt-break">
                        <h5 className="fw-8 font-pt-serif pb-4 border-white border-solid border-b-2">Follow Us</h5>
                        <div>
                            <ul className="icons d-flex content-between justify-content-between">
                                <li><a href="#" className="icon brands fa-twitter"><span
                                    className="label">Twitter</span></a>
                                </li>
                                <li><a href="#" className="icon fab brands fa-facebook-f"/></li>
                                <li><a href="#" className="icon fab brands fa-github"/></li>
                                <li><a href="#" className="fab brands fa-dribbble"/>
                                </li>
                                <li><a href="#" className="fab solid fa-instagram"/></li>
                                <li><a href="#" className="fab solid fa-youtube"/></li>
                                <li><a href="#" className="fab solid fa-linkedin-in"/></li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-break">
                        <h5 className="fw-8 font-pt-serif pb-4 border-white border-solid border-b-2">Recommend
                            Articles</h5>
                        {Posts.slice(Posts.length - numPostSide).map((post) => (
                            <div className="flex mt-5">
                                <div className="img-post-thumbnail flex-shrink-0">
                                    <img className="img-post-thumbnail" alt="" width="96" height="96"
                                         src={post.src || require("../../../assets/images/posts/photographer-865295_1920.jpg").default}/>
                                </div>
                                <div className="ml-3">
                                    <h6 className="fw-6 font-pt-serif fs-1">
                                        {post.title}
                                    </h6>
                                    <p className="fs-sm-2 fw-5 font-pt-serif color-fade">Lifestyle, Travel</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </section>
            </div>

        </PageLayout>
    );
};

export default BlogIndex;
