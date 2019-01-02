import React from 'react';
import { LinkArea } from './LinkArea';
import { LinkAreaAnchor } from './LinkAreaAnchor';
import { theme } from '../theme';

export const GoodreadsCard = ({
  book: [
    {
      title: [title],
      link: [bookLink],
      image_url: [image_url],
      authors: [
        {
          author: [
            {
              name: [name],
              link: [authorLink],
            },
          ],
        },
      ],
    },
  ],
}) => (
  <LinkArea
    css={{
      border: `1px solid ${theme.color.cloud}`,
      borderRadius: theme.borderRadius,
      cursor: 'pointer',
      width: 220,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.space.small,
      whiteSpace: 'normal',
      height: `calc(100% - 2 * ${theme.space.small})`,
      willChange: 'box-shadow',
      transition: 'box-shadow 100ms ease-in',
      ':hover': {
        boxShadow: `0 0 0 2px ${
          theme.color.black
        }, 0 0 0 4px rgba(0, 0, 0, .3)`,
      },
      fontSize: theme.fontSize.medium,
    }}
  >
    <div css={{ marginBottom: theme.space.medium }}>
      <img src={image_url} alt="" css={{ borderRadius: theme.borderRadius }} />
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
  </LinkArea>
);
