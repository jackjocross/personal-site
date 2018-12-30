import React from 'react';
import { LinkArea } from './LinkArea';
import { theme } from '../theme';
import { LinkAreaAnchor } from './LinkAreaAnchor';

export const GithubCard = ({
  repository: {
    name,
    owner: { login, html_url: ownerUrl },
    description,
    html_url: repoUrl,
  },
}) => (
  <LinkArea
    css={{
      border: `1px solid ${theme.color.metal}`,
      borderRadius: theme.borderRadius,
      cursor: 'pointer',
      width: 200,
      display: 'flex',
      flexDirection: 'column',
      padding: theme.space.small,
      whiteSpace: 'normal',
      height: `calc(100% - 2 * ${theme.space.small})`,
      willChange: 'box-shadow',
      transition: 'box-shadow 100ms ease-in',
      ':hover': {
        boxShadow: `0 0 0 1px ${
          theme.color.black
        }, 0 0 0 3px rgba(0, 0, 0, .3)`,
      },
      fontSize: theme.fontSize.medium,
    }}
  >
    <div css={{ marginBottom: theme.space.medium }}>
      <LinkAreaAnchor
        href={repoUrl}
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
        {name}
      </LinkAreaAnchor>
    </div>
    <div css={{ marginBottom: theme.space.medium }}>
      <a
        href={ownerUrl}
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
        {login}
      </a>
    </div>
    <div>{description}</div>
  </LinkArea>
);
