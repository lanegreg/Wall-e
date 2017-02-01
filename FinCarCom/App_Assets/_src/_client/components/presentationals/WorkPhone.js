
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/phone'


const WorkPhone = ({
  children,
  h1,
  h2,
  h3,
  h4,
  workPhone,
  dispatch,
  onNextPage
}) => {

  let hideValid = workPhone.state !== 1
    , hideNotValid = workPhone.state !== 2
    , hideLoader = workPhone.state !== 3


  const _handleButtonClick = () => {
    workPhone.isValid && onNextPage()
  }

  const _handlePhoneChange = () => {
    dispatch(action.updateWorkPhone({
      value: workPhone.value,
      isValid: false,
      state: 0
    }))
  }

  const _handlePhoneBlur = ({ target }) => {
    const workPhoneVal = target.value.replace(/\(|\)|-| |_/g,'')

    dispatch(action.updateWorkPhone({
      value: workPhoneVal,
      isValid: false,
      state: 3
    }))

    if(workPhoneVal.length === 10) {
      dispatch(action.updateWorkPhone({
        value: workPhoneVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateWorkPhone({
        value: workPhoneVal,
        isValid: false,
        state: 2
      }))
    }
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="home-phone" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>
          <p>
            <span style={styles.inputWrap}>

              <NumberFormat name="phone" value={workPhone.value}
                autoComplete="off" style={styles.input} autoFocus
                placeholder="Work phone" format="(###) ###-####"
                onChange={_handlePhoneChange.bind(this)}
                onFocus={e => e.target.select()}
                onBlur={_handlePhoneBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideNotValid && styles.hide]}>
                  <use xlinkHref="#input_not_valid"></use>
                </svg>
              </span>

            </span>
          </p>

          <div style={styles.container}></div>

          <p style={styles.buttonWrap}>
            <button type="button" style={styles.button} formNoValidate
              onClick={_handleButtonClick.bind(this)}>Next</button>
          </p>

        </fieldset>
      </form>
    </MainContentWrap>
  )
}

WorkPhone.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  workPhone: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { workPhone } }) {
  return { workPhone }
}


export default connect(mapStateToProps)(Radium(WorkPhone))
