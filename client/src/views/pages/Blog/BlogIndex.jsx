import React, {useEffect, useState} from "react";
import "../../../assets/css/blog_homstyle.scss";
import RecentPost from "../Blog/RecentPost.jsx";
import blogData from "../../../data/blog.json";
import Layout from "../../layouts/Layout.jsx";
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config.js";
import BlogHeader from "../../components/BlogHeader";
import BlogNavBar from "../../components/Navbar";
import {Link, Switch} from "react-router-dom";
import blogPost from "../../../data/blog.json";
import ReactHTMLParser from "react-html-parser"
import {getSrcFromPostContent, removePostImageFromPostContent} from "../../../helpers/data_process_helper.js";
import PostCard from "../../components/Shared/PostCard.jsx";
import PostSeparateViewModel from "../../../view_models/post_separate_view_model.js";
import Header from "../../components/Shared/Header.jsx";
import PostCardGrid from "../../components/Shared/PostCardGrid.jsx";
import SideCard from "../../components/Shared/SideCard.jsx";
import {toast} from "react-toastify";
import HeaderLight from "../../components/Shared/HeaderLight";
import PageLayout from "../../layouts/PageLayout";
import HtmlParser from "react-html-parser";

const BlogIndex = (props) => {

    const [Posts, setPosts] = useState([]);
    const [ImagesSrc, setImagesSrc] = useState([]);
    const [PostsText, setPostsText] = useState([]);
    // const srcReg = /<img\s+src=["'](.+?)["'](?:.+?)>/

    useEffect(() => {
        Axios.get(`${BLOG_SERVER_URL}/getAllPosts`)
            .then(response => {
                if (response.data.success) {
                    let posts = []
                    console.log("Loaded Posts: ", response.data.doc)
                    // let postsText = []
                    response.data.doc.map(post => {
                        let content = post.content
                        let postView = new PostSeparateViewModel(post)
                        posts.push(postView)
                    })
                    setPosts(posts)
                    console.log("Post Processed: ", posts)
                } else {
                    toast.error("Failed to load posts...")
                }
            })
            .catch(err => {
                toast.error("Something went wrong!")
                console.log(err)
            })
    }, [])

    const ImageGallery = (props) => (
        <div className="galleryPost" style={props.galleryStyle}>
            <section className="postGalleryImage" style={{width: "70%"}}>
                <div>
                    <img
                        // src={require(imagePath("posts/" + props.imagesArray[2]))}
                        src={require("../../../assets/images/posts/" + props.imagesArray[2])}
                        alt="Home"
                    />
                </div>
            </section>
            <section className="sideImageWrapper" style={{width: "30%"}}>
                <SideImage
                    height={sideImageHeight}
                    source={require("../../../assets/images/posts/" + props.imagesArray[1])}
                />
                <SideImage
                    height={sideImageHeight}
                    source={require("../../../assets/images/posts/" + props.imagesArray[2])}
                />
                <SideImage
                    height={sideImageHeight}
                    source={require("../../../assets/images/posts/" + props.imagesArray[4])}
                />
            </section>
        </div>
    );

    const SideImage = (props) => {
        return (
            <div style={{height: `${props.height}px`}}>
                <img src={props.source} alt="Home"/>
            </div>
        );
    };

    const galleryHeight = 450;

    const galleryStyle = {
        height: galleryHeight + "px",
        overflow: "hidden",
    };

    const sideImageHeight = galleryHeight / 3;

    const imgArray = blogData.data.map((post) => post.blogImage);

    return (
        <PageLayout>
            {/*<HeaderLight/>*/}
            <div className="d-flex content-around justify-content-around my-16 px-32">
                <section className="w-8/12 mx-5">

                    {Posts.length > 0 && (
                        <div>
                            {Posts.map((post) => (<div>{HtmlParser(post.content)}</div>))}
                        </div>
                        //     <div className="grid grid-cols-2 gap-8 mx-auto">
                        //         {/*{Posts.map((post) => (*/}
                        //         {/*    PostCardGrid({postViewSeparate: post})*/}
                        //         {/*))}*/}
                        //     </div>
                    )}

                </section>
                <section className="w-3/12">
                    <div>
                        <h5 className="fw-8 font-pt-serif pb-4 border-white border-solid border-b-2">Trending
                            Articles</h5>
                        <div className="mt-5 relative">
                            <img className="" alt=""
                                 src={require("../../../assets/images/posts/GNispE-ssZQyBTMJbGDDsMhq.jpg").default}/>
                            <div className="flex-grow-1 ml-3 card-description-overlay">
                                <h6 className="fw-6 font-pt-serif fs-1">
                                    50 Amazing Examples of Portrait Photography
                                </h6>
                                <p className="fs-sm-2 fw-5 font-pt-serif color-fade">Lifestyle, Travel</p>
                            </div>
                        </div>

                        {Posts.map((post) => (
                            SideCard({postViewSeparate: post})
                        ))}
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
                        <div className="d-flex mt-5">
                            <img className="img-post-thumbnail" alt=""
                                 src={require("../../../assets/images/posts/photographer-865295_1920.jpg").default}/>
                            <div className="flex-grow-1 ml-3">
                                <h6 className="fw-6 font-pt-serif fs-1">
                                    50 Amazing Examples of Portrait Photography
                                </h6>
                                <p className="fs-sm-2 fw-5 font-pt-serif color-fade">Lifestyle, Travel</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </PageLayout>
    );
};

export default BlogIndex;