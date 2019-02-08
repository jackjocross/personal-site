import React from 'react'
import Img from 'gatsby-image'
import { LinkAreaAnchor } from './LinkAreaAnchor'
import { theme } from '../theme'
import { Card } from './Card'
import { VisuallyHidden } from './VisuallyHidden'

export const GoodreadsCard = ({
  book: { imagePath, bookLink, title, authorLink, name, fluid },
}) => {
  const Wrapper = imagePath ? VisuallyHidden : React.Fragment
  return (
    <Card
      css={{
        width: imagePath ? 240 : 210,
        height: imagePath ? undefined : 305,
      }}
      css={[
        {
          position: 'relative',
          display: 'inline-block',

          border: imagePath ? 'none' : `1px solid ${theme.color.cloud}`,
          padding: imagePath ? 0 : theme.space.small,
        },
        imagePath
          ? theme.mq({ width: [200, 200, 240] })
          : theme.mq({ width: [180, 180, 210], height: [250, 250, 305] }),
      ]}
    >
      {imagePath && (
        <Img
          fluid={fluid}
          style={{
            display: 'block',
          }}
          imgStyle={{
            height: '100%',
            width: '100%',
            borderRadius: theme.borderRadius,
          }}
        />
      )}
      <Wrapper>
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
        <div>
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
      </Wrapper>
    </Card>
  )
}
