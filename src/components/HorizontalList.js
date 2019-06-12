import React from 'react'
import { theme } from '../theme'

export const responsiveSpace = [
  theme.space.medium,
  theme.space.medium,
  theme.space.large,
  theme.space.xlarge,
]

export const HorizontalList = ({ children }) => (
  <>
    <div
      css={[
        {
          overflow: 'hidden',
        },
      ]}
    >
      <ul
        css={[
          {
            display: 'flex',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingRight: 0,
            marginBottom: -30,
            paddingBottom: 30,
            width: '100%',
            overflowY: 'hidden',
            overflowX: 'visible',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            '::-webkit-scrollbar': {
              WebkitAppearance: 'none !important',
              display: 'none !important',
            },
          },
          theme.mq({
            scrollPaddingLeft: [0, ...responsiveSpace.slice(1)],
            'li:first-child': {
              paddingLeft: responsiveSpace,
            },
            'li:last-child': {
              paddingRight: responsiveSpace,
            },
          }),
        ]}
      >
        {React.Children.map(children, child => (
          <li
            css={[
              {
                display: 'inline-block',
              },
              theme.mq({
                scrollSnapAlign: ['center', 'start', 'start', 'start'],
                ':not(:last-child)': {
                  marginRight: [theme.space.xsmall, theme.space.medium],
                },
              }),
            ]}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  </>
)
