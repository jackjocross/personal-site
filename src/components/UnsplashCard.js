import React from 'react'
import { Image } from './Image'
import { Card } from './Card'
import { theme } from '../theme'
import { responsiveSpace } from './HorizontalList'

export const UnsplashCard = ({
  image: {
    alt_description,
    links: { html },
    childrenFile: [
      {
        childImageSharp: { fluid },
      },
    ],
  },
}) => (
  <div
    css={{ paddingTop: theme.space.large, paddingBottom: theme.space.xxxlarge }}
  >
    <Card
      component="a"
      css={[
        {
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        },
        theme.mq({
          width: [`calc(100vw - 2 * ${responsiveSpace[0]})`, 320, 320, 320],
        }),
      ]}
      aria-label={alt_description}
      title={alt_description}
      href={html}
      target="_blank"
    >
      <div
        css={[
          {
            height: 0,
            marginBottom: '100%',
          },
        ]}
      />
      <Image
        fluid={fluid}
        loading="lazy"
        style={{
          position: 'absolute',
          zIndex: -1,
          width: '100%',
          height: '100%',
        }}
      />
    </Card>
  </div>
)
