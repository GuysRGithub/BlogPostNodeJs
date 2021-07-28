import React from 'react'

const PopupLink = ({onApply, text = ""}) => {
    // let text = ""
    let link = ""

    const handleClick = function () {
        onApply(text, link)
    }

    return (
        <div id="popup-add-link" className="child-my-2 w-4/12 m-2 rounded-md p-3 bg-gray-200 shadow-xl" contentEditable="false" style={{}}>
            <div>
                <label className="fs-2">Text: </label>
                <input id="input-text-add-link" type="text" defaultValue={text}
                       tabIndex="1"
                       placeholder="Input text here"
                       className="rounded focus:border-blue-500 outline-none ml-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-"
                       onChange={function (e) {
                           text = e.target.value
                       }}/>
            </div>
            <div>
                <label className="fs-2">Link: </label>
                <input id="input-link-add-link" type="text"
                       tabIndex="2"
                       placeholder="Input link here"
                       className="rounded focus:border-blue-500 outline-none ml-3 px-8 py-4 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:border focus:shadow-md my-"
                       onChange={function (e) {
                           link = e.target.value
                       }}/>
            </div>

            <div className="flex justify-end">
                <button
                    className="flex outline-none-imp font-weight-bolder fs-1 align-items-center duration-500 py-2 px-4"
                    onClick={handleClick}>
                    <i className="fas fa-lg fa-times text-red-900"/>
                </button>

                <button
                    className="flex outline-none-imp font-weight-bolder fs-1 align-items-center duration-500 py-2 px-4"
                    onClick={handleClick}>
                    <i className="fas fa-lg fa-check text-green-400"/>
                </button>
            </div>

        </div>
    )
}


export default PopupLink