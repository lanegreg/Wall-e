
import globalStyles from './global'


export default {

  fieldset: globalStyles.fieldset,

  sliderLabel: globalStyles.sliderLabel,

  buttonWrap: globalStyles.buttonWrap,
  button: {
    ...globalStyles.primaryBtn,
    ...globalStyles.button,
    ...globalStyles.widthSmall
  }
}
