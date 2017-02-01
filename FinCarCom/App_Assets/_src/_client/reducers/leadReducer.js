
import actions from '../actions'



const initialState = {
  id: 0,
  sessionId: '',
  vehicle: {
    year: {
      value: 0,
      isValid: false,
      state: 0
    },
    mileage: {
      value: 0,
      isValid: false,
      state: 0
    },
    make: {
      label: 'Select a Make...',
      value: 0,
      isValid: false,
      state: 0
    },
    model: {
      label: 'Select a Model...',
      value: 0,
      isValid: false,
      state: 0
    }
  },
  income: {
    value: '',
    isValid: false,
    state: 0
  },
  creditRatingId: {
    value: 0,
    isValid: false
  },
  firstName: {
    value: '',
    isValid: false,
    state: 0
  },
  lastName: {
    value: '',
    isValid: false,
    state: 0
  },
  email: {
    value: '',
    isValid: false,
    state: 0
  },
  mobilePhone: {
    value: '',
    isValid: false,
    state: 0
  },
  homePhone: {
    value: '',
    isValid: false,
    state: 0
  },
  address: {
    value: '',
    isValid: false,
    state: 0
  },
  cityStateZip: {
    value: {
      city: '',
      state: '',
      zipcode: '',
      formatted: ''
    },
    isValid: false,
    state: 0
  },
  residenceTypeId: {
    value: 0,
    isValid: false,
    state: 0
  },
  residenceTime: {
    value: {
      months: 0,
      years: 0
    },
    isValid: false,
    state: 0
  },
  residenceCost: {
    value: 0,
    isValid: false,
    state: 0
  },
  employer: {
    value: '',
    isValid: false,
    state: 0
  },
  employmentTime: {
    value: {
      months: 0,
      years: 0
    },
    isValid: false,
    state: 0
  },
  workPhone: {
    value: '',
    isValid: false,
    state: 0
  },
  jobTitle: {
    value: '',
    isValid: false,
    state: 0
  },
  dob: {
    value: '',
    isValid: false,
    state: 0
  },
  ssn: {
    value: '',
    isValid: false,
    state: 0
  }
}


const leadReducer = (state = initialState, action = {}) => {
  switch(action.type){

    case actions.UPDATE_ID:
      return { ...state, id: action.id }

    case actions.UPDATE_SESSION_ID:
      return { ...state, sessionId: action.sessionId }

    case actions.UPDATE_INCOME:
      return { ...state, income: action.income }

    case actions.UPDATE_CREDIT_RATING_ID:
      return { ...state, creditRatingId: action.creditRatingId }

    case actions.UPDATE_FIRST_NAME:
      return { ...state, firstName: action.firstName }

    case actions.UPDATE_LAST_NAME:
      return { ...state, lastName: action.lastName }

    case actions.UPDATE_EMAIL:
      return { ...state, email: action.email }

    case actions.UPDATE_MOBILE_PHONE:
      return { ...state, mobilePhone: action.mobilePhone }

    case actions.UPDATE_HOME_PHONE:
      return { ...state, homePhone: action.homePhone }

    case actions.UPDATE_ADDRESS:
      return { ...state, address: action.address }

    case actions.UPDATE_CITY_STATE_ZIP:
      return { ...state, cityStateZip: action.cityStateZip }

    case actions.UPDATE_RESIDENCE_TYPE_ID:
      return { ...state, residenceTypeId: action.residenceTypeId }

    case actions.UPDATE_RESIDENCE_TIME:
      return { ...state, residenceTime: action.residenceTime }

    case actions.UPDATE_RESIDENCE_COST:
      return { ...state, residenceCost: action.residenceCost }

    case actions.UPDATE_EMPLOYER:
      return { ...state, employer: action.employer }

    case actions.UPDATE_EMPLOYMENT_TIME:
      return { ...state, employmentTime: action.employmentTime }

    case actions.UPDATE_WORK_PHONE:
      return { ...state, workPhone: action.workPhone }

    case actions.UPDATE_JOB_TITLE:
      return { ...state, jobTitle: action.jobTitle }

    case actions.UPDATE_DATE_OF_BIRTH:
      return { ...state, dob: action.dob }

    case actions.UPDATE_SOCIAL_SECURITY:
      return { ...state, ssn: action.ssn }

    case actions.UPDATE_VEHICLE_YEAR:
      return { ...state,
        vehicle: {
          ...state.vehicle,
          year: action.year
        }
      }

    case actions.UPDATE_VEHICLE_MILEAGE:
      return { ...state,
        vehicle: {
          ...state.vehicle,
          mileage: action.mileage
        }
      }

    case actions.UPDATE_VEHICLE_MAKE:
      return { ...state,
        vehicle: {
          ...state.vehicle,
          make: action.make
        }
      }

    case actions.UPDATE_VEHICLE_MODEL:
      return { ...state,
        vehicle: {
          ...state.vehicle,
          model: action.model
        }
      }


    default:
      return state
  }
}

export default leadReducer
