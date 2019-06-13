import React from 'react'
import { theme } from '../theme'
import { HorizontalList, responsiveSpace } from './HorizontalList'

export const SummaryList = ({ title, titleStrong, children }) => (
  <>
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
  </>
)
