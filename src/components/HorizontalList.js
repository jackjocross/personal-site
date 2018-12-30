import React from 'react';
import { theme } from '../theme';

const offsetPadding = theme.mq({
  paddingLeft: [
    theme.space.small,
    theme.space.small,
    theme.space.large,
    theme.space.xlarge,
  ],
  paddingRight: [
    theme.space.small,
    theme.space.small,
    theme.space.large,
    theme.space.xlarge,
  ],
});

const offsetMargin = theme.mq({
  marginLeft: [
    `-${theme.space.small}`,
    `-${theme.space.small}`,
    `-${theme.space.large}`,
    `-${theme.space.xlarge}`,
  ],
  marginRight: [
    `-${theme.space.small}`,
    `-${theme.space.small}`,
    `-${theme.space.large}`,
    `-${theme.space.xlarge}`,
  ],
});

export const HorizontalList = ({ title, children, ...rest }) => (
  <div css={offsetPadding} {...rest}>
    <div
      css={[
        {
          overflowY: 'hidden',
          overflowX: 'visible',
        },
        offsetPadding,
        offsetMargin,
      ]}
    >
      <div css={{ marginBottom: theme.space.xsmall }}>{title}</div>
      <div
        css={[
          {
            overflow: 'auto',
            paddingBottom: 30,
            marginBottom: -30,
            WebkitOverflowScrolling: 'touch',
            '::-webkit-scrollbar': {
              WebkitAppearance: 'none !important',
              display: 'none !important',
            },
          },
          offsetPadding,
          offsetMargin,
        ]}
      >
        <ul
          css={[
            {
              display: 'flex',
              whiteSpace: 'nowrap',
              float: 'left',
            },
            offsetPadding,
            offsetMargin,
          ]}
        >
          {React.Children.map(children, child => (
            <li
              css={theme.mq({
                display: 'inline-block',
                ':not(:last-child)': {
                  marginRight: [theme.space.xsmall, theme.space.small],
                },
              })}
            >
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);
