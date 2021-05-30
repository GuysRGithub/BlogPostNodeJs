import React from 'react'

const SideCardOverlay = ({postViewSeparate = {title: "Title", "createdAt": "Today", content: "Content"}}) => {
    const defaultImage = require("../../../assets/images/posts/RzaDRA3Stct09BOROS6C-TE5.jpg").default
    return (
        <div className="mt-5 relative">
            <img className="" style={{width: "100%", objectFit: "cover"}}
                 src={postViewSeparate.src || defaultImage} alt=""
            />
            <div className="flex-grow-1 ml-3 card-description-overlay">
                <h6 className="fw-6 font-pt-serif fs-1">
                    {postViewSeparate.title}
                    {postViewSeparate.createdAt}
                </h6>
                <p className="fs-sm-2 fw-5 font-pt-serif color-fade">Lifestyle, Travel</p>
            </div>
        </div>
    )
}

export default SideCardOverlay