
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/phone'


const Phones = ({
  children,
  h1,
  h2,
  h3,
  h4,
  mobilePhone,
  homePhone,
  tcpaAuth,
  dispatch,
  onNextPage
}) => {

  let mobiHideValid = mobilePhone.state !== 1
    , mobiHideNotValid = mobilePhone.state !== 2
    , mobiHideLoader = mobilePhone.state !== 3

  let homeHideValid = homePhone.state !== 1
    , homeHideNotValid = homePhone.state !== 2
    , homeHideLoader = homePhone.state !== 3


  const _handleTcpaAuthAcceptClick = (accepted, e) => {
    e && e.preventDefault()

    dispatch(action.updateTcpaAuthAccepted(accepted))
    dispatch(action.toggleTcpaAuthOverlay())

    if(mobilePhone.isValid && homePhone.isValid) {
      onNextPage()
    }
  }

  const _handleButtonClick = () => {
    if(mobilePhone.isValid && homePhone.isValid) {
      if(tcpaAuth.hasBeenAccepted) {
        onNextPage()
      } else {
        dispatch(action.toggleTcpaAuthOverlay())
      }
    }
  }

  const _handleMobiPhoneChange = () => {
    dispatch(action.updateMobilePhone({
      value: mobilePhone.value,
      isValid: false,
      state: 0
    }))
  }

  const _handleHomePhoneChange = () => {
    dispatch(action.updateHomePhone({
      value: homePhone.value,
      isValid: false,
      state: 0
    }))
  }


  const _handleMobiPhoneBlur = ({ target }) => {
    const mobilePhoneVal = target.value.replace(/\(|\)|-| |_/g,'')

    dispatch(action.updateMobilePhone({
      value: mobilePhoneVal,
      isValid: false,
      state: 3
    }))

    if(mobilePhoneVal.length === 10) {
      dispatch(action.updateMobilePhone({
        value: mobilePhoneVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateMobilePhone({
        value: mobilePhoneVal,
        isValid: false,
        state: 2
      }))
    }
  }

  const _handleHomePhoneBlur = ({ target }) => {
    const homePhoneVal = target.value.replace(/\(|\)|-| |_/g,'')

    dispatch(action.updateHomePhone({
      value: homePhoneVal,
      isValid: false,
      state: 3
    }))

    if(homePhoneVal.length === 10) {
      dispatch(action.updateHomePhone({
        value: homePhoneVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateHomePhone({
        value: homePhoneVal,
        isValid: false,
        state: 2
      }))
    }
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="phones" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>
          <p>
            <span style={styles.inputWrap}>

              <NumberFormat name="mobilePhone" value={mobilePhone.value}
                autoComplete="off" style={styles.input} autoFocus
                placeholder="Mobile phone" format="(###) ###-####"
                onChange={_handleMobiPhoneChange.bind(this)}
                onFocus={e => e.target.select()}
                onBlur={_handleMobiPhoneBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, mobiHideLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, mobiHideValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, mobiHideNotValid && styles.hide]}>
                  <use xlinkHref="#input_not_valid"></use>
                </svg>
              </span>

            </span>
          </p>

          <p>
            <span style={styles.inputWrap}>

              <NumberFormat name="homePhone" value={homePhone.value}
                autoComplete="off" style={styles.input}
                placeholder="Home phone" format="(###) ###-####"
                onChange={_handleHomePhoneChange.bind(this)}
                onBlur={_handleHomePhoneBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, homeHideLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, homeHideValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, homeHideNotValid && styles.hide]}>
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

      <Modal isOpen={tcpaAuth.overlayIsOpen} width='medium'>
        <ModalHeader text='Consent To Contact' showCloseButton
                    onClose={_handleTcpaAuthAcceptClick.bind(this, false)} />
        <ModalBody>
          <p>
            By hitting accept, I am expressly consenting to be contacted by car.com,
            up to five participating dealers participating dealers, lenders or third
            party intermediaries and their agents at all numbers provided by autodialer,
            recorded or artificial voice or text. Your phone plan charges may apply.
            This consent is not required as a condition to purchase services or products.
            Please click <a href="#" onClick={_handleTcpaAuthAcceptClick.bind(this, false)}>here</a>
            if you wish to proceed without consent.
          </p>
        </ModalBody>
        <ModalFooter>
          <p>
            For any other issues, please contact our customer service department
            at&nbsp;<a href="mailto:consumercare@autobytel.com">consumercare@autobytel.com</a>.<br />
            Our mailing address is: 18872 MacArthur Boulevard, Suite 200, Irvine, CA 92612-1400.
          </p>
          <div className='overlay-btn-wrap'>
            <button className='overlay-btn overlay-btn-bottom overlay-btn--primary'
                    onClick={_handleTcpaAuthAcceptClick.bind(this, true)}>Accept</button>
          </div>
        </ModalFooter>
      </Modal>

    </MainContentWrap>
  )
}

Phones.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  mobilePhone: PropTypes.object.isRequired,
  homePhone: PropTypes.object.isRequired,
  tcpaAuth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ app: { tcpaAuth },  lead: { mobilePhone, homePhone } }) {
  return { mobilePhone, homePhone, tcpaAuth }
}


export default connect(mapStateToProps)(Radium(Phones))
