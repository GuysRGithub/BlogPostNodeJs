import React from 'react'
import {getSrcFromPostContent, removePostImageFromPostContent} from "../../../helpers/data_process_helper.js";
import {Link} from "react-router-dom";
import HtmlParser from "react-html-parser";

const PostCardVertical = ({postViewSeparate = {title: "Title", "createdAt": "Today", content: "Content"}}) => {
    const defaultImage = require("../../../assets/images/posts/beautiful-&-simple.jpg")
    return (
        <div className="container">

            <div className="d-flex flex">
                <img className="img-square-size-default"
                     src={postViewSeparate.src || defaultImage}
                />
                <div className="col-8">

                </div>
                <div className="col-8 text-left ml-5">
                    <a>FOOD</a> - <span className="fw-3">July 8 2020</span>
                    <h5 className="font-rubik fw-8">5-MINUTE BREAKFASTS THAT ARE ACTUALLY HEALTHY</h5>
                    <div className="flex d-flex fs-1 mt-2">
                    </div>
                    <div className="mt-3">
                        <p className="line-height-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
                            dicta eos
                            exercitationem,</p>
                    </div>

                    <div className="custom-btn-primary-lg p-0-imp px-3-imp mt-5">Read More</div>

                </div>
            </div>
        </div>
    )
}

export default PostCardVertical
