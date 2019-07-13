import React from 'react'
import { theme } from '../theme'
import { HorizontalList, responsiveSpace } from './HorizontalList'

export const SummaryList = ({ title, titleStrong, children, ...props }) => (
  <div
    css={theme.mq({
      paddingTop: [
        theme.space.large,
        theme.space.xxlarge,
        theme.space.xxlarge,
        theme.space.xxlarge,
      ],
      paddingBottom: [
        theme.space.small,
        theme.space.xxlarge,
        theme.space.xxlarge,
        theme.space.xxlarge,
      ],
    })}
    {...props}
  >
    <div
      css={theme.mq({
        marginLeft: responsiveSpace,
        marginRight: responsiveSpace,
        fontSize: theme.fontSize.xlarge,
      })}
    >
      {title} <strong css={{ whiteSpace: 'nowrap' }}>{titleStrong}</strong>
    </div>
    <HorizontalList>{children}</HorizontalList>
  </div>
)
