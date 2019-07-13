import React from 'react'
import { theme } from '../theme'

export const Button = props => (
  <button
    css={{
      background: theme.color.purple,
      color: theme.color.white,
      borderRadius: theme.borderRadius,
      fontSize: theme.fontSize.medium,
      fontWeight: theme.fontWeight.bold,
      border: 'none',
      padding: '.8rem 12px',
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      whiteSpace: 'normal',
      willChange: 'box-shadow, transform',
      transition: 'box-shadow 100ms ease-in, transform 100ms ease-in-out',
    }}
    {...props}
  />
)
