import React from 'react'
import PropTypes from 'prop-types'

export default function Box(props) {
  const { children } = props
  return <div {...props}>{children}</div>
}

Box.propTypes = {}
