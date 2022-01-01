import React, {useEffect, useState} from 'react'
import Axios from "axios";
import {UPLOAD_SERVER_URL} from "../../../config/config.js";
import {USER_GET_MEDIA_SERVER_URL} from "../../../config/router_path";
import {toast} from "react-toastify";

function MediaLibrary({onImageChosenCallback, ...props}) {
    const [Images, setImages] = useState([]);
    const [ImageSelectedPath, setImageSelectedPath] = useState("");

    useEffect(() => {
        Axios.get(`${USER_GET_MEDIA_SERVER_URL}`)
            .then(response => {
                if (response.data.success) {
                    setImages(response.data.doc.images)
                }
            })
    }, [])

    const handleOnButtonOkClicked = () => {
        const popup = window.document.getElementById("popup-pick-media")
        onImageChosenCallback(ImageSelectedPath)
        if (popup == null) {
            const popupInner = document.getElementById('textField')?.contentWindow?.document?.getElementById("popup-pick-media")
            if (popupInner == null) return
            popupInner.style['display'] = "none"
            return;
        }
        popup.style['display'] = "none"
    }

    const handleOnButtonCancelClicked = () => {
        const popup = window.document.getElementById("popup-pick-media")
        if (popup == null) {
            const popupInner = document.getElementById('textField')?.contentWindow?.document?.getElementById("popup-pick-media")
            if (popupInner == null) return
            popupInner.style['display'] = "none"
            return;
        }
        popup.style['display'] = "none"
    }

    const onButtonUploadClicked = () => {
        document.getElementById("media-file-upload").click()
    }

    const onFileUploadChange = (e) => {
        console.log(e.target.files)
        const files = e.target.files
        if (files == null) return

        const formData = new FormData();
        const config = {
            header: {"content-type": "multipart/form-data"},
        };
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append('post_images', file, file.name);
        }

        Axios.post(`${UPLOAD_SERVER_URL}/images`, formData, config).then(
            (response) => {
                if (response.data.success) {
                    setImages([...Images, ...response.data.imagesPath])
                    // e.target.files = []
                    toast.success("Failed to upload image");
                } else {
                    toast.error("Failed to upload image");
                }
            }
        );

    };
    return (
        <div id="popup-pick-media" className="py-12" style={{background: "#F2F3FB",}} {...props}>
            <div className="d-flex w-10/12 rounded-lg overflow-hidden mx-auto"
                 style={{height: "88vh", background: "#F8F9FF"}}>
                <div className="d-flex flex-col justify-content-center justify-content-between h-full bg-white p-2"
                     style={{boxShadow: "3px 0 3px -2px #ac8c8c99"}}>
                    <div>
                        <div className="py-5 border-solid border-gray-200 d-flex justify-content-center">
                            <i className="fab fs-1 fa-autoprefixer"/>
                        </div>
                        <div className="py-5 d-flex flex-col justify-content-center align-items-center">
                            <i className="far fs-1 fa-image"/>
                            <span className="fs-sm-1 font-bold line-height-2">Image</span>
                        </div>
                        <div className="py-5 d-flex flex-col justify-content-center align-items-center">
                            <i className="fas fs-1 fa-photo-video"/>
                            <span className="fs-sm-1 font-bold line-height-2">Video</span>
                        </div>
                        <div className="py-5 d-flex flex-col justify-content-center align-items-center">
                            <i className="fas fs-1 fa-columns"/>
                            <span className="fs-sm-1 font-bold line-height-2">Layout</span>
                        </div>
                        <div className="py-5 d-flex flex-col justify-content-center align-items-center">
                            <i className="fas fs-1 fa-palette"/>
                            <span className="fs-sm-1 font-bold line-height-2">Style</span>
                        </div>
                        <div className="py-5 d-flex flex-col justify-content-center align-items-center">
                            <i className="fa fs-1 fa-music"/>
                            <span className="fs-sm-1 font-bold line-height-2">Music</span>
                        </div>
                    </div>
                    <div>
                        <div className="py-5 d-flex flex-col justify-content-center align-items-center">
                            <i className="fas fs-1 fa-tools"/>
                            <span className="fs-sm-1 font-bold line-height-2">Setting</span>
                        </div>
                    </div>

                </div>

                <div className="w-5/12 py-2 mx-3 rounded-md height-min-content">
                    {/*  */}
                    <div className="bg-white rounded-md px-3 py-2">
                        <div
                            className="d-flex justify-between">
                            <div className="d-flex w-6/12 justify-between align-items-center">
                                <div className="fs-sm-2 font-bold line-height-3">Library</div>
                                <div className="fs-sm-2 font-bold line-height-3">Media</div>
                                <div className="fs-sm-2 font-bold line-height-3">Project</div>
                            </div>
                            <div className="button-cart d-inline-block">
                                <div
                                    onClick={onButtonUploadClicked}
                                    className="d-flex font-roboto outline-none-imp font-weight-bold align-items-center duration-500 custom-btn-rounded bg-blue-600">
                                    <i className="fa fa-upload mr-3 duration-500"/>Upload
                                </div>
                                <input type="file" multiple hidden={true} id="media-file-upload"
                                       onChange={onFileUploadChange}/>

                            </div>
                        </div>
                        <hr className="my-1"/>
                        <div className="d-flex justify-content-between my-3">
                            <div className="control d-flex justify-content-start w-8/12">
                                <div
                                    className="col-2 border-solid rounded-r-md p-2 cursor-pointer border-1 border-color-default p-0 m-0 align-items-center d-flex flex-column justify-content-center">
                                    <i className="fa fa-search font-bold"/>
                                </div>
                                <input type="text" placeholder="Search"
                                       className="input flex-grow-1 w-full py-2 rounded-lg font-medium bg placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white placeholder-gray-800 rounded-r-none-imp border-right-0"/>
                            </div>
                            <div
                                className="col-2 border-solid rounded-r-md p-2 cursor-pointer border-1 border-color-default p-0 m-0 align-items-center d-flex flex-column justify-content-center">
                                <i className="fas fa-sliders-h font-bold"/>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="flex flex-col justify-between align-items-end" style={{maxHeight: "70vh"}}>

                        <div className="overflow-y-scroll mt-5 p-3 rounded-md bg-white shadow scroll-bar-none flex-grow"
                             style={{maxHeight: "80%", width: "100%"}}>
                            <div className=""
                                 style={{columns: "4", columnGap: "8px"}}>
                                {Images.map((image, index) => (
                                    <div key={`${image}_container`}
                                         onClick={() => {
                                             const imagePath = `${process.env.REACT_APP_SERVER_URL}${image}`
                                             if (ImageSelectedPath === imagePath) {
                                                 setImageSelectedPath("")
                                             } else {
                                                 setImageSelectedPath(imagePath)
                                             }
                                         }}
                                         className="relative mb-2">
                                        <img
                                            // style={{minWidth: "300px", width: "300px", height: "240px"}}
                                            src={`${process.env.REACT_APP_SERVER_URL}${image}`}
                                            alt={`ProductImg-${index}`}
                                            key={`${image}_${index}`}
                                        />
                                        <i className={`absolute top-0 left-0 ml-1 mt-1 fa fa-sm fa-check-circle
                                         // ${ImageSelectedPath === (process.env.REACT_APP_SERVER_URL + image) ? "text-blue-600" : "text-gray-600"}`}
                                        />
                                    </div>

                                ))}
                            </div>

                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/beach-1867881_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img*/}
                            {/*        src={require("../../../assets/images/posts/cestovat-chladny-dno-jednoduchost-2868847.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/old-1130731_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/holiday-2880261_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/sunrise-1014710_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/traveller-1149973_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/travel-1756150_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/holiday-2880261_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/man-1246233_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/fitness-blog-post.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/photographer-865295_1920.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/beautiful-&-simple.jpg")}/>*/}
                            {/*</div>*/}
                            {/*<div>*/}
                            {/*    <img src={require("../../../assets/images/posts/GNispE-ssZQyBTMJbGDDsMhq.jpg")}/>*/}
                            {/*</div>*/}
                        </div>

                        <div className="flex justify-between w-6/12 mt-3">
                            <div onClick={handleOnButtonCancelClicked}
                                 className="d-flex font-roboto outline-none-imp font-weight-bold align-items-center duration-500 custom-btn-rounded bg-blue-600">
                                <i className="fa fa-window-close mr-3 duration-500"/>Cancel
                            </div>

                            <div onClick={handleOnButtonOkClicked}
                                 className="d-flex font-roboto outline-none-imp font-weight-bold align-items-center duration-500 custom-btn-rounded bg-blue-600">
                                <i className="fa fa-check-circle mr-3 duration-500"/>OK
                            </div>
                        </div>

                    </div>
                </div>


                <div className="flex-1 py-2 rounded-md height-min-content mr-3">
                    <div className="bg-white rounded-md py-2 flex-1">
                        <div
                            className="d-flex justify-end">
                            <div className="button-cart d-inline-block mr-4">
                                <div
                                    onClick={onButtonUploadClicked}
                                    className="d-flex font-roboto outline-none-imp font-weight-bold align-items-center duration-500 custom-btn-rounded bg-blue-600">
                                    <i className="fa fa-save mr-3 duration-500"/>Save
                                </div>
                                <input type="file" multiple hidden={true} id="media-file-upload"
                                       onChange={onFileUploadChange}/>

                            </div>
                            <div className="button-cart d-inline-block">
                                <div onClick={onButtonUploadClicked}
                                     className="d-flex font-roboto outline-none-imp font-weight-bold align-items-center duration-500 custom-btn-rounded bg-blue-600">
                                    <i className="fa fa-puzzle-piece mr-3 duration-500"/>Publish
                                </div>
                                <input type="file" multiple hidden={true} id="media-file-upload"
                                       onChange={onFileUploadChange}/>

                            </div>


                        </div>


                        <hr className="my-3"/>

                        <div className="p-3 mt-5 rounded-md bg-white shadow">
                            <h4 className="font-pt-serif font-bold my-2">Collections <i className="fa fa-pencil-alt"/>
                            </h4>
                            <div className="overflow-y-scroll scroll-bar-none"
                                 style={{maxHeight: "32rem", width: "100%"}}>

                                <div className="grid grid-cols-3 gap-3"
                                     style={{columnGap: "8px"}}>
                                    {Images.map((image, index) => (
                                        <div key={`${image}_container`} className="h-48 relative">
                                            <img
                                                // style={{minWidth: "300px", width: "300px", height: "240px"}}
                                                src={`${process.env.REACT_APP_SERVER_URL}${image}`}
                                                alt={`ProductImg-${index}`}
                                                key={`${image}_${index}`}
                                                className="object-cover h-full w-full rounded-md"
                                            />

                                            <div
                                                className="absolute bottom-0 bg-white p-3 m-3 rounded-md d-flex flex-col align-items-start"
                                                style={{
                                                    background: "#4a585226",
                                                    backdropFilter: "blur(4px)"
                                                }}>
                                                <h6 className="fs-1 font-pt-serif line-height-1 text-white font-bold">Shot
                                                    1</h6>
                                                <span className="fs-sm-1 font-pt-serif text-white opacity-50">Lorem ipsum dolor sit amet</span>
                                                <div
                                                    className="items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none bg-indigo-700 text-indigo-100 rounded-full">My
                                                    Album
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>


                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/holiday-2880261_1920.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/sunrise-1014710_1920.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/traveller-1149973_1920.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/travel-1756150_1920.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/holiday-2880261_1920.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/man-1246233_1920.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/fitness-blog-post.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/photographer-865295_1920.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/beautiful-&-simple.jpg")}/>*/}
                                {/*</div>*/}
                                {/*<div>*/}
                                {/*    <img src={require("../../../assets/images/posts/GNispE-ssZQyBTMJbGDDsMhq.jpg")}/>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MediaLibrary