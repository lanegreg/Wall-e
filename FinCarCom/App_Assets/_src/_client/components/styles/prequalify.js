
import globalStyles from './global'


export default {

  fieldset: globalStyles.fieldset,
  svg: globalStyles.svg,
  loader: globalStyles.loader,

  validWrap: globalStyles.validWrap,
  valid: globalStyles.valid,
  notValid: globalStyles.notValid,

  hide: globalStyles.hide,
  show: globalStyles.show,

  inputWrap: globalStyles.inputWrap,
  input: {
    ...globalStyles.widthXSmall
  },

  buttonWrap: globalStyles.buttonWrap,
  button: {
    ...globalStyles.primaryBtn,
    ...globalStyles.button,
    ...globalStyles.widthMedium
  },

  privacyWrap: {
    marginTop: '10px',
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      margin: '10px 2.25em 0'
    }
  },
  privacyLink: {
    display: 'inline',
    fontSize: '1.1rem',
    textDecoration: 'none',
    color: '#8D988A',
    ':hover': {
      textDecoration: 'underline',
      color: '#B3BFB0'
    },
    '@media screen and (min-width: 1024px), only screen and (max-device-width: 1024px) and (min-device-width: 768px) and (orientation: portrait)': {
      fontSize: '1.2rem'
    }
  }
}
