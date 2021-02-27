import React, {useEffect, useState} from "react";
import Sidebar from "../../../components/Sidebar/index.jsx";
import Layout from "../../../layouts/Layout.jsx";
import BlogPostDetail from "../BlogPostDetail.jsx";
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../../config/config.js";
import Card from "../../../components/UI/Card/index.jsx";
import HtmlParser from "react-html-parser";
import Header from "../../../components/Shared/Header.jsx";

const ShowPost = (props) => {

    const postId = props.match.params.postId;
    const [Post, setPost] = useState({
        title: "",
        author: "",
        content: "",
        createdAt: "",
    });

    useEffect(() => {

        console.log("Post Id", postId)

        let data = {
            postId: postId
        }

        Axios.post(`${BLOG_SERVER_URL}/getPost`, data)
            .then(response => {
                if (response.data.success) {
                    setPost(response.data.doc)
                    console.log('Post got:', response.data.doc)
                } else {
                    console.log("Something went wrong when get ShowPost")
                }
            })
    }, []);

    return (
        <div>
            <Header/>
            <section className="container w-100 dark-theme">
                <div className="w-50 mx-auto my-10">
                    <h1 className="title font-ubuntu">{Post.title}</h1>
                    <div className="flex justify-content-between">
                        <div className="flex w-100">
                            <img className="img-avatar text-center"
                                 src={require("../../../../assets/images/others/EHD_Merit.jpg")}/>
                            <div className="w-100">
                                <h4 className="m-0 p-0 ml-3 col-8 title fs-1 color-gray line-height-1 font-italic">Guys Robot</h4>
                                <h6 className="m-0 p-0 ml-3 col-8 color-gray-light line-height-3 font-weight-lighter font-italic font-ubuntu">posted
                                    on {Post.createdAt}: 13 min read</h6>
                            </div>
                        </div>

                        <div className="flex col-4">
                            <i className="fab fa-facebook fa-2x mx-2 cursor-pointer"/>
                            <i className="fab fa-linkedin-in fa-2x mx-2 cursor-pointer"/>
                            <i className="fab fa-instagram fa-2x mx-2 cursor-pointer"/>
                            <i className="far fa-bookmark fa-2x mx-2 cursor-pointer"/>
                        </div>

                    </div>
                </div>
                <div>
                </div>

                <div className="mx-10 p-py1 mt-10 font-pt-serif">
                    {HtmlParser(Post.content)}
                </div>
            </section>

        </div>
    );
};

export default ShowPost;
