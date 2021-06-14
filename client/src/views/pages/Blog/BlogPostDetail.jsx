import React, {useState, useEffect} from "react";
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config.js";
import Card from "../../components/UI/Card/index.jsx";
import HtmlParser from "react-html-parser";
import "../../../assets/css/detail_post_style.scss";
import PostViewModel from "../../../view_models/PostViewModel";

const BlogPostDetail = (props) => {

    const postId = props.match.params.postId;
    const [Post, setPost] = useState<PostViewModel>({});

    useEffect(() => {
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
        <div className="blogPostContainer">
            <Card>
                <div className="blogHeader">
                    {/*<span className="blogCategory">{Post.category}</span>*/}
                    <h1 className="postTitle">{Post.title}</h1>
                    <span className="postBy">posted on {Post.createdAt} by {Post.author}</span>
                </div>
                {/*<div className="postImageContainer">*/}
                {/*    <img*/}
                {/*        src={getSrcFromPostContent(Post.content)}*/}
                {/*        alt="ShowPost"*/}
                {/*    />*/}
                {/*</div>*/}

                <div className="postContent font-pt-serif">
                    {HtmlParser(Post.content)}
                </div>
            </Card>
        </div>
    );
};

export default BlogPostDetail;
