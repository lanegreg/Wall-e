
import globalStyles from './global'


export default {
  root: {
    position: 'relative',
    padding: '.75em 15px .6em',
    background: '#202020'
  },

  container: globalStyles.container,
  svg: globalStyles.svg,

  logoIco: {
    display: 'block',
    width: '5.4em',
    height: '2.8em',
    margin: '0 auto'
  },

  backArrowIco: {
    display: 'block',
    position: 'absolute',
    left: '5%',
    top: '35%',
    width: '1.5em',
    height: '1.5em'
  },

  progressBar: {
    root: {
      position: 'absolute',
      right: '5%',
      top: '18%',
      width: '16%',
      fontSize: '.66em',
      color: '#BBB'
    },

    bar: {
      width: '100%',
      height: '.5em',
      background: '#fff'
    },

    progress: {
      display: 'block',
      position: 'absolute',
      height: '.5em',
      background: '#0ba14a'
    }
  }
}
