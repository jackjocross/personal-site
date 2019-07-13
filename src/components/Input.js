import React from 'react'
import { theme } from '../theme'

export const Input = ({ component: Component = 'input', ...rest }) => (
  <Component
    css={{
      display: 'block',
      width: 'calc(100% - 1.7rem)',
      borderRadius: theme.borderRadius,
      border: `2px solid ${theme.color.gray}`,
      fontSize: theme.fontSize.medium,
      padding: '.85rem 12px',
      background: theme.color.cloud,
      transition: 'background ease-in 80ms',
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
