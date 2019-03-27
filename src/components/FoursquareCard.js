import React from 'react'
import Img from 'gatsby-image'
import { theme } from '../theme'
import { LinkAreaAnchor } from './LinkAreaAnchor'
import { Card } from './Card'

export const FoursquareCard = ({ checkin: { id, name, imagePath, fixed } }) => (
  <Card
    css={[
      {
        position: 'relative',
      },
      theme.mq({ width: [220, 220, 320], height: [220, 220, 320] }),
    ]}
  >
    <Img
      fixed={fixed}
      style={{
        position: 'absolute',
        zIndex: -1,
        width: '100%',
        height: '100%',
      }}
    />
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
  </Card>
)
