import React from 'react'
import { theme } from '../theme'
import { Card } from './Card'
import { LinkAreaAnchor } from './LinkAreaAnchor'
import { responsiveSpace } from './HorizontalList'

export const GithubCard = ({ repo: { name, description, url, owner } }) => (
  <div
    css={[
      {
        paddingTop: theme.space.large,
        paddingBottom: theme.space.xxxlarge,
        height: `calc(100% - 45px)`,
        '> div': {
          height: '100%',
        },
      },
      theme.mq({
        width: [`calc(70vw - 2 * ${responsiveSpace[0]})`, 200, 200, 200],
      }),
    ]}
  >
    <Card
      css={[
        {
          height: '85%',
          boxShadow: '0 12px 30px -12px rgba(0, 0, 0, 0.15)',
          border: `1px solid ${theme.color.cloud}`,
          borderRadius: theme.borderRadius,
        },
      ]}
    >
      <div
        css={{
          padding: theme.space.small,
        }}
      >
        <div css={{ paddingBottom: theme.space.medium }}>
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
      </div>
    </Card>
  </div>
)
