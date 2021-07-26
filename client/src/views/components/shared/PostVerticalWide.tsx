import React from 'react'
import {Link} from "react-router-dom";
import PostViewModel from "../../../view_models/PostViewModel";

interface Prop {
    post: PostViewModel,
    userId?: String | null | undefined
}

const PostVerticalWide = (props: Prop)  => {
    return (<>
            <div>
                <img className="img-post-fixed-height"
                     src={props.post.src || require("../../../assets/images/posts/affection-baby-baby-girl-beautiful-377058.jpg").default}
                     alt=""/>
            </div>
            <div className="pr-6">
                <h6 className="mt-3 color-primary-dark font-bold font-josesans letter-space-2 word-space-6 max-line-2">{props.post.title}</h6>
                <p className="color-gray-primary font-bold italic fs-sm-2">{props.post.createdAt}</p>
                <div className="flex justify-between">
                    <Link to={`/blogs/${props.post._id}`}>
                        <div
                            className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Read
                            More<i className="fa fa-arrow-right ml-2"/></div>
                    </Link>

                    {props.post.authorId === props.userId && (
                        <Link to={`/blogs/edit/${props.post._id}`}>
                            <div
                                className="color-yellow-light mt-3 cursor-pointer font-bold font-roboto">Edit<i
                                className="fa fa-arrow-right ml-2"/></div>
                        </Link>
                    )}

                </div>
            </div>
        </>
    )
}

export default PostVerticalWide