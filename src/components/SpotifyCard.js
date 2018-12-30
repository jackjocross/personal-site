import React from 'react';
import { LinkArea } from './LinkArea';
import { theme } from '../theme';
import { LinkAreaAnchor } from './LinkAreaAnchor';
import artistImageSrc from './artist.jpg';

export const SpotifyCard = ({
  name,
  external_urls: { spotify: spotifyUrl },
  images: [{ url }],
}) => (
  <LinkArea
    css={{
      position: 'relative',
      borderRadius: theme.borderRadius,
      overflow: 'hidden',
      cursor: 'pointer',
      width: 300,
      height: 300,
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
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
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
        href={spotifyUrl}
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
          fontWeight: 500,
        }}
      >
        {name}
      </LinkAreaAnchor>
    </div>
  </LinkArea>
);
