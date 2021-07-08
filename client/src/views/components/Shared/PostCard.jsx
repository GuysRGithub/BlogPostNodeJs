import React from 'react'
import {Link} from "react-router-dom";
import HtmlParser from "react-html-parser";

const PostCard = ({postViewSeparate = {title: "Title", "createdAt": "Today", content: "Content"}}) => {
    const defaultImage = require("../../../assets/images/posts/beautiful-&-simple.jpg")
    return (
        <div>
            <article className="post m-5 border">
                <header className="flex px-5 py-5 content-between justify-between border-bottom">
                    <div className="col-9 text-uppercase border-right-dark-gray">
                        <h2 className="letter-space-8 fs-3 fw-10 mt-10"><a href="">{postViewSeparate.title}</a></h2>
                        <p className="fw-3 fs-sm-2 letter-space-3 mb-10 font-pt-serif">Lorem ipsum dolor amet nullam consequat etiam
                            feugiat</p>
                    </div>
                    <div className="meta mt-10 col-3 mt-2">
                        <div className="fs-1 letter-space-3 fw-6 flex justify-content-end"
                             dateTime="2015-10-25">NOVEMBER 1, 2015{postViewSeparate.createdAt}</div>
                        <div className="flex justify-end mt-2">
                            <a href="#" className="link-primary mt-2 fs-sm-2 flex justify-content-end">Jane Doe</a>
                            <img className="img-avatar ml-5"
                                 src={require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg")} alt=""/>
                        </div>

                    </div>
                </header>
                <div className="div m-5">
                    <a href="" className="image featured">
                        <img className="post-feature-image-fixed-size"
                            src={postViewSeparate.src || defaultImage}
                            alt=""/></a>
                </div>
                <div className="mx-5 font-pt-serif">
                    <p>{HtmlParser(postViewSeparate.content)}</p>
                    <footer className="d-flex justify-content-between">
                        <div className="mx-0 px-0">
                            <ul className="actions list-unstyled">
                                <Link to={`/blogs/posts/${postViewSeparate._id}`} className="custom-btn-primary-lg large">Continue Reading</Link>
                                {/*<li><a href="single.html" className="button large"></a></li>*/}
                            </ul>
                        </div>
                        <div className="d-flex d-flex flex justify-content-between">
                            <ul className="stats d-flex justify-content-between content-between">
                                <li className="list-unstyled"><a href="#" className="mr-2 link-primary">General</a></li>
                                <li className="list-unstyled icon solid fa-heart "><a href="#" className="mx-2 link-primary">28</a>
                                </li>
                                <li className="list-unstyled icon solid fa-comment"><a href="#" className="mx-2 link-primary">128</a>
                                </li>
                            </ul>
                        </div>


                    </footer>
                </div>

            </article>
        </div>
    )
}

export default PostCard
