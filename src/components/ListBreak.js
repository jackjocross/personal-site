import React from 'react';
import { IconArrowRight } from './Icon/IconArrowRight';
import { theme } from '../theme';

export const ListBreak = ({ title }) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      minWidth: 150,
      padding: `0 ${theme.space.small}`,
      fontSize: theme.fontSize.large,
      fontWeight: theme.fontWeight.bold,
    }}
  >
    <div css={{ marginBottom: theme.space.small }}>{title}</div>
    <IconArrowRight />
  </div>
);
