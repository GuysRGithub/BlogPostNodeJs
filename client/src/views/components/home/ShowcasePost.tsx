import React from 'react'
import PostViewModel from "../../../view_models/PostViewModel";
import {Link} from "react-router-dom";
import {extractFirstText} from "../../../helpers/data_process_helper.js";

const ShowcasePost = (post: PostViewModel, numbering: number = 1) => {
    return (
        <section className="mt-24 px-16 xl:px-32">
            <div className="flex justify-center sm:flex-wrap lg:flex-no-wrap align-items-center">
                <h1 className="p-8 m-8 shadow-md font-bold font-ubuntu">{('0' + numbering).slice(-2)}</h1>
                <h1 className="font-bold mx-16 uppercase font-ubuntu w-full">{post && post.title}</h1>
                <div className="lg:mr-32 sm:mx-16 sm:mt-8">
                    <p className="font-pt-serif">
                        {post && extractFirstText(post.content)}
                    </p>
                    <Link to={`/blogs/${post && post._id}`}>
                        <div
                            className="color-yellow-light mt-5 cursor-pointer font-bold font-roboto">Read
                            More<i className="fa fa-arrow-right ml-2"/></div>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ShowcasePost
