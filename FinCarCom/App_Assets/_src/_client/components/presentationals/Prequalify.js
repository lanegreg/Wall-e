
import fetch from 'isomorphic-fetch'

import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/prequalify'


const Prequalify = ({
  children,
  h1,
  h2,
  h3,
  h4,
  cityStateZip,
  privacyPolicy,
  dispatch,
  onNextPage
}) => {

  let hideValid = cityStateZip.state !== 1
    , hideNotValid = cityStateZip.state !== 2
    , hideLoader = cityStateZip.state !== 3


  const _handlePrivacyPolicyClick = e => {
    e.preventDefault()
    dispatch(action.togglePrivacyPolicyOverlay())
  }

  const _handlePrivacyPolicyAcceptClick = () => {
    dispatch(action.updatePrivacyPolicyAccepted(true))
    dispatch(action.togglePrivacyPolicyOverlay())

    if(cityStateZip.isValid) {
      onNextPage()
    }
  }


  const _handleButtonClick = () => {
    if(cityStateZip.isValid) {
      if(privacyPolicy.hasBeenAccepted) {
        onNextPage()
      } else {
        dispatch(action.togglePrivacyPolicyOverlay())
      }
    }
  }


  const _handleZipcodeChange = () => {
    dispatch(action.updateCityStateZip({
      value: {
        city: '',
        state: '',
        zipcode: cityStateZip.value.zipcode,
        formatted: ''
      },
      isValid: false,
      state: 0
    }))
  }

  const _handleZipcodeBlur = ({ target }) => {
    const zipcode = target.value.replace(/_/g,'')

    dispatch(action.updateCityStateZip({
      value: {
        city: '',
        state: '',
        zipcode: zipcode,
        formatted: ''
      },
      isValid: false,
      state: 3
    }))


    if(zipcode && zipcode.length === 5) {
      let csz = JSON.parse(sessionStorage.getItem(`CSZ_${zipcode}`))

      if(csz) {
        dispatch(action.updateCityStateZip({
          value: {
            city: csz.city,
            state: csz.state,
            zipcode: csz.zip,
            formatted: `${csz.city}, ${csz.state} ${csz.zip}`
          },
          isValid: true,
          state: 1
        }))
      } else {

        let url = '/api/geo/zipcode/' + zipcode

        fetch(url)
        .then(resp => resp.json())
        .then(data => {
          let csz = data.cityStateZip

          if(data.isKosher) {
            sessionStorage.setItem(`CSZ_${zipcode}`, JSON.stringify(data.cityStateZip))

            dispatch(action.updateCityStateZip({
              value: {
                city: csz.city,
                state: csz.state,
                zipcode: csz.zip,
                formatted: `${csz.city}, ${csz.state} ${csz.zip}`
              },
              isValid: data.isKosher,
              state: data.isKosher ? 1 : 2
            }))
          } else {
            dispatch(action.updateCityStateZip({
              value: {
                city: '',
                state: '',
                zipcode: zipcode,
                formatted: ''
              },
              isValid: false,
              state: 2
            }))
          }
        })
      }
    } else {
      dispatch(action.updateCityStateZip({
        value: {
          city: '',
          state: '',
          zipcode: zipcode,
          formatted: ''
        },
        isValid: false,
        state: 2
      }))
    }
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="prequalify" onSubmit={e => e.preventDefault()}>
        <fieldset>
          <p style={styles.fieldset}>
            <span style={styles.inputWrap}>

              <NumberFormat name="zipcode" value={cityStateZip.value.zipcode}
                autoComplete="off" style={styles.input} autoFocus
                placeholder="ZIP code" format="#####"
                onBlur={_handleZipcodeBlur.bind(this)}
                onClick={e => e.target.select()}
                onChange={_handleZipcodeChange.bind(this)} />

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
              onClick={_handleButtonClick.bind(this)}>Let's begin!</button>
          </p>

          <p style={styles.privacyWrap}>
            <a key="pl" href="#" onClick={_handlePrivacyPolicyClick.bind(this)}
              style={styles.privacyLink}>Review Our Privacy Policy</a>
          </p>

        </fieldset>
      </form>

      <Modal isOpen={privacyPolicy.overlayIsOpen} width='large'>
        <ModalHeader text='Privacy Policy'>
        <button className='overlay-btn overlay-btn-top overlay-btn--primary' autoFocus
                onClick={_handlePrivacyPolicyAcceptClick.bind(this)}>Accept</button>
        </ModalHeader>
        <ModalBody>
          <div dangerouslySetInnerHTML={{__html: privacyPolicy.content}}></div>
        </ModalBody>
        <ModalFooter>
          <p>
            For any other issues, please contact our customer service department
            at&nbsp;<a href="mailto:consumercare@autobytel.com">consumercare@autobytel.com</a>.<br />
            Our mailing address is: 18872 MacArthur Boulevard, Suite 200, Irvine, CA 92612-1400.
          </p>
          <div className='overlay-btn-wrap'>
            <button className='overlay-btn overlay-btn-bottom overlay-btn--primary'
                    onClick={_handlePrivacyPolicyAcceptClick.bind(this)}>Accept</button>
          </div>
        </ModalFooter>
      </Modal>

    </MainContentWrap>
  )
}

Prequalify.propTypes = {
  h1: PropTypes.string,
  h2: PropTypes.string,
  h3: PropTypes.string,
  cityStateZip: PropTypes.object.isRequired,
  privacyPolicy: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ app: { privacyPolicy }, lead: { cityStateZip } }) {
  return { cityStateZip, privacyPolicy }
}


export default connect(mapStateToProps)(Radium(Prequalify))
