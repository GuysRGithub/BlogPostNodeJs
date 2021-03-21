import React from 'react'
import PropTypes from 'prop-types'

const PopupLink = () => {
  return (
      <div id="popup-add-link" className="child-my-2 w-3/12">
        <div>
          <label className="font-josesans fs-2 text-gray-600">Text</label>
          <input type="text" className="rounded focus:border-blue-500 outline-none ml-3"/>
        </div>
        <div>
          <label className="font-josesans fs-2 text-gray-600">Link</label>
          <input type="text" className="rounded focus:border-blue-500 outline-none ml-3"/>
        </div>

        <button
            className="d-flex font-roboto outline-none-imp font-weight-bolder fs-1 align-items-center duration-500 py-2 px-4 ml-auto">
          Apply
        </button>
      </div>
  )
}


export default PopupLink