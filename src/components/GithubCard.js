import React from 'react'
import { theme } from '../theme'
import { LinkAreaAnchor } from './LinkAreaAnchor'
import { Card } from './Card'

export const GithubCard = ({ repo: { name, description, url, owner } }) => (
  <Card
    css={[
      {
        border: `1px solid ${theme.color.cloud}`,
        padding: theme.space.small,
        height: `calc(100% - 2 * ${theme.space.small})`,
      },
      theme.mq({ width: [180, 180, 200] }),
    ]}
  >
    <div css={{ marginBottom: theme.space.medium }}>
      <LinkAreaAnchor
        href={url}
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
        href={owner.url}
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
        {owner.login}
      </a>
    </div>
    <div>{description}</div>
  </Card>
)
