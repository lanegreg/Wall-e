
export default {

  container: {
    maxWidth: '980px',
    padding: '0 15px 0 15px',
    margin: '0 auto'
  },

  fieldset: {
    border: '0px',
    margin: '1em 0'
  },

  svg: {
    display: 'block',
    width: '100%',
    height: '100%'
  },

  loader: {
    width: '40px',
    height: '40px',
    marginTop: '-4px',
    marginLeft: '-3px'
  },

  sliderLabel: {
    display: 'block',
    color: '#fff',
    fontSize: '1.6rem',
    lineHeight: '1.6'
  },

  inputWrap: {
    position: 'relative'
  },

  dropdownWrap: {
    position: 'relative',
    display: 'block',
    width: '18.5em',
    margin: '0 auto'
  },

  validWrap: {
    position: 'absolute',
    display: 'block',
    right: '-2.8em',
    top: '-.6em',
    width: '2.4em',
    height: '2.4em'
  },
  dropdownValidWrap: {
    position: 'absolute',
    display: 'block',
    right: '-1.6em',
    top: '.4em',
    width: '2.4em',
    height: '2.4em'
  },
  valid: {
    fill: '#3AA23A'
  },
  notValid: {
    fill: '#DC4D60'
  },

  hide: {
    display: 'none'
  },
  show: {
    display: 'inherit'
  },

  buttonWrap: {
    marginTop: '2.4em',
    marginBottom: '0px',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      marginTop: '3em'
    }
  },
  button: {
    padding: '.75em',
    border: 'none',
    borderRadius: '2px'
  },
  primaryBtn: {
    background: '#00A448',
    color: '#f9ECA3',
    fontSize: '1.8rem',
    textShadow: '0 0 18px rgba(0,0,0,.6)',
    ':hover': {
      background: '#6C0'
    },
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '2rem'
    }
  },

  widthXXXXSmall: {
    width: '3.4em'
  },
  widthXXXSmall: {
    width: '3.8em'
  },
  widthXXSmall: {
    width: '4.2em'
  },
  widthXSmall: {
    width: '6.5em'
  },
  widthSmall: {
    width: '8em'
  },
  widthMedium: {
    width: '9em'
  },
  widthMedLarge: {
    width: '10em'
  },
  widthLarge: {
    width: '11em'
  },
  widthXLarge: {
    width: '13em'
  },

  'dropdown-root': {
    position: 'relative'
  }
}
