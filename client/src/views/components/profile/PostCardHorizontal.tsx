import React from 'react'
import PostViewModel from "../../../view_models/PostViewModel";
import {Link} from "react-router-dom";
import {extractFirstText} from "../../../helpers/data_process_helper";

interface Prop {
    post: PostViewModel,
    userId?: String | null | undefined
}

const PostCardHorizontal = (props: Prop) => {
    const defaultImage = require("../../../assets/images/posts/beautiful-&-simple.jpg")
    return (
        <div className="container">
            <div className="d-flex flex">
                <img className="img-square-size-small flex-shrink-0"
                     src={props.post.src || defaultImage}
                     alt={props.post.title}/>
                <div className="col-8">

                </div>
                <div className="col-8 text-left ml-5">
                    <h5 className="font-rubik fw-8">{props.post.title}</h5>
                    <div className="mt-2">
                        <a>FOOD</a> - <span className="color-gray-primary italic fs-sm-2">{props.post.createdAt}</span>
                    </div>
                    <div className="mt-4">
                        <p className="line-height-3">{extractFirstText(props.post.content)}</p>
                    </div>

                    <Link to={`/blogs/${props.post._id}`}>
                        <div
                            className="color-yellow-light mt-8 cursor-pointer font-bold font-roboto">Read
                            More<i className="fa fa-arrow-right ml-2"/></div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PostCardHorizontal
