import React from 'react';
import { LinkArea } from './LinkArea';
import { theme } from '../theme';
import { LinkAreaAnchor } from './LinkAreaAnchor';

export const FoursquareCard = ({
  venue: {
    id,
    name,
    location: { lat, lng },
  },
}) => (
  <LinkArea
    css={{
      position: 'relative',
      borderRadius: theme.borderRadius,
      overflow: 'hidden',
      cursor: 'pointer',
      width: 320,
      height: 320,
      display: 'flex',
      flexDirection: 'column',
      whiteSpace: 'normal',
      willChange: 'box-shadow',
      transition: 'box-shadow 100ms ease-in',
      ':hover': {
        boxShadow: `0 0 0 2px ${
          theme.color.black
        }, 0 0 0 4px rgba(0, 0, 0, .3)`,
      },
      backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&markers=${lat},${lng}&zoom=15&size=400x400&scale=2&maptype=roadmap&key=${
        process.env.GOOGLE_KEY
      })`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div
      css={{
        position: 'absolute',
        background: 'linear-gradient(rgba(0,0,0,0) 61%, rgba(0,0,0, .83))',
        height: '100%',
        width: '100%',
      }}
    />
    <div css={{ position: 'absolute', bottom: 0, padding: theme.space.small }}>
      <LinkAreaAnchor
        href={`https://foursquare.com/v/${id}`}
        target="_blank"
        rel="noopener noreferrer"
        css={{
          fontSize: theme.fontSize.large,
          textDecoration: 'none',
          ':hover': {
            textDecoration: 'underline',
          },
          color: theme.color.white,
          wordBreak: 'break-word',
          marginBottom: theme.space.medium,
          fontWeight: 500,
        }}
      >
        {name}
      </LinkAreaAnchor>
    </div>
  </LinkArea>
);
