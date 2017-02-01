
import globalStyles from './global'

const green = { color: '#6C0' }

export default {
  root: {
    display: 'table-row',
    height: '1px',
    padding: '.75em 15px',
    background: 'rgba(0,0,0,.5)',
    textAlign: 'center'
  },

  container: globalStyles.container,

  linksWrap: {
    padding: 0,
    listStyle: 'none'
  },

  linkItem: {
    display: 'inline-block',
    fontSize: '.9rem',
    whiteSpace: 'nowrap',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '1.7rem'
    }
  },

  link: {
    ...green,
    textDecoration: 'none',
    transition: 'all .3s ease-in',
    ':hover': {
      color: '#9CFB3C',
      textDecoration: 'underline'
    }
  },

  linkDiscSeparator: {
    display: 'inline-block',
    border: '.2em solid #5F734B',
    borderRadius: '50%',
    background: '#5F734B',
    margin: '0 6px 2% 6px',
    boxShadow: '-1px -1px 2px rgba(0,0,0,.6)',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      borderWidth: '2px'
    }
  },

  legalCopyWrap: {
    fontSize: '.9rem',
    marginTop: '3.8em',
    color: '#BBB',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '1.2rem'
    }
  },

  legalCopy: {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '1.2rem'
    }
  },

  disclaimer: {
    paddingLeft: '7em',
    textAlign: 'left'
  },

  digicertWrap: {
    marginTop: '3.2em',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      display: 'flex',
      alignItems: 'center'
    }
  },

  digicertImg: {
    width: '80px',
    margin: '0 auto'
  },

  digicertCopy: {
    fontSize: '1rem',
    marginTop: '0.8em',
    display: 'inline-block',
    maxWidth: '76%',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '1.4rem',
      paddingLeft: '2em',
      textAlign: 'left',
      margin: '0',
      maxWidth: '100%'
    }
  }
}
