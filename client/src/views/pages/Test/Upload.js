import React from 'react'
import FileUpload from "../../components/Upload/FileUpload.jsx";

function Upload() {
    const handleOnChange = (e) => {
        console.log(e.target.files[0])
    }

    const updateImage = () => {

    }
    return (
        <div className="w-100 h-100">
            <h3 className="font-weight-bold">Select Or Upload Image</h3>
            <div className="d-flex justify-content-center align-items-center" style={{height: "75vh"}}>
                <div className="w-50 text-center">
                    <span>Drop or Select Files</span>
                    <div className="text-center">
                        {/*<input type="file" accept="image/*" title=" " multiple onChange={handleOnChange}/>*/}
                        <FileUpload refreshFunction={updateImage}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upload