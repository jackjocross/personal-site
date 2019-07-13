import React from 'react'

export const WavePrimary = ({ color, ...props }) => (
  <div css={{ position: 'relative' }}>
    <svg
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={true}
      viewBox="0 0 1920 240"
      css={{
        position: 'absolute',
        top: 'auto',
        right: 0,
        bottom: -1,
        left: 0,
        width: '100%',
        color: color,
        fill: color,
        pointerEvents: 'none',
      }}
      {...props}
    >
      <g>
        <path d="M1920,144.5l0,95.5l-1920,0l0,-65.5c196,-36 452.146,-15.726 657.5,8.5c229.698,27.098 870,57 1262.5,-38.5Z" />
      </g>
    </svg>
  </div>
)

export const WaveSecondary = ({ color, ...p }) => (
  <div css={{ position: 'relative' }}>
    <svg
      fillRule="evenodd"
      clipRule="evenodd"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={true}
      viewBox="0 0 1920 240"
      css={{
        position: 'absolute',
        top: 'auto',
        right: 0,
        bottom: -1,
        left: 0,
        width: '100%',
        color: color,
        fill: color,
        pointerEvents: 'none',
      }}
      {...p}
    >
      <title id="title">goop</title>
      <g>
        <path d="M1920,146l0,94l-1920,0l0,-77.034c93,94.034 759,60.034 983.5,21.534c224.5,-38.5 456,13.5 594,13.5c138,0 152.14,-11.31 342.5,-52Z" />
      </g>
    </svg>
  </div>
)
