import React, {PropsWithChildren, useEffect, useState} from "react";
import Axios from "axios";
import {BLOG_SERVER_URL} from "../../../config/config.js";
import {toast} from "react-toastify";
import HtmlParser from "react-html-parser";
import PageLayout from "../../layouts/PageLayout";
import SideCardOverlay from "../../components/Shared/SideCardOverlay";
import {Link} from "react-router-dom";
import {getRandom} from "../../../helpers/asset_helper";
import {style2object} from "../../../helpers/data_process_helper";
import PostViewModel from "../../../view_models/PostViewModel";
import {PostResponse, PostsResponse} from "../../../interface/PostsResponse";
import ImageEditor from "../../components/EditorComponents/ImageEditor";
import ReactDOM from "react-dom";

const BlogShow = (props: PropsWithChildren<any>) => {
    const blogId = props.match.params.blogId;
    const [Posts, setPosts] = useState<PostViewModel[]>([]);
    const [Post, setPost] = useState<PostViewModel | undefined>(undefined);

    const numPostSide = 4;
    useEffect(() => {
        let data = {
            postId: blogId
        }
        Axios.post<PostResponse>(`${BLOG_SERVER_URL}/getPost`, data)
            .then(response => {
                if (response.data.success) {
                    setPost(new PostViewModel(response.data.doc))
                    // x(new PostViewModel(response.data.doc).content)
                } else {
                    toast.error("Something went wrong when get ShowPost")
                }
            })

        Axios.get<PostsResponse>(`${BLOG_SERVER_URL}/getAllPosts`)
            .then(response => {
                if (response.data.success) {
                    let posts: PostViewModel[] = []
                    response.data.doc.map(post => {
                        let postView = new PostViewModel(post)
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
    }, [blogId]);

    const x = (content: string) => {
        const fragment = document.createRange().createContextualFragment(content ?? Post?.content)
        const attrs = fragment.querySelectorAll("figure")
        attrs.forEach(att => {
            for (let i = 0; i < (att?.attributes?.length || 2); i++) {
                if (att?.attributes[i].nodeName == "style") {
                    const src = att.querySelectorAll("img")?.[0].src
                    const props = {
                        imageSrc: src,
                        style: style2object(att?.attributes[i].nodeValue)
                    }
                    const imageElement = <ImageEditor {...props}/>
                    ReactDOM.render(imageElement, att.parentElement)
                }
            }
        })

        let a = document.getElementById("fucking")
        a?.appendChild(fragment)
    }

    return (
        <PageLayout>
            <div className="d-flex content-around justify-content-around my-16 px-32">
                <section className="w-8/12 mx-5">
                    {Post && (
                        <div id="fucking">
                            {HtmlParser(Post.content)}
                        </div>
                    )}
                </section>
                <section className="w-3/12">
                    <div>
                        <h5 className="fw-8 font-pt-serif pb-4 border-white border-solid border-b-2">Trending
                            Articles</h5>
                        {Posts.slice(0, numPostSide).map((post) => (
                            <SideCardOverlay postViewModel={new PostViewModel(post)} key={post._id}/>
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
                        {Posts.slice(Posts.length - numPostSide).map((post) => (
                            <div className="d-flex mt-5">
                                <img className="img-post-thumbnail" alt=""
                                     src={post.src || require("../../../assets/images/posts/photographer-865295_1920.jpg").default}/>
                                <div className="flex-grow-1 ml-3">
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

            <section className="entry-section mt-24 px-32">
                <div className="flex justify-between my-2">
                    <h5 className="font-josesans color-primary-dark">You may also like</h5>
                    <p className="color-gray-fade-primary">View all</p>
                </div>
                <div className="grid-cols-3 gap-16 grid">
                    {getRandom(Posts, 3).map((post: PostViewModel) => (
                        <div key={post._id}>
                            <div>
                                <img className="img-post-fixed-height"
                                     src={post.src || require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg").default}
                                     alt=""/>
                            </div>
                            <div className="pr-6">
                                <h6 className="mt-lg-5 color-primary-dark font-bold font-josesans letter-space-2 word-space-6">{post.title}</h6>
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

        </PageLayout>
    );
};

export default BlogShow;
