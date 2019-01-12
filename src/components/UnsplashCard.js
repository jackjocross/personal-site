import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import { Card } from './Card';

export const UnsplashCard = ({
  photo: { description, url, imagePath, placeholderUri },
}) => (
  <ProgressiveImage src={imagePath} placeholder={placeholderUri}>
    {src => (
      <Card
        component="a"
        css={{
          position: 'relative',
          width: 320,
          height: 320,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-label={description}
        title={description}
        href={url}
        target="_blank"
      />
    )}
  </ProgressiveImage>
);
