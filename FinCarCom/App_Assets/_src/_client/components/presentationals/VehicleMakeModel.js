
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown'
import Radium from 'radium'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/carmakemodel'

Dropdown.defaultProps = { baseClassName: 'dd' }

const VehicleMakeModel = ({
  children,
  h1,
  h2,
  h3,
  h4,
  make,
  model,
  makes,
  models,
  dispatch,
  onNextPage
}) => {

  let hideMakeValid = make.state !== 1
    , hideMakeNotValid = make.state !== 2
    , hideMakeLoader = make.state !== 3
    , hideModelValid = model.state !== 1
    , hideModelNotValid = model.state !== 2
    , hideModelLoader = model.state !== 3


  const _handleMakeChange = ({ label, value }) => {
    dispatch(action.updateVehicleMake({
      label,
      value,
      isValid: true,
      state: 1
    }))

    dispatch(action.fetchModels())
  }

  const _handleModelChange = ({ label, value }) => {
    dispatch(action.updateVehicleModel({
      label,
      value,
      isValid: true,
      state: 1
    }))

    setTimeout(() => {document.getElementById('nextBtn').focus()}, 100)
  }


  const _handleButtonClick = () => {
    if (!make.isValid) {
      dispatch(action.updateVehicleMake({...make, state: 2}))
    } else if (!model.isValid) {
      dispatch(action.updateVehicleModel({...model, state: 2}))
    } else {
      onNextPage()
    }
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="vehicle-make-model" onSubmit={e => e.preventDefault()}>
        <fieldset>
          <div style={styles.fieldset}>
            <span style={styles.dropdownWrap}>

              <Dropdown name="make" value={make} options={makes}
                style={styles.input} autoFocus
                onChange={_handleMakeChange.bind(this)} />

              <span style={styles.dropdownValidWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideMakeLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideMakeValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideMakeNotValid && styles.hide]}>
                  <use xlinkHref="#input_not_valid"></use>
                </svg>
              </span>

            </span>
          </div>

          <div style={styles.fieldset}>
            <span style={styles.dropdownWrap}>

              <Dropdown name="model" value={model} options={models}
                style={styles.input}
                onChange={_handleModelChange.bind(this)}>blabla</Dropdown>

              <span style={styles.dropdownValidWrap}>
                <svg className="loader-anim"
                  style={[styles.loader, hideModelLoader && styles.hide]}>
                  <use xlinkHref="#input_loader"></use>
                </svg>
                <svg style={[styles.svg, styles.valid, hideModelValid && styles.hide]}>
                  <use xlinkHref="#input_valid"></use>
                </svg>
                <svg style={[styles.svg, styles.notValid, hideModelNotValid && styles.hide]}>
                  <use xlinkHref="#input_not_valid"></use>
                </svg>
              </span>

            </span>
          </div>

          <div style={styles.container}></div>

          <p style={styles.buttonWrap}>
            <button id="nextBtn" type="button" style={styles.button} formNoValidate
              onClick={_handleButtonClick.bind(this)}>Next</button>
          </p>

        </fieldset>
      </form>
    </MainContentWrap>
  )
}


VehicleMakeModel.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  make: PropTypes.object.isRequired,
  model: PropTypes.object.isRequired,
  makes: PropTypes.array.isRequired,
  models: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps({ lead: { vehicle: { make, model } }, app: { makes, models } }) {
  return { make, model, makes, models }
}


export default connect(mapStateToProps)(Radium(VehicleMakeModel))
