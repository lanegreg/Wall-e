
import fetch from 'isomorphic-fetch'

import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/homeaddress'


const ResidenceAddress = ({
  children,
  h1,
  h2,
  h3,
  h4,
  address,
  cityStateZip,
  dispatch,
  onNextPage
}) => {
  const length_str = 'length'

  let hideAddrValid = address.state !== 1
    , hideAddrNotValid = address.state !== 2
    , hideAddrLoader = address.state !== 3
    , hideCSZValid = cityStateZip.state !== 1
    , hideCSZNotValid = cityStateZip.state !== 2
    , hideCSZLoader = cityStateZip.state !== 3


  const _handleButtonClick = () => {
    address.isValid && cityStateZip.isValid && onNextPage()
  }

  const _handleAddressBlur = ({ target }) => {
    const addressVal = target.value

    dispatch(action.updateAddress({
      value: addressVal,
      isValid: false,
      state: 3
    }))

    if(addressVal.length > 3) {
      dispatch(action.updateAddress({
        value: addressVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateAddress({
        value: addressVal,
        isValid: false,
        state: 2
      }))
    }
  }

  const _handleAddressChange = ({ target }) => {
    const addressVal = target.value

    dispatch(action.updateAddress({
      value: addressVal,
      isValid: false,
      state: 0
    }))
  }


  const _handleCityStateZipBlur = ({ target }) => {
    const cityStateZipVal = target.value
      .split(/ |,/)
      .filter(item => { if(item[length_str]) return item })

    const zipcode = cityStateZipVal.pop(0) || ''
        , state = cityStateZipVal.pop(0) || ''
        , city = cityStateZipVal.join(' ') || ''

    let isValidCityStateZipStruc =
          zipcode[length_str] === 5
          && state[length_str] === 2
          && city[length_str] > 2


    dispatch(action.updateCityStateZip({
      value: {
        city: city,
        state: state,
        zipcode: zipcode,
        formatted: target.value
      },
      isValid: false,
      state: 3
    }))


    if(isValidCityStateZipStruc) {
      let csz = JSON.parse(sessionStorage.getItem(`CSZ_${zipcode}`))

      if(csz) {
        let isValid = csz.state === state.toUpperCase()

        dispatch(action.updateCityStateZip({
          value: {
            city: city,
            state: isValid ? state.toUpperCase() : state,
            zipcode: zipcode,
            formatted: isValid ? `${city}, ${state.toUpperCase()} ${zipcode}` : target.value
          },
          isValid: isValid,
          state: isValid ? 1 : 2
        }))
      }
      else {
        fetch('/api/zipcode/' + zipcode)
        .then(resp => resp.json())
        .then(data => {
          let csz = data.cityStateZip
            , isValid = data.isKosher && csz.state === state.toUpperCase()

          data.isKosher
            && sessionStorage.setItem(`CSZ_${zipcode}`, JSON.stringify(data.cityStateZip))

          dispatch(action.updateCityStateZip({
            value: {
              city: city,
              state: isValid ? state.toUpperCase() : state,
              zipcode: zipcode,
              formatted: isValid ? `${city}, ${state.toUpperCase()} ${zipcode}` : target.value
            },
            isValid: isValid,
            state: isValid ? 1 : 2
          }))
        })
      }
    }
    else {
      dispatch(action.updateCityStateZip({
        value: {
          city: city,
          state: state,
          zipcode: zipcode,
          formatted: target.value
        },
        isValid: false,
        state: 2
      }))
    }
  }

  const _handleCityStateZipChange = ({ target }) => {
    const cityStateZipVal = target.value
      .split(/ |,/)
      .filter(item => { if(item[length_str]) return item })

    const zipcode = cityStateZipVal.pop(0) || ''
        , state = cityStateZipVal.pop(0) || ''
        , city = cityStateZipVal.join(' ') || ''


    dispatch(action.updateCityStateZip({
      value: {
        city: city,
        state: state,
        zipcode: zipcode,
        formatted: target.value
      },
      isValid: false,
      state: 0
    }))
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="residence-address" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>
          <p>
            <span style={styles.inputWrap}>

              <input name="address" type="text" style={styles.input}
                value={address.value}
                placeholder="123 your street" autoComplete="off" autoFocus
                onChange={_handleAddressChange.bind(this)}
                onBlur={_handleAddressBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideAddrLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideAddrValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideAddrNotValid && styles.hide]}>
                  <use xlinkHref="#input_not_valid"></use>
                </svg>
              </span>

            </span>
          </p>
          <p>
            <span style={styles.inputWrap}>

              <input name="csz" type="text" style={styles.input} autoComplete="off"
                value={cityStateZip.value.formatted || ''}
                onChange={_handleCityStateZipChange.bind(this)}
                onBlur={_handleCityStateZipBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideCSZLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideCSZValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideCSZNotValid && styles.hide]}>
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


ResidenceAddress.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  address: PropTypes.object.isRequired,
  cityStateZip: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { address, cityStateZip } }) {
  return { address, cityStateZip }
}


export default connect(mapStateToProps)(Radium(ResidenceAddress))
