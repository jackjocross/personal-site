import { Image } from './Image'
import React from 'react'
import { theme } from '../theme'
import { Card } from './Card'
import { LinkAreaAnchor } from './LinkAreaAnchor'
import { VisuallyHidden } from './VisuallyHidden'
import { responsiveSpace } from './HorizontalList'

export const GoodreadsCard = ({
  book: {
    hasCoverImage,
    bookLink,
    title,
    authorLink,
    name,
    childrenFile: [
      {
        childImageSharp: { fluid },
      },
    ],
  },
}) => {
  console.log({ hasCoverImage })
  const Wrapper = hasCoverImage ? VisuallyHidden : React.Fragment
  return (
    <div
      css={{
        marginTop: -25,
        paddingBottom: 110,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Card
        css={[
          {
            position: 'relative',
            display: 'inline-block',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            padding: hasCoverImage ? 0 : theme.space.medium,
          },
          hasCoverImage
            ? theme.mq({
                width: [
                  `calc(80vw - 2 * ${responsiveSpace[0]})`,
                  240,
                  240,
                  240,
                ],
              })
            : theme.mq({
                width: [
                  `calc(80vw - 2 * ${responsiveSpace[0]} - ${
                    hasCoverImage ? 0 : `2 * ${theme.space.medium}`
                  })`,
                  210,
                  210,
                  210,
                ],
                height: 305,
                border: `1px solid ${theme.color.cloud}`,
              }),
        ]}
      >
        {hasCoverImage && (
          <Image
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
    </div>
  )
}
