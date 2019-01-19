import React from 'react'
import Img from 'gatsby-image'
import { Card } from './Card'

export const UnsplashCard = ({
  photo: { description, url, imageUrl, placeholderUri, fixed },
}) => (
  <Card
    component="a"
    css={{
      position: 'relative',
      width: 320,
      height: 320,
    }}
    aria-label={description}
    title={description}
    href={url}
    target="_blank"
  >
    <Img fixed={fixed} style={{ position: 'absolute', zIndex: -1 }} />
  </Card>
)
