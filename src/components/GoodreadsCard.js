import React from 'react';
import { LinkAreaAnchor } from './LinkAreaAnchor';
import { theme } from '../theme';
import { Card } from './Card';

export const GoodreadsCard = ({
  book: { imageUrl, bookLink, title, authorLink, name },
}) => (
  <Card
    css={{
      border: `1px solid ${theme.color.cloud}`,
      padding: theme.space.small,
      width: 200,
      height: `calc(100% - 2 * ${theme.space.small})`,
    }}
  >
    <div css={{ marginBottom: theme.space.medium }}>
      <img src={imageUrl} alt="" css={{ borderRadius: theme.borderRadius }} />
    </div>
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
          color: theme.color.black,
          wordBreak: 'break-word',
          fontWeight: 500,
        }}
      >
        {title}
      </LinkAreaAnchor>
    </div>
    <div css={{ marginBottom: theme.space.medium }}>
      <a
        href={authorLink}
        target="_blank"
        rel="noopener noreferrer"
        css={{
          color: theme.color.gray,
          textDecoration: 'none',
          ':hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {name}
      </a>
    </div>
  </Card>
);
