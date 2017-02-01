
import globalStyles from './global'


export default {

  fieldset: globalStyles.fieldset,
  svg: globalStyles.svg,

  optionBtnsWrap: {
    maxWidth: '22em',
    margin: '0 auto'
  },
  optionInput: {
    position: 'fixed',
    opacity: '0',
    cursor: 'pointer'
  },
  optionBtn: {
    height: '3.2em',
    padding: '.5em',
    width: '6.5em',
    background: '#838383',
    color: '#FFF',
    fontSize: '1.7rem',
    lineHeight: '1',
    border: 'none'
  },
  optionLabel: {
    display: 'block',
    color: '#FFF',
    fontSize: '1.6rem',
    lineHeight: '1.6'
  },

  small: {
    display: 'block',
    fontSize: '1.2rem',
    lineHeight: '1.5'
  },

  buttonWrap: {
    ...globalStyles.buttonWrap,
    marginTop: '1em'
  },
  button: {
    ...globalStyles.primaryBtn,
    ...globalStyles.button,
    ...globalStyles.widthSmall
  }
}
