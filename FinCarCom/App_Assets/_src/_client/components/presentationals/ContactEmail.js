
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/contactemail'


const ContactEmail = ({
  children,
  h1,
  h2,
  h3,
  h4,
  email,
  dispatch,
  onNextPage
}) => {

  let hideValid = email.state !== 1
    , hideNotValid = email.state !== 2
    , hideLoader = email.state !== 3


  const _handleButtonClick = () => {
    email.isValid && onNextPage()
  }

  const _handleEmailChange = ({ target }) => {
    const email = target.value

    dispatch(action.updateEmail({
      value: email,
      isValid: false,
      state: 0
    }))
  }

  const _handleEmailBlur = ({ target }) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const email = target.value

    dispatch(action.updateEmail({
      value: email,
      isValid: false,
      state: 3
    }))

    if(regex.test(email)) {
      dispatch(action.updateEmail({
        value: email,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateEmail({
        value: email,
        isValid: false,
        state: 2
      }))
    }
  }

  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="contact-email" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>
          <p>
            <span style={styles.inputWrap}>

              <input name="email" type="email" value={email.value}
                placeholder="Email" autoComplete="off" autoFocus
                style={styles.input}
                onChange={_handleEmailChange.bind(this)}
                onBlur={_handleEmailBlur.bind(this)} />

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

ContactEmail.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  email: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { email } }) {
  return { email }
}


export default connect(mapStateToProps)(Radium(ContactEmail))
