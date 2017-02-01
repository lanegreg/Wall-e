
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/contactname'


const VehicleYearMileage = ({
  children,
  h1,
  h2,
  h3,
  h4,
  year,
  mileage,
  dispatch,
  onNextPage
}) => {

  let hideYearValid = year.state !== 1
    , hideYearNotValid = year.state !== 2
    , hideYearLoader = year.state !== 3
    , hideMileageValid = mileage.state !== 1
    , hideMileageNotValid = mileage.state !== 2
    , hideMileageLoader = mileage.state !== 3


  const _handleYearChange = () => {
    dispatch(action.updateVehicleYear({
      value: year.value,
      isValid: false,
      state: 0
    }))
  }

  const _handleYearBlur = ({ target }) => {
    const yearVal = target.value
        , yearInt = parseInt(yearVal || 0)
        , maxYear = (new Date()).getFullYear()
        , minYear = maxYear - 7

    dispatch(action.updateVehicleYear({
      value: yearVal,
      isValid: false,
      state: 3
    }))

    if(yearInt >= minYear && yearInt <= maxYear) {
      dispatch(action.updateVehicleYear({
        value: yearVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateVehicleYear({
        value: yearVal,
        isValid: false,
        state: 2
      }))
    }
  }


  const _handleMileageChange = () => {
    dispatch(action.updateVehicleMileage({
      value: mileage.value,
      isValid: false,
      state: 0
    }))
  }

  const _handleMileageBlur = ({ target }) => {
    const mileageVal = target.value.replace(/,/g,'')
        , mileageInt = parseInt(mileageVal || 0)

    dispatch(action.updateVehicleMileage({
      value: mileageVal,
      isValid: false,
      state: 3
    }))

    if(mileageInt <= 105000) {
      dispatch(action.updateVehicleMileage({
        value: mileageVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateVehicleMileage({
        value: mileageVal,
        isValid: false,
        state: 2
      }))
    }
  }

  const _handleButtonClick = () => {
    year.isValid && mileage.isValid && onNextPage()
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="vehicle-year-mileage" onSubmit={e => e.preventDefault()}>
        <fieldset>
          <p style={styles.fieldset}>
            <span style={styles.inputWrap}>

              <NumberFormat name="year" value={year.value}
                autoComplete="off" style={styles.input} autoFocus
                placeholder="Year" format="####"
                onBlur={_handleYearBlur.bind(this)}
                onClick={e => e.target.select()}
                onChange={_handleYearChange.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideYearLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideYearValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideYearNotValid && styles.hide]}>
                  <use xlinkHref="#input_not_valid"></use>
                </svg>
              </span>

            </span>
          </p>

          <p>
            <span style={styles.inputWrap}>

              <NumberFormat name="mileage" value={mileage.value}
                autoComplete="off" style={styles.input}
                placeholder="Mileage" thousandSeparator={true}
                onBlur={_handleMileageBlur.bind(this)}
                onClick={e => e.target.select()}
                onChange={_handleMileageChange.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideMileageLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideMileageValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideMileageNotValid && styles.hide]}>
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


VehicleYearMileage.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  year: PropTypes.object.isRequired,
  mileage: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { vehicle: { year, mileage } } }) {
  return { year, mileage }
}


export default connect(mapStateToProps)(Radium(VehicleYearMileage))
