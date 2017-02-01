
import globalStyles from './global'

const marginZero = { margin: 0 }

export default {
  root: {
    padding: '1.5em 0',
    background: 'rgba(0,0,0,.4)',
    textAlign: 'center',
    // height: '5.2em',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      padding: '3em 0 .75em',
      background: 'none'
    }
  },

  container: globalStyles.container,

  content: {
    margin: '1em auto 3em',
    textAlign: 'center'
  },

  h1: {
    ...marginZero,
    color: '#6eb8e5',
    fontSize: '2rem',
    lineHeight: '1.6em',
    fontWeight: '300',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '4rem',
      lineHeight: '1.3'
    }
  },

  h2: {
    margin: '5px 0 0 0',
    color: '#EEE',
    fontSize: '1.6rem',
    lineHeight: '1.6em',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '3.6rem',
      lineHeight: '1.3'
    }
  },

  h3: {
    ...marginZero,
    color: '#CCC',
    fontSize: '1.2rem',
    lineHeight: '1.6em',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '2.25rem',
      lineHeight: '1.3em'
    }
  }
}
