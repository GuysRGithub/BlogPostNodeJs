import React from 'react'

const Card = (props) => {
  return (
    <div
        width={props.width ? props.width : "100%"} {...props}>
        {props.children}
    </div>
  )
}

export default Card
