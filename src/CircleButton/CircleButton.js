import React from 'react'
import './CircleButton.css'
import propTypes from 'prop-types'

export default function NavCircleButton(props) {
  const { tag, className, children, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['NavCircleButton', props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

NavCircleButton.defaultProps = {
  tag: 'a',
}

NavCircleButton.propTypes = {
  tag: propTypes.oneOfType([
    propTypes.func, propTypes.string
  ]).isRequired,
  className: propTypes.string.isRequired,
  children: propTypes.array.isRequired
}