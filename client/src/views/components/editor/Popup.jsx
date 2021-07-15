import React from 'react'

const PopupLink = ({onApply, text= ""}) => {
    // let text = ""
    let link = ""

    const handleClick = function () {
        onApply(text, link)
    }

    return (
        <div id="popup-add-link" className="child-my-2 w-4/12 m-2 rounded-md p-3 bg-gray-200 shadow-xl" style={{
        }}>
            <div>
                <label className="font-josesans fs-2 text-gray-600">Text</label>
                <input id="input-text-add-link" type="text" defaultValue={text} className="rounded focus:border-blue-500 outline-none ml-3"
                onChange={function (e) {
                    text = e.target.value
                }}/>
            </div>
            <div>
                <label className="font-josesans fs-2 text-gray-600">Link</label>
                <input id="input-link-add-link" type="text" className="rounded focus:border-blue-500 outline-none ml-3"
                onChange={function (e) {
                    link = e.target.value
                }}/>
            </div>

            <button
                className="d-flex font-roboto outline-none-imp font-weight-bolder fs-1 align-items-center duration-500 py-2 px-4 ml-auto"
                onClick={handleClick}>
                Apply
            </button>
        </div>
    )
}


export default PopupLink