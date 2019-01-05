import React from 'react';
import { Card } from './Card';

export const UnsplashCard = ({ photo: { description, url, imageUrl } }) => (
  <Card
    component="a"
    css={{
      position: 'relative',
      width: 320,
      height: 320,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    aria-label={description}
    title={description}
    href={url}
    target="_blank"
  />
);
