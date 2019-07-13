import React from 'react'
import Tilt from 'react-tilt'
import { theme } from '../theme'
import { LinkArea } from './LinkArea'

export const Card = ({ component: Component = LinkArea, ...rest }) => (
  <Tilt options={{ max: 10, scale: 1.02 }}>
    <Component
      css={{
        borderRadius: theme.borderRadius,
        background: 'white',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        whiteSpace: 'normal',
        willChange: 'box-shadow, transform',
        transition: 'box-shadow 100ms ease-in, transform 100ms ease-in-out',
        fontSize: theme.fontSize.medium,
        ':active': {
          transform: 'scale(.98)',
        },
      }}
      {...rest}
    />
  </Tilt>
)
