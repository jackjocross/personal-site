import facepaint from 'facepaint'

const color = {
  white: '#fff',
  black: '#000',
  pink: '#D700BF',
  purple: '#833ab4',
  cloud: '#f1f1f1',
  platinum: '#999',
  gray: '#555',
}

const borderRadius = 5

const mq = facepaint([
  '@media(min-width: 450px)',
  '@media(min-width: 800px)',
  '@media(min-width: 1200px)',
  '@media(min-width: 1600px)',
])

const fontSize = {
  root: '14px',
  small: '1rem',
  medium: '1.15rem',
  large: '1.5rem',
  xlarge: '2rem',
}

const fontWeight = {
  medium: 400,
  bold: 800,
}

const fontFamily = 'Rubik,sans-serif'

const lineHeight = 1.58

const space = {
  xxsmall: '0.25rem',
  xsmall: '0.5rem',
  small: '1rem',
  medium: '1.5rem',
  large: '2rem',
  xlarge: '3rem',
  xxlarge: '4.5rem',
  xxxlarge: '5.5rem',
}

export const theme = {
  color,
  borderRadius,
  mq,
  fontSize,
  fontFamily,
  fontWeight,
  lineHeight,
  space,
}
