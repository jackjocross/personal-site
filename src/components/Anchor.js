import React from 'react'

export const Anchor = props => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    {...props}
    css={{ color: 'black' }}
  />
)
