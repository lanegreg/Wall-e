
const base = 'fin.car.com/api/'
    , SUBMIT_LEAD = `${base}SUBMIT_LEAD`
    , LEAD_SUBMITTING = `${base}LEAD_SUBMITTING`
    , LEAD_SUBMITTED = `${base}LEAD_SUBMITTED`
    , CHECK_PLACEMENT = `${base}CHECK_PLACEMENT`
    , PLACEMENT_CHECKING = `${base}PLACEMENT_CHECKING`
    , PLACEMENT_CHECKED = `${base}PLACEMENT_CHECKED`
    , FETCH_MODELS = `${base}FETCH_MODELS`
    , MODELS_FETCHING = `${base}MODELS_FETCHING`
    , MODELS_FETCHED = `${base}MODELS_FETCHED`


const doPlacementCheck = () => {
  return {
    type: CHECK_PLACEMENT
  }
}

const doLeadSubmission = () => {
  return {
    type: SUBMIT_LEAD
  }
}

const fetchModels = () => {
  return {
    type: FETCH_MODELS
  }
}

export default {
  doPlacementCheck,
  doLeadSubmission,
  fetchModels,

  SUBMIT_LEAD,
  LEAD_SUBMITTING,
  LEAD_SUBMITTED,
  CHECK_PLACEMENT,
  PLACEMENT_CHECKING,
  PLACEMENT_CHECKED,
  FETCH_MODELS,
  MODELS_FETCHING,
  MODELS_FETCHED
}
