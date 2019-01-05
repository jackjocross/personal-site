import React from 'react';
import { theme } from '../theme';

export const Button = props => (
  <button
    css={{
      background: theme.color.pink,
      color: theme.color.white,
      borderRadius: theme.borderRadius,
      fontFamily: theme.fontFamily,
      fontSize: 'inherit',
      border: 'none',
      padding: theme.space.small,
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      whiteSpace: 'normal',
      willChange: 'box-shadow, transform',
      transition: 'box-shadow 100ms ease-in, transform 100ms ease-in-out',
      ':hover': {
        transform: 'scale(1.02)',
      },
      ':focus': {
        transform: 'scale(1.02)',
      },
      ':active': {
        transform: 'scale(.98)',
      },
    }}
    {...props}
  />
);
