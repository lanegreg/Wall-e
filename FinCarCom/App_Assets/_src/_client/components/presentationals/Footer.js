
import React, { PropTypes } from 'react' // eslint-disable-line no-unused-vars
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental'
import action from '../../actions'
import Radium from 'radium'
import styles from '../styles/footer'


const Footer = ({
  year,
  privacyPolicy,
  fraudAlert,
  usageTerms,
  intellProp,
  corpInfo,
  footerOverlay,
  dispatch
}) => {

  const _handleFooterAnchorClick = (code, e) => {
    e.preventDefault()

    switch (code) {
      case 'pp':
        dispatch(action.updateFooterOverlay('Privacy Policy', privacyPolicy.content, 'pp'))
        break

      case 'fa':
        dispatch(action.updateFooterOverlay('Fraud Awareness', fraudAlert.content, 'fa'))
        break

      case 'ip':
        dispatch(action.updateFooterOverlay('Intellectual Property', intellProp.content, 'ip'))
        break

      case 'ci':
        dispatch(action.updateFooterOverlay('Corporate Information', corpInfo.content, 'ci'))
        break

      case 'ut':
        dispatch(action.updateFooterOverlay('Terms of Use', usageTerms.content, 'ut'))
        break

      default:
    }

    dispatch(action.toggleFooterOverlay())
  }

  const _handleFooterOverlayCloseClick = e => {
    e.preventDefault()
    dispatch(action.toggleFooterOverlay())
  }


  return (
    <footer style={styles.root}>
      <div style={styles.container}>
        <ul style={styles.linksWrap}>
          <li style={styles.linkItem}>
            <a key="pp" href="#" onClick={_handleFooterAnchorClick.bind(this, 'pp')}
              style={styles.link}>Privacy Policy</a>
            <span key="pp_fa" style={styles.linkDiscSeparator}></span>
          </li>
          <li style={styles.linkItem}>
            <a key="fa" href="#" onClick={_handleFooterAnchorClick.bind(this, 'fa')}
              style={styles.link}>Fraud Alert</a>
            <span key="fa_ip" style={styles.linkDiscSeparator}></span>
          </li>
          <li style={styles.linkItem}>
            <a key="ip" href="#" onClick={_handleFooterAnchorClick.bind(this, 'ip')}
              style={styles.link}>Intellectual Property</a>
          </li>
        </ul>
        <ul style={styles.linksWrap}>
          <li style={styles.linkItem}>
            <a key="ci" href="#" onClick={_handleFooterAnchorClick.bind(this, 'ci')}
              style={styles.link}>Corporate Information</a>
          <span key="ci_utd" style={styles.linkDiscSeparator}></span>
          </li>
          <li style={styles.linkItem}>
            <a key="ut" href="#" onClick={_handleFooterAnchorClick.bind(this, 'ut')}
              style={styles.link}>Usage Terms and Disclaimers</a>
          </li>
        </ul>
        <div style={styles.container}>
          <div style={styles.digicertWrap}>
            <img style={styles.digicertImg} src="/img/digicert-logo.png" alt="digicert logo"/>
          <span style={styles.digicertCopy}>
              Our secure server software encrypts all of your personal
              information including social security number, name, and address, therefore, making your information safe and secure.
            </span>
          </div>
        </div>
        <p style={styles.legalCopyWrap}>
          <span style={styles.legalCopy}>Copyright 1996-{year} Car.com, Inc.</span>
          <span style={styles.legalCopy}>All Rights Reserved Worldwide.</span>
        </p>
      </div>

      <Modal isOpen={footerOverlay.isOpen} width='large'>
        <ModalHeader text={footerOverlay.heading}>
        <button className='overlay-btn overlay-btn-top overlay-btn--primary'
                onClick={_handleFooterOverlayCloseClick.bind(this)}>Done</button>
        </ModalHeader>
        <ModalBody>
          <div dangerouslySetInnerHTML={{__html: footerOverlay.content}}></div>
        </ModalBody>
        <ModalFooter>
          <p>
            For any other issues, please contact our customer service department
            at&nbsp;<a href="mailto:consumercare@autobytel.com">consumercare@autobytel.com</a>.<br />
            Our mailing address is: 18872 MacArthur Boulevard, Suite 200, Irvine, CA 92612-1400.
          </p>
          <div className='overlay-btn-wrap'>
            <button className='overlay-btn overlay-btn-bottom overlay-btn--primary'
                    onClick={_handleFooterOverlayCloseClick.bind(this)}>Done</button>
          </div>
        </ModalFooter>
      </Modal>

    </footer>
  )
}

Footer.propTypes = {
  privacyPolicy: PropTypes.object.isRequired,
  fraudAlert: PropTypes.object.isRequired,
  usageTerms: PropTypes.object.isRequired,
  intellProp: PropTypes.object.isRequired,
  corpInfo: PropTypes.object.isRequired,
  footerOverlay: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}


function mapStateToProps({ app }) {
  const {
    privacyPolicy,
    fraudAlert,
    usageTerms,
    intellProp,
    corpInfo,
    footerOverlay
  } = app

  return {
    privacyPolicy,
    fraudAlert,
    usageTerms,
    intellProp,
    corpInfo,
    footerOverlay
  }
}


export default connect(mapStateToProps)(Radium(Footer))
