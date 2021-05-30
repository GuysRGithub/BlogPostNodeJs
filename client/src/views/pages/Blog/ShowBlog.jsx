import React, {useEffect, useState} from "react";
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config.js";
import {toast} from "react-toastify";
import HtmlParser from "react-html-parser";
import PageLayout from "../../layouts/PageLayout";
import PostSeparateViewModel from "../../../view_models/post_separate_view_model";
import SideCard from "../../components/Shared/SideCard";
import SideCardOverlay from "../../components/Shared/SideCardOverlay";

const ShowBlog = (props) => {
    const blogId = props.match.params.blogId;
    const [Posts, setPosts] = useState([]);
    const [Post, setPost] = useState({
        title: "",
        author: "",
        content: "",
        createdAt: "",
    });

    useEffect(() => {
        let data = {
            postId: blogId
        }
        Axios.post(`${BLOG_SERVER_URL}/getPost`, data)
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.doc)
                    console.log('Post got:', response.data.doc)
                } else {
                    toast.error("Something went wrong when get ShowPost")
                }
            })

        Axios.get(`${BLOG_SERVER_URL}/getAllPosts`)
            .then(response => {
                if (response.data.success) {
                    let posts = []
                    response.data.doc.map(post => {
                        let postView = new PostSeparateViewModel(post)
                        posts.push(postView)
                    })
                    setPosts(posts)
                } else {
                    toast.error("Failed to load posts...")
                }
            })
            .catch(err => {
                toast.error("Something went wrong!", err)
            })
    }, []);

    return (
        <PageLayout>
            {/*<HeaderLight/>*/}
            <div className="d-flex content-around justify-content-around my-16 px-32">
                <section className="w-8/12 mx-5">
                    {Post && (
                        <div>
                            {HtmlParser(Post.content)}
                        </div>
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
                            SideCardOverlay({postViewSeparate: post})
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

export default ShowBlog;
