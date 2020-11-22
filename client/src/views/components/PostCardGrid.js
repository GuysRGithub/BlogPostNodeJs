import React from 'react'
import {getSrcFromPostContent, removePostImageFromPostContent} from "../../helpers/DataProcessHelper";
import {Link} from "react-router-dom";
import HtmlParser from "react-html-parser";

const PostCardGrid = ({postViewSeparate = {title: "Title", "createdAt": "Today", content: "Content"}}) => {
    const defaultImage = require("../../assets/images/posts/beautiful-&-simple.jpg")
    return (
        <div className="m-1 dark-shadow">

            <div className="d-flex img-hover-blur">
                    <img className="" style={{width: "100%", objectFit: "cover"}}
                         src={postViewSeparate.src || defaultImage}
                    />
            </div>
            <div>
                <div className="col-8 text-left px-6">
                    <div className="fs-sm-2 color-fade">
                        <a className="fw-3">FOOD</a> - <span className="fw-3 color-fade">July 8 2020</span>
                    </div>
                    <h5 className="font-ubuntu fw-8 fs-2 hover-color-primary cursor-pointer duration-500">5-MINUTE BREAKFASTS THAT ARE ACTUALLY HEALTHY</h5>
                    <div className="flex d-flex fs-1 mt-2">
                    </div>
                    <div className="mt-1">
                        <p className="line-height-2 fs-1 font-pt-serif color-fade hover-color-white duration-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid dicta eos
                            exercitationem, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci
                            aliquam cupiditate dicta </p>
                    </div>

                    <div className="custom-btn-primary-lg p-0-imp px-3-imp my-5 border-0">Read More</div>

                </div>
            </div>
        </div>
    )
}

export default PostCardGrid
