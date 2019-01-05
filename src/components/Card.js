import React from 'react';
import { theme } from '../theme';
import { LinkArea } from './LinkArea';

export const Card = ({ component: Component = LinkArea, ...rest }) => (
  <Component
    css={{
      borderRadius: theme.borderRadius,
      overflow: 'hidden',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      whiteSpace: 'normal',
      willChange: 'box-shadow, transform',
      transition: 'box-shadow 100ms ease-in, transform 100ms ease-in-out',
      ':hover': {
        transform: 'scale(1.02)',
        boxShadow: `0 0 0 2px ${
          theme.color.black
        }, 0 0 0 4px rgba(0, 0, 0, .3)`,
      },
      ':active': {
        transform: 'scale(.98)',
      },
      fontSize: theme.fontSize.medium,
    }}
    {...rest}
  />
);
