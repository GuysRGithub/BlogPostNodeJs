import React, {useEffect, useState} from "react";
import "../../../assets/css/BlogHomeStyle.css";
import Card from "../../components/UI/Card";
import RecentPost from "./RecentPost";
import blogData from "../../../data/blog.json";
import Layout from "../../Layout/Layout";
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/Config";
import BlogHeader from "../../components/BlogHeader/BlogHeader";
import BlogNavBar from "../../components/Navbar";
import {Link, Switch} from "react-router-dom";
import Hero from "../../components/Hero";
import blogPost from "../../../data/blog.json";
import ReactHTMLParser from "react-html-parser"
import "../../../assets/css/blog_home.scss"
import {getSrcFromPostContent, removePostImageFromPostContent} from "../../../helpers/DataProcessHelper";

const BlogHome = (props) => {

    const [Posts, setPosts] = useState([]);
    const [ImagesSrc, setImagesSrc] = useState([]);
    const [PostsText, setPostsText] = useState([]);

    // const srcReg = /<img\s+src=["'](.+?)["'](?:.+?)>/

    useEffect(() => {
        Axios.get(`${BLOG_SERVER_URL}/getAllPosts`)
            .then(response => {
                if (response.data.success) {
                    setPosts(response.data.doc)
                    let posts = []
                    console.log("Loaded Posts: ", response.data.doc)
                    // let postsText = []
                    response.data.doc.map(post => {
                        // let match = post.content.match(srcReg)

                        // console.log("Author", post.author)
                        let content = post.content
                        let postView = {
                            id: post._id,
                            title: post.title,
                            author: post.author,
                            content: removePostImageFromPostContent(content),
                            src: getSrcFromPostContent(content)
                        }
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
        <div>
            <BlogHeader/>
            <Hero/>

            <Card>
                <ImageGallery
                    largeWidth="70%"
                    smallWidth="30%"
                    sideImageHeight={sideImageHeight}
                    galleryStyle={galleryStyle}
                    imagesArray={imgArray}
                />
            </Card>
            <section className="homeContainer">
                <Layout>
                    <div style={props.style}>
                        {Posts.map((post) => (
                            <Card key={post.id} style={{marginBottom: "20px"}}>
                                <div className="postImageWrapper">
                                    <img
                                        src={post.src}
                                        alt="Home ShowPost"
                                    />
                                </div>

                                <div className="postContent">
                                    {/*<span className="feature">{post.blogCategory}</span>*/}
                                    <h2>{post.Title}</h2>
                                    <span>
                                        posted on <strong>{post.createdAt}</strong> by<strong>{post.author.firstname}</strong>
                                    </span>
                                    <div>
                                        {ReactHTMLParser(post.content)}
                                        {/*{post.content.slice(0, 200) + "..."}*/}
                                    </div>

                                    <Link to={"/blogs/posts/" + post.id}>
                                        <button id={post.id}>Read More</button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                    {/*<RecentPost style={{width: "70%"}}/>*/}
                </Layout>
            </section>
        </div>
    );
};

export default BlogHome;
