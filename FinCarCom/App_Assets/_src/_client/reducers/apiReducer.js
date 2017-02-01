
import actions from '../actions'


const initialState = {
  placement: {
    isChecking: false,
    isChecked: false
  },
  lead: {
    isSubmitting: false,
    isSubmitted: false
  }
}


const apiReducer = (state = initialState, action = {}) => {

  switch(action.type){

    case actions.PLACEMENT_CHECKING:
      return {
        ...state,
        isChecking: true,
        isChecked: false
      }

    case actions.PLACEMENT_CHECKED:
      return {
        ...state,
        isChecking: true,
        isChecked: false
      }

    case actions.LEAD_SUBMITTING:
      return {
        ...state,
        isSubmitting: true,
        isSubmitted: false
      }

    case actions.LEAD_SUBMITTED:
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true
      }


    default:
      return state
  }
}


export default apiReducer
