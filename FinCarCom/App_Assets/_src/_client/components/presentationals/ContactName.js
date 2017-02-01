
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/contactname'


const ContactName = ({
  children,
  h1,
  h2,
  h3,
  h4,
  firstName,
  lastName,
  dispatch,
  onNextPage
}) => {

  let hideFnameValid = firstName.state !== 1
    , hideFnameNotValid = firstName.state !== 2
    , hideFnameLoader = firstName.state !== 3
    , hideLnameValid = lastName.state !== 1
    , hideLnameNotValid = lastName.state !== 2
    , hideLnameLoader = lastName.state !== 3


  const _handleFirstNameChange = ({ target }) => {
    const firstNameVal = target.value

    dispatch(action.updateFirstName({
      value: firstNameVal,
      isValid: false,
      state: 0
    }))
  }

  const _handleFirstNameBlur = ({ target }) => {
    const firstNameVal = target.value

    dispatch(action.updateFirstName({
      value: firstNameVal,
      isValid: false,
      state: 3
    }))

    if(firstNameVal.length > 1) {
      dispatch(action.updateFirstName({
        value: firstNameVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateFirstName({
        value: firstNameVal,
        isValid: false,
        state: 2
      }))
    }
  }


  const _handleLastNameChange = ({ target }) => {
    const lastNameVal = target.value

    dispatch(action.updateLastName({
      value: lastNameVal,
      isValid: false,
      state: 0
    }))
  }

  const _handleLastNameBlur = ({ target }) => {
    const lastNameVal = target.value

    dispatch(action.updateLastName({
      value: lastNameVal,
      isValid: false,
      state: 3
    }))

    if(lastNameVal.length > 2) {
      dispatch(action.updateLastName({
        value: lastNameVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateLastName({
        value: lastNameVal,
        isValid: false,
        state: 2
      }))
    }
  }

  const _handleButtonClick = () => {
    firstName.isValid && lastName.isValid && onNextPage()
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="contact-name" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>

          <p>
            <span style={styles.inputWrap}>

              <input name="fname" type="text" style={styles.input}
                value={firstName.value} placeholder="First name"
                autoComplete="off" autoFocus
                onChange={_handleFirstNameChange.bind(this)}
                onBlur={_handleFirstNameBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideFnameLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideFnameValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideFnameNotValid && styles.hide]}>
                  <use xlinkHref="#input_not_valid"></use>
                </svg>
              </span>

            </span>
          </p>

          <p>
            <span style={styles.inputWrap}>

              <input name="lname" type="text" style={styles.input}
                value={lastName.value} placeholder="Last name"
                autoComplete="off"
                onChange={_handleLastNameChange.bind(this)}
                onBlur={_handleLastNameBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideLnameLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideLnameValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideLnameNotValid && styles.hide]}>
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


ContactName.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  firstName: PropTypes.object.isRequired,
  lastName: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { firstName, lastName } }) {
  return { firstName, lastName }
}


export default connect(mapStateToProps)(Radium(ContactName))
