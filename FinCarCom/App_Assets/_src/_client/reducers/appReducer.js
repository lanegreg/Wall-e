
import actions from '../actions'



const initialState = {
  pageIdx: 0,
  pages: [],
  mode: '',
  data: {
    initting: false,
    initted: false
  },
  makes: [],
  models: [],
  corpInfo: {
    content: ''
  },
  usageTerms: {
    content: ''
  },
  intellProp: {
    content: ''
  },
  fraudAlert: {
    content: ''
  },
  privacyPolicy: {
    overlayIsOpen: false,
    hasBeenAccepted: false,
    content: ''
  },
  tcpaAuth: {
    overlayIsOpen: false,
    hasBeenAccepted: false,
    content: ''
  },
  creditAuth: {
    overlayIsOpen: false,
    hasBeenAccepted: false,
    content: ''
  },
  footerOverlay: {
    isOpen: false,
    heading: '',
    content: '',
    code: ''
  }
}


const appReducer = (state = initialState, action = {}) => {

  switch(action.type){
    case actions.APP_DATA_INITTING:
      return {...state, data: {
        initting: true,
        initted: false
      }}

    case actions.APP_DATA_INITTED:
      return {...state, data: {
        initting: false,
        initted: true
      }}

    case actions.UPDATE_APP_DATA:
      return {...state, pages: action.pages}

    case actions.UPDATE_APP_MODE:
      return {...state, mode: action.mode}

    case actions.UPDATE_MAKES:
      return {...state, makes: action.makes}

    case actions.UPDATE_MODELS:
      return {...state, models: action.models}


    case actions.NEXT_PAGE:
      return {...state, pageIdx: state.pageIdx + 1}

    case actions.PREV_PAGE:
      return {...state, pageIdx: state.pageIdx - 1}

    case actions.RESET_PAGE_SEQ:
      return {...state, pageIdx: 0}



    case actions.RECEIVE_OVERLAY_CONTENT:
      return {
        ...state,
        privacyPolicy: {
          ...state.privacyPolicy,
          content: action.content.privacyPolicy
        },
        fraudAlert: {
          ...state.fraudAlert,
          content: action.content.fraudAlert
        },
        usageTerms: {
          ...state.usageTerms,
          content: action.content.usageTerms
        },
        corpInfo: {
          ...state.corpInfo,
          content: action.content.corpInfo
        },
        intellProp: {
          ...state.intellProp,
          content: action.content.intellProp
        }
      }

    case actions.UPDATE_FOOTER_OVERLAY:
      return {
        ...state, footerOverlay: {
          ...state.footerOverlay,
          content: action.content,
          heading: action.heading,
          code: action.code
        }
      }

    case actions.TOGGLE_FOOTER_OVERLAY:
      return {
        ...state, footerOverlay: {
          ...state.footerOverlay,
          isOpen: !state.footerOverlay.isOpen
        }
      }



    case actions.TOGGLE_PRIVACY_POLICY_OVERLAY:
      return {
        ...state, privacyPolicy: {
          ...state.privacyPolicy,
          overlayIsOpen: !state.privacyPolicy.overlayIsOpen
        }
      }

    case actions.UPDATE_PRIVACY_POLICY_ACCEPTED:
      return {
        ...state, privacyPolicy: {
          ...state.privacyPolicy,
          hasBeenAccepted: action.hasBeenAccepted
        }
      }

    case actions.TOGGLE_CREDIT_AUTH_OVERLAY:
      return {
        ...state, creditAuth: {
          ...state.creditAuth,
          overlayIsOpen: !state.creditAuth.overlayIsOpen
        }
      }

    case actions.UPDATE_CREDIT_AUTH_ACCEPTED:
      return {
        ...state, creditAuth: {
          ...state.creditAuth,
          hasBeenAccepted: action.hasBeenAccepted
        }
      }


    case actions.TOGGLE_TCPA_AUTH_OVERLAY:
      return {
        ...state, tcpaAuth: {
          ...state.tcpaAuth,
          overlayIsOpen: !state.tcpaAuth.overlayIsOpen
        }
      }

    case actions.UPDATE_TCPA_AUTH_ACCEPTED:
      return {
        ...state, tcpaAuth: {
          ...state.tcpaAuth,
          hasBeenAccepted: action.hasBeenAccepted
        }
      }


    default:
      return state
  }
}

export default appReducer
