
import globalStyles from './global'


export default {

  fieldset: globalStyles.fieldset,
  svg: globalStyles.svg,
  loader: globalStyles.loader,

  dropdownValidWrap: globalStyles.dropdownValidWrap,
  valid: globalStyles.valid,
  notValid: globalStyles.notValid,

  hide: globalStyles.hide,
  show: globalStyles.show,

  dropdownWrap: globalStyles.dropdownWrap,
  input: {
    ...globalStyles.input,
    ...globalStyles.widthLarge
  },

  buttonWrap: globalStyles.buttonWrap,
  button: {
    ...globalStyles.primaryBtn,
    ...globalStyles.button,
    ...globalStyles.widthSmall
  }
}
