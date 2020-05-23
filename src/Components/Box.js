import React from 'react'
import PropTypes from 'prop-types'

export default function Box({ children, ...props }) {
  return <div {...props}>{children}</div>
}

Box.propTypes = {
  children: PropTypes.array,
}
