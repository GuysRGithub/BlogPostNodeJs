import React, {useEffect, useState} from "react";
import "../../../../assets/css/blog_homstyle.scss";
import Card from "../../../components/UI/Card/index.jsx";
import RecentPost from "../RecentPost.jsx";
import blogData from "../../../../data/blog.json";
import Layout from "../../../layouts/Layout.jsx";
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../../config/config.js";
import BlogHeader from "../../../components/BlogHeader/index.jsx";
import BlogNavBar from "../../../components/Navbar/index.jsx";
import {Link, Switch} from "react-router-dom";
import blogPost from "../../../../data/blog.json";
import ReactHTMLParser from "react-html-parser"
import {getSrcFromPostContent, removePostImageFromPostContent} from "../../../../helpers/data_process_helper.js";
import PostCard from "../../../components/Shared/PostCard.jsx";
import PostSeparateViewModel from "../../../../view_models/post_separate_view_model.js";
import Header from "../../../components/Shared/Header.jsx";
import PostCardGrid from "../../../components/Shared/PostCardGrid.jsx";
import SideCard from "../../../components/Shared/SideCard.jsx";

const BlogPostIndex = (props) => {

    const [Posts, setPosts] = useState([]);
    const [ImagesSrc, setImagesSrc] = useState([]);
    const [PostsText, setPostsText] = useState([]);

    // const srcReg = /<img\s+src=["'](.+?)["'](?:.+?)>/

    useEffect(() => {
        Axios.get(`${BLOG_SERVER_URL}/getAllPosts`)
            .then(response => {
                if (response.data.success) {
                    // setPosts(response.data.doc)
                    let posts = []
                    console.log("Loaded Posts: ", response.data.doc)
                    // let postsText = []
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
                        let postView = new PostSeparateViewModel(post)
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
                    alert("Failed to load posts...")
                }
            })
            .catch(err => {
                alert("Something went wrong!")
                console.log(err)
            })
    }, [])

    const ImageGallery = (props) => (
        <div className="galleryPost" style={props.galleryStyle}>
            <section className="postGalleryImage" style={{width: "70%"}}>
                <div>
                    <img
                        // src={require(imagePath("posts/" + props.imagesArray[2]))}
                        src={require("../../../../assets/images/posts/" + props.imagesArray[2])}
                        alt="Home"
                    />
                </div>
            </section>
            <section className="sideImageWrapper" style={{width: "30%"}}>
                <SideImage
                    height={sideImageHeight}
                    source={require("../../../../assets/images/posts/" + props.imagesArray[1])}
                />
                <SideImage
                    height={sideImageHeight}
                    source={require("../../../../assets/images/posts/" + props.imagesArray[2])}
                />
                <SideImage
                    height={sideImageHeight}
                    source={require("../../../../assets/images/posts/" + props.imagesArray[4])}
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
        <div className="dark-theme">
            <Header/>
            <div className="d-flex content-around justify-content-around mt-16">

                <section className="w-8/12 mx-5">

                    {Posts.length > 0 && (
                        <div className="grid grid-cols-2 gap-8 mx-auto">
                            {Posts.map((post) => (
                                PostCardGrid({postViewSeparate: post})
                            ))}
                        </div>
                    )}

                </section>
                <section className="w-3/12">
                    <div>
                        <h5 className="fw-8 font-pt-serif pb-4 border-white border-solid border-b-2">Trending
                            Articles</h5>
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
                            <img className="img-post-thumbnail"
                                 src={require("../../../../assets/images/posts/rowan-chestnut-175871-unsplash-205x300.jpg")}/>
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

        </div>
    );
};

export default BlogPostIndex;
