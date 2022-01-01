// noinspection JSUnusedGlobalSymbols

import React, {useState} from "react";
import DropZone from "react-dropzone";
import Axios from "axios";

function FileUpload(props) {
    const [Images, setImages] = useState([]);

    const onDrop = (files) => {
        console.log("Files Chosen", files)
        let formData = new FormData();
        const config = {
            header: {"content-type": "multipart/form-data"},
        };

        // formData.append("file", files[0]);
        // formData.append("file2", files[1]);
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append('post_images', file, file.name);
        }

        Axios.post("/api/uploads/images", formData, config).then(
            (response) => {
                if (response.data.success) {
                    setImages([...Images, response.data.imagesPath[0]]);
                    if (props.refreshFunction) {
                        props.refreshFunction([...Images, response.data.image]);
                    }
                } else {
                    alert("Failed to upload image");
                }
            }
        );
    };

    const onDeleteImage = (image) => {
        const currentIndex = Images.indexOf(image);
        let newImages = [...Images];
        newImages.slice(currentIndex, 1);
        setImages(newImages);
        props.refreshFunction(newImages);
    };

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <DropZone onDrop={onDrop} multiple={true} maxSize={40 * 1024 * 1024}>
                {({getRootProps, getInputProps}) => {
                    return (
                        <div
                            className=""
                            style={{
                                width: "300px",
                                height: "240px",
                                border: "1px solid lightgray",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            {...getRootProps()}
                        >
                            {/* {console.log("getRootProps", { ...getRootProps() })}
              {console.log("getInputProps", { ...getInputProps() })} */}
                            <input {...getInputProps()} />
                        </div>
                    );
                }}
            </DropZone>

            <div
                style={{
                    display: "flex",
                    width: "350px",
                    height: "240px",
                    overflowX: "scroll",
                }}
            >
                {Images.map((image, index) => (
                    <div onClick={() => onDeleteImage(image)}>
                        <img
                            style={{minWidth: "300px", width: "300px", height: "240px"}}
                            src={`${process.env.REACT_APP_SERVER_URL}${image}`}
                            alt={`ProductImg-${index}`}
                            key={`${image}_${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUpload;
