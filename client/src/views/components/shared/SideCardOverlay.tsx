import React from 'react'
import PostViewModel from "../../../view_models/PostViewModel";
import {Link} from "react-router-dom";

const SideCardOverlay = ({postViewModel = new PostViewModel()}) => {
    const defaultImage = require("../../../assets/images/posts/RzaDRA3Stct09BOROS6C-TE5.jpg").default
    return (
        <div className="mt-16 relative">
            <img className="" style={{width: "100%", objectFit: "cover"}}
                 src={postViewModel.src || defaultImage} alt=""
            />
            <div className="flex-grow-1 card-description-overlay">
                <Link to={`/blogs/${postViewModel._id}`}>
                    <h6 className="fw-6 font-pt-serif fs-1">
                        {postViewModel.title}
                    </h6>
                    <p className="color-gray-fade-primary fs-1">
                        {postViewModel.createdAt}
                    </p>
                </Link>
                <p className="fs-sm-2 fw-5 font-pt-serif color-fade">Lifestyle, Travel</p>
            </div>
        </div>
    )
}

export default SideCardOverlay