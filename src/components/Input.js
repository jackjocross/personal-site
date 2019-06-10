import React from 'react'
import { theme } from '../theme'

export const Input = ({ component: Component = 'input', ...rest }) => (
  <Component
    css={{
      display: 'block',
      width: 'calc(100% - 1.5rem)',
      borderRadius: theme.borderRadius,
      border: `2px solid ${theme.color.gray}`,
      fontSize: theme.fontSize.medium,
      fontFamily: theme.fontFamily,
      padding: '.85rem .75rem',
      background: theme.color.cloud,
      ':focus': {
        outline: 'none',
        border: `2px solid ${theme.color.purple}`,
        background: theme.color.white,
      },
      ':hover': {
        background: theme.color.white,
      },
      '::placeholder': {
        color: theme.color.platinum,
      },
      WebkitAppearance: 'none',
    }}
    {...rest}
  />
)
