import React from 'react'
import Img from 'gatsby-image'
import { Card } from './Card'
import { theme } from '../theme'

export const UnsplashCard = ({
  photo: { description, url, imageUrl, placeholderUri, fixed },
}) => (
  <Card
    component="a"
    css={[
      {
        position: 'relative',
      },
      theme.mq({ width: [220, 220, 320], height: [220, 220, 320] }),
    ]}
    aria-label={description}
    title={description}
    href={url}
    target="_blank"
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
  </Card>
)
