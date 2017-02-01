
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/creditrating'


const ResidenceType = ({
  children,
  h1,
  h2,
  h3,
  h4,
  residenceTypeId,
  dispatch,
  onNextPage
}) => {

  const _handleRadioChange = ({ target }) => {
    const residenceTypeId = target.value

    dispatch(action.updateResidenceTypeId({
      value: residenceTypeId,
      isValid: true
    }))
  }

  const _handleButtonClick = () => {
    residenceTypeId.isValid && onNextPage()
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="residence-type" onSubmit={e => e.preventDefault()}>
        <fieldset>
          <div className="grid" style={styles.optionBtnsWrap}>

            <div className="col-1-2">
              <p>
                <label style={styles.optionLabel}>
                  <input key="option1" type="radio" name="radioGroup" value="1"
                        style={[styles.optionBtn, styles.optionInput]}
                        onChange={_handleRadioChange.bind(this)} />
                  <button type="button" style={styles.optionBtn}>
                    Own
                  </button>
                </label>
              </p>
            </div>

            <div className="col-1-2 last">
              <p>
                <label style={styles.optionLabel}>
                  <input key="option2" type="radio" name="radioGroup" value="2"
                        style={[styles.optionBtn, styles.optionInput]}
                        onChange={_handleRadioChange.bind(this)} />
                  <button type="button" style={styles.optionBtn}>
                    Rent
                  </button>
                </label>
              </p>
            </div>

            <div className="col-1-2">
              <p>
                <label style={styles.optionLabel}>
                  <input key="option4" type="radio" name="radioGroup" value="4"
                        style={[styles.optionBtn, styles.optionInput]}
                        onChange={_handleRadioChange.bind(this)} />
                  <button type="button" style={styles.optionBtn}>
                    Live with Parents
                  </button>
                </label>
              </p>
            </div>

            <div className="col-1-2 last">
              <p>
                <label style={styles.optionLabel}>
                  <input key="option5" type="radio" name="radioGroup" value="5"
                        style={[styles.optionBtn, styles.optionInput]}
                        onChange={_handleRadioChange.bind(this)} />
                  <button type="button" style={styles.optionBtn}>
                    Other
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


ResidenceType.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  residenceTypeId: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { residenceTypeId } }) {
  return { residenceTypeId }
}


export default connect(mapStateToProps)(Radium(ResidenceType))
