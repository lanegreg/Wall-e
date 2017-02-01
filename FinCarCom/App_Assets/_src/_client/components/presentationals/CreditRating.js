
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/creditrating'


const CreditRating = ({
  children,
  h1,
  h2,
  h3,
  h4,
  creditRatingId,
  dispatch,
  onNextPage
}) => {


  const _handleRadioChange = ({ target }) => {
    const creditRatingId = target.value

    dispatch(action.updateCreditRatingId({
      value: creditRatingId,
      isValid: true
    }))
  }

  const _handleButtonClick = () => {
    creditRatingId.isValid && onNextPage()
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="credit-rating" onSubmit={e => e.preventDefault()}>
        <fieldset>
          <div className="grid" style={styles.optionBtnsWrap}>

            <div className="col-1-2">
              <p>
                <label style={styles.optionLabel}>
                  <input key="opt1" type="radio" name="radioGroup" value="1"
                    style={[styles.optionBtn, styles.optionInput]}
                    onChange={_handleRadioChange.bind(this)} />
                  <button type="button" style={styles.optionBtn}>
                    Excellent <span style={styles.small}>720 or above</span>
                  </button>
                </label>
              </p>
            </div>

            <div className="col-1-2 last">
              <p>
                <label style={styles.optionLabel}>
                  <input key="opt2" type="radio" name="radioGroup" value="2"
                    style={[styles.optionBtn, styles.optionInput]}
                    onChange={_handleRadioChange.bind(this)} />
                  <button type="button" style={styles.optionBtn}>
                    Good <span style={styles.small}>650 - 719</span>
                  </button>
                </label>
              </p>
            </div>

            <div className="col-1-2">
              <p>
                <label style={styles.optionLabel}>
                  <input key="opt3" type="radio" name="radioGroup" value="3"
                    style={[styles.optionBtn, styles.optionInput]}
                    onChange={_handleRadioChange.bind(this)} />
                  <button type="button" style={styles.optionBtn}>
                    Fair <span style={styles.small}>600 - 649</span>
                  </button>
                </label>
              </p>
            </div>

            <div className="col-1-2 last">
              <p>
                <label style={styles.optionLabel}>
                  <input key="opt4" type="radio" name="radioGroup" value="4"
                    style={[styles.optionBtn, styles.optionInput]}
                    onChange={_handleRadioChange.bind(this)} />
                  <button type="button" style={styles.optionBtn}>
                    Poor <span style={styles.small}>599 or below</span>
                  </button>
                </label>
              </p>
            </div>

          </div>

          <p style={styles.buttonWrap}>
            <button type="button" style={styles.button} formNoValidate
              onClick={_handleButtonClick.bind(this)}>Next</button>
          </p>

        </fieldset>
      </form>
    </MainContentWrap>
  )
}


CreditRating.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  creditRatingId: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { creditRatingId } }) {
  return { creditRatingId }
}


export default connect(mapStateToProps)(Radium(CreditRating))
