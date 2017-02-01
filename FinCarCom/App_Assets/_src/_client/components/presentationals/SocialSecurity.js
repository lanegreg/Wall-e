
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import NumberFormat from 'react-number-format'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/socialsecurity'


const SocialSecurity = ({
  children,
  h1,
  h2,
  h3,
  h4,
  ssn,
  dispatch
}) => {

  let hideValid = ssn.state !== 1
    , hideNotValid = ssn.state !== 2
    , hideLoader = ssn.state !== 3


  const placementCheck = () => {
    dispatch(action.doPlacementCheck())
  }


  const isAreaValid = area => {
    let a = parseInt(area)
    return a && a > 0 && a < 1000
  }

  const isGroupValid = group => {
    let g = parseInt(group)
    return g && g > 0 && g < 100
  }

  const isSerialValid = serial => {
    let s = parseInt(serial)
    return s && s > 0 && s < 10000
  }



  const _handleButtonClick = () => {
    ssn.isValid && placementCheck()
  }


  const _handleSocialSecurityChange = () => {
    dispatch(action.updateSocialSecurity({
      value: ssn.value,
      isValid: false,
      state: 0
    }))
  }

  const _handleSocialSecurityBlur = ({ target }) => {
    const ssnVal = target.value
        , parts = ssnVal.split('-')
        , area = parts[0]
        , group = parts[1]
        , serial = parts[2]
        , isValid = isAreaValid(area)
            && isGroupValid(group)
            && isSerialValid(serial)

    dispatch(action.updateSocialSecurity({
      value: ssnVal,
      isValid,
      state: 3
    }))

    if(isValid) {
      dispatch(action.updateSocialSecurity({
        value: ssnVal,
        isValid,
        state: isValid ? 1 : 2
      }))
    } else {
      dispatch(action.updateSocialSecurity({
        value: ssnVal,
        isValid,
        state: 2
      }))
    }
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="social-security" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>
          <p>
            <span style={styles.inputWrap}>

              <NumberFormat name="ssn" style={styles.input}
                autoComplete="off" value={ssn.value} autoFocus
                placeholder="000-00-0000" format="###-##-####"
                onBlur={_handleSocialSecurityBlur.bind(this)}
                onFocus={e => e.target.select()}
                onChange={_handleSocialSecurityChange.bind(this)} />

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

SocialSecurity.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ssn: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { ssn } }) {
  return { ssn }
}


export default connect(mapStateToProps)(Radium(SocialSecurity))
