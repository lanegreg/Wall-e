
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/residencetime'


const ResidenceTime = ({
  children,
  h1,
  h2,
  h3,
  h4,
  residenceTime,
  dispatch,
  onNextPage
}) => {

  const isValid = (years, months) => {
    return years*12 + months > 0
  }

  const _handleYearsChange = ({ target }) => {
    const years = target.value

    dispatch(action.updateResidenceTime({
      value: {
        months: residenceTime.value.months,
        years
      },
      isValid: isValid(years, residenceTime.value.months)
    }))
  }

  const _handleMonthsChange = ({ target }) => {
    const months = target.value

    dispatch(action.updateResidenceTime({
      value: {
        months,
        years: residenceTime.value.years
      },
      isValid: isValid(residenceTime.value.years, months)
    }))
  }

  const _handleButtonClick = () => {
    residenceTime.isValid && onNextPage()
  }

  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="residence-time" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>

          <p>
            <label style={styles.sliderLabel} htmlFor="yrs">{`${residenceTime.value.years} Years`}</label>
            <input name="years" type="range" value={residenceTime.value.years}
              max="30" className="input-lg"
              onChange={_handleYearsChange.bind(this)} />
          </p>

          <p>
            <label style={styles.sliderLabel} htmlFor="mos">{`${residenceTime.value.months} Months`}</label>
            <input name="months" type="range" value={residenceTime.value.months}
              max="12" className="input-lg"
              onChange={_handleMonthsChange.bind(this)} />
          </p>

          <p style={styles.buttonWrap}>
            <button type="button" style={styles.button} formNoValidate
              onClick={_handleButtonClick.bind(this)}>Next</button>
          </p>

        </fieldset>
      </form>
    </MainContentWrap>
  )
}


ResidenceTime.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  residenceTime: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { residenceTime } }) {
  return { residenceTime }
}


export default connect(mapStateToProps)(Radium(ResidenceTime))
