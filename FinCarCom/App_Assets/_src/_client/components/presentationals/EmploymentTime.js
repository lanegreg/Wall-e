
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/residencetime'


const EmploymentTime = ({
  children,
  h1,
  h2,
  h3,
  h4,
  employmentTime,
  dispatch,
  onNextPage
}) => {

  const isValid = (years, months) => {
    return years*12 + months > 0
  }

  const _handleYearsChange = ({ target }) => {
    const years = target.value

    dispatch(action.updateEmploymentTime({
      value: {
        months: employmentTime.value.months,
        years
      },
      isValid: isValid(years, employmentTime.value.months)
    }))
  }

  const _handleMonthsChange = ({ target }) => {
    const months = target.value

    dispatch(action.updateEmploymentTime({
      value: {
        months,
        years: employmentTime.value.years
      },
      isValid: isValid(employmentTime.value.years, months)
    }))
  }

  const _handleButtonClick = () => {
    employmentTime.isValid && onNextPage()
  }

  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="employment-time" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>

          <p>
            <label style={styles.sliderLabel} htmlFor="years">{`${employmentTime.value.years} Years`}</label>
            <input name="years" type="range" value={employmentTime.value.years}
              max="30" className="input-lg"
              onChange={_handleYearsChange.bind(this)} />
          </p>

          <p>
            <label style={styles.sliderLabel} htmlFor="months">{`${employmentTime.value.months} Months`}</label>
            <input name="months" type="range" value={employmentTime.value.months}
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


EmploymentTime.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  employmentTime: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { employmentTime } }) {
  return { employmentTime }
}


export default connect(mapStateToProps)(Radium(EmploymentTime))
