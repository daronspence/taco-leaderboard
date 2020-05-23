import React from 'react'

export default function Box(props) {
    return <div {...props}>{props.children}</div>
}
