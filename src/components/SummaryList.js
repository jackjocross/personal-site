import React from 'react';
import { HorizontalList } from './HorizontalList';
import { theme } from '../theme';

export const SummaryList = ({ emoji, title, titleStrong, ...rest }) => (
  <HorizontalList
    css={{ marginBottom: theme.space.large }}
    title={
      <span css={{ fontSize: theme.fontSize.xlarge }}>
        {emoji} {title} <strong>{titleStrong}</strong>
      </span>
    }
    {...rest}
  />
);
