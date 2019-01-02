import React from 'react';
import { theme } from '../theme';

export const Input = ({ component: Component = 'input', ...rest }) => (
  <Component
    css={{
      display: 'block',
      width: 'calc(100% - 2em)',
      borderRadius: 6,
      border: `1px solid ${theme.color.cloud}`,
      fontSize: 'inherit',
      fontFamily: theme.fontFamily,
      padding: '.8em 1em',
      background: theme.color.white,
      ':focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${
          theme.color.platinum
        }, 0 0 0 4px rgba(0, 0, 0, .3)`,
      },
      '::placeholder': {
        color: theme.color.platinum,
      },
      WebkitAppearance: 'none',
    }}
    {...rest}
  />
);
