import React from 'react';
import { LinkAreaAnchor } from './LinkAreaAnchor';
import { theme } from '../theme';
import { Card } from './Card';

export const GoodreadsCard = ({
  book: { imageUrl, bookLink, title, authorLink, name },
}) => (
  <Card
    css={{
      position: 'relative',
      width: 300,
      height: 400,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div
      css={{
        position: 'absolute',
        background: 'linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1))',
        height: '100%',
        width: '100%',
      }}
    />
    <div css={{ position: 'absolute', bottom: 0, padding: theme.space.small }}>
      <div css={{ marginBottom: theme.space.medium }}>
        <LinkAreaAnchor
          href={bookLink}
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
          {title}
        </LinkAreaAnchor>
      </div>
      <div>
        <a
          href={authorLink}
          target="_blank"
          rel="noopener noreferrer"
          css={{
            color: theme.color.white,
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {name}
        </a>
      </div>
    </div>
  </Card>
);
