
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import NumberFormat from 'react-number-format'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/residencecost'


const ResidenceCost = ({
  children,
  h1,
  h2,
  h3,
  h4,
  residenceCost,
  dispatch,
  onNextPage
}) => {

  let hideValid = residenceCost.state !== 1
    , hideNotValid = residenceCost.state !== 2
    , hideLoader = residenceCost.state !== 3


  const _handleButtonClick = () => {
    residenceCost.isValid && onNextPage()
  }

  const _handleCostChange = () => {
    dispatch(action.updateResidenceCost({
      value: residenceCost.value,
      isValid: false,
      state: 0
    }))
  }

  const _handleCostBlur = ({ target }) => {
    const residenceCostVal = target.value.replace(/\$|,/g,'')
        , costInt = parseInt(residenceCostVal || 0)

    dispatch(action.updateResidenceCost({
      value: residenceCostVal,
      isValid: false,
      state: 3
    }))

    if(costInt >= 0 && costInt <= 4000 ) {
      dispatch(action.updateResidenceCost({
        value: residenceCostVal,
        isValid: true,
        state: 1
      }))
    } else {
      dispatch(action.updateResidenceCost({
        value: residenceCostVal,
        isValid: false,
        state: 2
      }))
    }
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="residence-cost" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>
          <p>
            <span style={styles.inputWrap}>

              <NumberFormat name="residence-cost" style={styles.input}
                autoComplete="off" value={residenceCost.value} autoFocus
                placeholder="$0,000"
                thousandSeperator={true} prefix={"$"}
                onBlur={_handleCostBlur.bind(this)}
                onFocus={e => e.target.select()}
                onChange={_handleCostChange.bind(this)} />

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


ResidenceCost.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  residenceCost: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { residenceCost } }) {
  return { residenceCost }
}


export default connect(mapStateToProps)(Radium(ResidenceCost))
