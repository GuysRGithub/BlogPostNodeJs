import React from 'react'
import PostViewModel from "../../../view_models/PostViewModel";
import {Link} from "react-router-dom";
import {extractFirstText} from "../../../helpers/data_process_helper.js";

interface Prop {
    post: PostViewModel,
    userId?: String | null | undefined
}

const PostCardHorizontal = (props: Prop) => {
    const defaultImage = require("../../../assets/images/posts/beautiful-&-simple.jpg")
    return (
        <div className="bg-white shadow-md">
            <div className="d-flex flex items-stretch">
                    <img className="img-square-width-small object-cover flex-shrink-0"
                         src={props.post.src || defaultImage}
                         alt={props.post.title}/>
                <div className="w-8/12 text-left ml-5 pr-4 my-4">
                    <h5 className="font-rubik fw-8 max-line-2">{props.post.title}</h5>
                    <div className="">
                        <span className="color-gray-primary italic fs-sm-2">{props.post.createdAt}</span>
                    </div>
                    <div className="mt-2">
                        <p className="max-line-4">{extractFirstText(props.post.content)}</p>
                    </div>
                    <Link to={`/blogs/${props.post._id}`}>
                        <div
                            className="color-yellow-light mt-4 cursor-pointer font-bold font-roboto">Read
                            More<i className="fa fa-arrow-right ml-2"/></div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCardHorizontal
