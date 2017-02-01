
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import NumberFormat from 'react-number-format'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/annualincome'


const AnnualIncome = ({
  children,
  h1,
  h2,
  h3,
  h4,
  income,
  dispatch,
  onNextPage
}) => {

  let hideValid = income.state !== 1
    , hideNotValid = income.state !== 2
    , hideLoader = income.state !== 3


  const _handleButtonClick = () => {
    income.isValid && onNextPage()
  }

  const _handleIncomeChange = () => {
    dispatch(action.updateIncome({
      value: income.value,
      isValid: false,
      state: 0
    }))
  }

  const _handleIncomeBlur = ({ target }) => {
    const incomeVal = target.value.replace(/\$|,/g,'')

    dispatch(action.updateIncome({
      value: incomeVal,
      isValid: false,
      state: 3
    }))

    if(incomeVal.length > 4) {
      dispatch(action.updateIncome({
        value: incomeVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateIncome({
        value: incomeVal,
        isValid: false,
        state: 2
      }))
    }
  }

  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="annual-income" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>
          <p>
            <span style={styles.inputWrap}>

              <NumberFormat name="income" value={income.value}
                autoComplete="off" style={styles.input} autoFocus
                placeholder="$00,000" thousandSeparator={true} prefix={"$"}
                onBlur={_handleIncomeBlur.bind(this)}
                onFocus={e => e.target.select()}
                onChange={_handleIncomeChange.bind(this)} />

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

AnnualIncome.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  income: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { income } }) {
  return { income }
}


export default connect(mapStateToProps)(Radium(AnnualIncome))
