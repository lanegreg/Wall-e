
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/contactname'


const Employment = ({
  children,
  h1,
  h2,
  h3,
  h4,
  employer,
  jobTitle,
  dispatch,
  onNextPage
}) => {
  const length_str = 'length'

  let hideEmployerValid = employer.state !== 1
    , hideEmployerNotValid = employer.state !== 2
    , hideEmployerLoader = employer.state !== 3
    , hideJobTitleValid = jobTitle.state !== 1
    , hideJobTitleNotValid = jobTitle.state !== 2
    , hideJobTitleLoader = jobTitle.state !== 3


  const _handleJobTitleChange = ({ target }) => {
    const jobTitleVal = target.value

    dispatch(action.updateJobTitle({
      value: jobTitleVal,
      isValid: false,
      state: 0
    }))
  }

  const _handleJobTitleBlur = ({ target }) => {
    const jobTitleVal = target.value

    dispatch(action.updateJobTitle({
      value: jobTitleVal,
      isValid: false,
      state: 3
    }))

    if(jobTitleVal[length_str] > 3) {
      dispatch(action.updateJobTitle({
        value: jobTitleVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateJobTitle({
        value: jobTitleVal,
        isValid: false,
        state: 2
      }))
    }
  }

  const _handleEmployerChange = ({ target }) => {
    const employerVal = target.value

    dispatch(action.updateEmployer({
      value: employerVal,
      isValid: false,
      state: 0
    }))
  }

  const _handleEmployerBlur = ({ target }) => {
    const employerVal = target.value

    dispatch(action.updateEmployer({
      value: employerVal,
      isValid: false,
      state: 3
    }))

    if(employerVal[length_str] > 3) {
      dispatch(action.updateEmployer({
        value: employerVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateEmployer({
        value: employerVal,
        isValid: false,
        state: 2
      }))
    }
  }


  const _handleButtonClick = () => {
    employer.isValid && jobTitle.isValid && onNextPage()
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="employment" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>

          <p>
            <span style={styles.inputWrap}>

              <input name="fname" type="text" style={styles.input}
                value={employer.value} placeholder="Employer"
                autoComplete="off" autoFocus
                onChange={_handleEmployerChange.bind(this)}
                onBlur={_handleEmployerBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideEmployerLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideEmployerValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideEmployerNotValid && styles.hide]}>
                  <use xlinkHref="#input_not_valid"></use>
                </svg>
              </span>

            </span>
          </p>

          <p>
            <span style={styles.inputWrap}>

              <input name="jobtitle" type="text" style={styles.input}
                value={jobTitle.value} placeholder="Job title"
                autoComplete="off"
                onChange={_handleJobTitleChange.bind(this)}
                onBlur={_handleJobTitleBlur.bind(this)} />

              <span style={styles.validWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideJobTitleLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideJobTitleValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideJobTitleNotValid && styles.hide]}>
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


Employment.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  employer: PropTypes.object.isRequired,
  jobTitle: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { employer, jobTitle } }) {
  return { employer, jobTitle }
}


export default connect(mapStateToProps)(Radium(Employment))
