import React from 'react'

const SideCard = ({postViewSeparate = {title: "Title", "createdAt": "Today", content: "Content"}}) => {
    const defaultImage = require("../../assets/images/posts/beautiful-&-simple.jpg")
    return (
        <div>
            <div className="d-flex img-hover-blur mt-8">
                <img className="" style={{width: "100%", objectFit: "cover"}}
                     src={postViewSeparate.src || defaultImage}
                />
            </div>
            <div className="mt-4">
                <h5 className="fw-6 font-pt-serif hover-color-primary cursor-pointer">{postViewSeparate.title}</h5>
                <p className="font-pt-serif fs-1 color-fade hover-color-white duration-500 cursor-pointer">Life
                    style, Travel</p>
            </div>
        </div>
    )

}

export default SideCard