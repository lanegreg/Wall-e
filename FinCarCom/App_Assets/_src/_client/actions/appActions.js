
import fetch from 'isomorphic-fetch'

const base = 'fin.car.com/app/'
    , INIT_APP_DATA = `${base}INIT_APP_DATA`
    , APP_DATA_INITTING = `${base}APP_DATA_INITTING`
    , APP_DATA_INITTED = `${base}APP_DATA_INITTED`
    , UPDATE_APP_MODE = `${base}UPDATE_APP_MODE`
    , UPDATE_APP_DATA = `${base}UPDATE_APP_DATA`
    , UPDATE_MAKES = `${base}UPDATE_MAKES`
    , UPDATE_MODELS = `${base}UPDATE_MODELS`

    , NEXT_PAGE = `${base}NEXT_PAGE`
    , PREV_PAGE = `${base}PREV_PAGE`
    , RESET_PAGE_SEQ = `${base}RESET_PAGE_SEQ`

    , RECEIVE_OVERLAY_CONTENT = `${base}RECEIVE_OVERLAY_CONTENT`
    , UPDATE_FOOTER_OVERLAY = `${base}UPDATE_FOOTER_OVERLAY`
    , TOGGLE_FOOTER_OVERLAY = `${base}TOGGLE_FOOTER_OVERLAY`

    , TOGGLE_PRIVACY_POLICY_OVERLAY = `${base}TOGGLE_PRIVACY_POLICY_OVERLAY`
    , UPDATE_PRIVACY_POLICY_ACCEPTED = `${base}UPDATE_PRIVACY_POLICY_ACCEPTED`
    , TOGGLE_CREDIT_AUTH_OVERLAY = `${base}TOGGLE_CREDIT_AUTH_OVERLAY`
    , UPDATE_CREDIT_AUTH_ACCEPTED = `${base}UPDATE_CREDIT_AUTH_ACCEPTED`
    , TOGGLE_TCPA_AUTH_OVERLAY = `${base}TOGGLE_TCPA_AUTH_OVERLAY`
    , UPDATE_TCPA_AUTH_ACCEPTED = `${base}UPDATE_TCPA_AUTH_ACCEPTED`



const gotoNextPage = () => {
  return {
    type: NEXT_PAGE
  }
}

const gotoPrevPage = () => {
  return {
    type: PREV_PAGE
  }
}

const resetPageSequence = () => {
  return {
    type: RESET_PAGE_SEQ
  }
}




const initAppData = () => {
  return {
    type: INIT_APP_DATA
  }
}

const appDataShouldBeInitialized = ({ app: { data } }) => {
  return !data.initted && !data.initting
}

const initAppIfNecessary = () => {
  return (dispatch, getState) => {
    if(appDataShouldBeInitialized(getState())) {
      dispatch(initAppData())
    }
  }
}




const receiveOverlayContent = content => {
  return {
    type: RECEIVE_OVERLAY_CONTENT,
    content
  }
}

const overlayContentShouldBeInitialized = ({ app }) => {
  return !app.privacyPolicy.content.length
}

const fetchOverlayContent = () => {
  return dispatch => {
    return fetch('/api/app/overlay-content')
      .then(resp => resp.json())
      .then(content => dispatch(receiveOverlayContent(content)))
  }
}

const initOverlayContentIfNecessary = () => {
  return (dispatch, getState) => {
    if(overlayContentShouldBeInitialized(getState())) {
      return dispatch(fetchOverlayContent())
    }
  }
}



const updateFooterOverlay = (heading, content, code) => {
  return {
    type: UPDATE_FOOTER_OVERLAY,
    heading, content, code
  }
}

const toggleFooterOverlay = () => {
  return {
    type: TOGGLE_FOOTER_OVERLAY
  }
}



const togglePrivacyPolicyOverlay = () => {
  return {
    type: TOGGLE_PRIVACY_POLICY_OVERLAY
  }
}

const updatePrivacyPolicyAccepted = hasBeenAccepted => {
  return {
    type: UPDATE_PRIVACY_POLICY_ACCEPTED,
    hasBeenAccepted
  }
}


const toggleTcpaAuthOverlay = () => {
  return {
    type: TOGGLE_TCPA_AUTH_OVERLAY
  }
}

const updateTcpaAuthAccepted = hasBeenAccepted => {
  return {
    type: UPDATE_TCPA_AUTH_ACCEPTED,
    hasBeenAccepted
  }
}


const toggleCreditAuthOverlay = () => {
  return {
    type: TOGGLE_CREDIT_AUTH_OVERLAY
  }
}

const updateCreditAuthAccepted = hasBeenAccepted => {
  return {
    type: UPDATE_CREDIT_AUTH_ACCEPTED,
    hasBeenAccepted
  }
}


export default {
  // actions for app level state changes
  initAppIfNecessary,
  initOverlayContentIfNecessary,
  gotoNextPage,
  gotoPrevPage,
  resetPageSequence,
  updateFooterOverlay,
  toggleFooterOverlay,

  // actions for overlay state changes
  togglePrivacyPolicyOverlay,
  updatePrivacyPolicyAccepted,
  toggleCreditAuthOverlay,
  updateCreditAuthAccepted,
  toggleTcpaAuthOverlay,
  updateTcpaAuthAccepted,

  INIT_APP_DATA,
  APP_DATA_INITTING,
  APP_DATA_INITTED,
  UPDATE_APP_MODE,
  UPDATE_APP_DATA,
  UPDATE_MAKES,
  UPDATE_MODELS,

  NEXT_PAGE,
  PREV_PAGE,
  RESET_PAGE_SEQ,
  RECEIVE_OVERLAY_CONTENT,
  UPDATE_FOOTER_OVERLAY,
  TOGGLE_FOOTER_OVERLAY,

  TOGGLE_PRIVACY_POLICY_OVERLAY,
  UPDATE_PRIVACY_POLICY_ACCEPTED,
  TOGGLE_CREDIT_AUTH_OVERLAY,
  UPDATE_CREDIT_AUTH_ACCEPTED,
  TOGGLE_TCPA_AUTH_OVERLAY,
  UPDATE_TCPA_AUTH_ACCEPTED
}
