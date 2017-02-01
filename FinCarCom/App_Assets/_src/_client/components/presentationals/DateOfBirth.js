
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import Radium from 'radium'
import NumberFormat from 'react-number-format'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental'
import { MainContentWrap } from '../'
import action from '../../actions'
import styles from '../styles/dateofbirth'


const DateOfBirth = ({
  children,
  h1,
  h2,
  h3,
  h4,
  dob,
  creditAuth,
  dispatch,
  onNextPage
}) => {

  let hideValid = dob.state !== 1
    , hideNotValid = dob.state !== 2
    , hideLoader = dob.state !== 3


  const submitLead = () => {
    dispatch(action.doLeadSubmission())

    // leadApi.submitLead(state, data => {
    //   data.isKosher && onNextPage()
    // })
  }


  const _handleCreditAuthAcceptClick = () => {
    dispatch(action.updateCreditAuthAccepted(true))
    dispatch(action.toggleCreditAuthOverlay())

    dob.isValid && submitLead()
  }


  const isMonthValid = month => {
    let m = parseInt(month)
    return m && m > 0 && m < 13
  }

  const isDayValid = day => {
    let d = parseInt(day)
    return d && d > 0 && d < 32
  }

  const isYearValid = year => {
    let y = parseInt(year)
    return y && y > 1930 && y < ((new Date).getFullYear() - 14)
  }



  const _handleButtonClick = () => {
    if(dob.isValid) {
      if(creditAuth.hasBeenAccepted) {
        onNextPage()
      } else {
        dispatch(action.toggleCreditAuthOverlay())
      }
    }
  }


  const _handleDateOfBirthChange = () => {
    dispatch(action.updateDateOfBirth({
      value: dob.value,
      isValid: false,
      state: 0
    }))
  }

  const _handleDateOfBirthBlur = ({ target }) => {
    const dobVal = target.value
        , parts = dobVal.split('/')
        , month = parts[0]
        , day = parts[1]
        , year = parts[2]
        , isValid = isMonthValid(month)
            && isDayValid(day)
            && isYearValid(year)


    dispatch(action.updateDateOfBirth({
      value: dobVal,
      isValid,
      state: 3
    }))

    if(isValid) {
      dispatch(action.updateDateOfBirth({
        value: dobVal,
        isValid,
        state: isValid ? 1 : 2
      }))
    } else {
      dispatch(action.updateDateOfBirth({
        value: dobVal,
        isValid,
        state: 2
      }))
    }
  }


  return (
    <MainContentWrap
      children={children} h1={h1}
      h2={h2} h3={h3} h4={h4}>

      <form key="date-of-birth" onSubmit={e => e.preventDefault()}>
        <fieldset style={styles.fieldset}>
          <p>
            <span style={styles.inputWrap}>

              <NumberFormat name="dob" style={styles.input}
                autoComplete="off" value={dob.value} autoFocus
                placeholder="MM/DD/YYYY" format="##/##/####"
                onBlur={_handleDateOfBirthBlur.bind(this)}
                onFocus={e => e.target.select()}
                onChange={_handleDateOfBirthChange.bind(this)} />

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

      <Modal isOpen={creditAuth.overlayIsOpen} width='large'>
        <ModalHeader text='Credit Authorization'></ModalHeader>
        <ModalBody>
          <p>
            By checking this box, you certify that all of the statements in this application are true and
            complete and are made for the purpose of obtaining auto loan credit. You agree to provide and/or
            authorize CAR.COM and/or lending, automobile dealer, or others to obtain such additional information
            as may be required, including credit reports, in order to complete the processing of your auto loan
            application and agree to the following.
          </p>
          <h3>Additional Permissions</h3>
          <p>
            Car.com forwards this application and your financial information to one or more third party lenders,
            dealers, or others that may be able to offer you, or assist you in finding, financing that meets
            your needs. Some of these partners may offer or arrange dealer financing rather than a direct loan
            from a lender. Car.com will retain your financial information for as long as we determine it is
            needed for the purpose of determining your eligibility for credit.
          </p>
          <p>
            We also may retain your contact information in order to provide you with information about goods or
            services in which you may have an interest and may forward your contact information to third parties.
            You have the right to refuse to permit ("opt-out" of) such disclosures. For more information on how to
            opt out and on how we use your personal information, please see our Privacy Notice.
          </p>
          <p>
            BY SUBMITTING THIS APPLICATION, I/WE AUTHORIZE IT AND MY/OUR FINANCIAL INFORMATION TO BE FORWARDED AS
            ABOVE-DESCRIBED. I/WE FURTHER AUTHORIZE THOSE THIRD PARTY LENDERS, DEALERS, OR OTHERS WHICH ARE FORWARDED
            THE APPLICATION TO SHARE INFORMATION IN MY APPLICATION, AND ANY OTHER CREDIT INFORMATION THEY OBTAIN,
            WITH OTHER THIRD PARTIES WHO MAY BE ABLE TO OFFER OR ARRANGE FOR A DIRECT LOAN OR DEALER FINANCING.
          </p>
        </ModalBody>
        <ModalFooter>
          <p>
            For any other issues, please contact our customer service department
            at&nbsp;<a href="mailto:consumercare@autobytel.com">consumercare@autobytel.com</a>.<br />
            Our mailing address is: 18872 MacArthur Boulevard, Suite 200, Irvine, CA 92612-1400.
          </p>
          <div className='overlay-btn-wrap'>
            <button className='overlay-btn overlay-btn-bottom overlay-btn--primary'
                    onClick={_handleCreditAuthAcceptClick.bind(this)}>Accept</button>
          </div>
        </ModalFooter>
      </Modal>

    </MainContentWrap>
  )
}

DateOfBirth.propTypes = {
  supertitle: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  dob: PropTypes.object.isRequired,
  creditAuth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired
}


function mapStateToProps(state) {
  const { app: { creditAuth }, lead: { dob } } = state
  return { dob, creditAuth }
}


export default connect(mapStateToProps)(Radium(DateOfBirth))
