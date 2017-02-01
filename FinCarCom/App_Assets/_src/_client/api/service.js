
import fetch from 'isomorphic-fetch'
import { appMode } from '../core/global'



const updateLeadUrl = '/api/finance-lead/'


const isRefi = mode => mode === 'refinance'

const getPlacementCheckUrl = mode => `/api/${ isRefi(mode) ? 're' : '' }finance-lead/check/`

const getSubmitLeadUrl = mode => `/api/${ isRefi(mode) ? 're' : '' }finance-lead/submit/`


export const getCurrentMake = ({ lead: { vehicle: { make } } }) => ({ id: make.value, name: make.label })
export const getAppMode = ({ app }) => app.mode

export const getCurrentPage = ({ mode, pages, pageIdx }) => {
  const CAR = window.CAR
      , pageSequence = (mode === appMode.REFINANCE)
                        ? CAR.refiModePageSeq
                        : (mode === appMode.NO_QUALIFY)
                          ? CAR.noqualModePageSeq
                          : CAR.purchModePageSeq

  let thisUrl = pageSequence[pageIdx].url
  return pages.filter(i => i.url === thisUrl)[0]
}

export const getLeadData = state => {
  const { lead, app } = state

  const value_prop = 'value'
      , employmentTime = lead.employmentTime[value_prop]
      , residenceTime = lead.residenceTime[value_prop]

  return {
    id: lead.id,
    sessionId: lead.sessionId,
    address: lead.address[value_prop],
    city: lead.cityStateZip[value_prop].city,
    state: lead.cityStateZip[value_prop].state,
    zipcode: lead.cityStateZip[value_prop].zipcode,
    income: lead.income[value_prop],
    ssn: lead.ssn[value_prop],
    dob: lead.dob[value_prop],
    creditRatingId: lead.creditRatingId[value_prop],
    firstname: lead.firstName[value_prop],
    lastname: lead.lastName[value_prop],
    email: lead.email[value_prop],
    homePhone: lead.homePhone[value_prop],
    mobilePhone: lead.mobilePhone[value_prop],
    workPhone: lead.workPhone[value_prop],
    resTypeId: lead.residenceTypeId[value_prop],
    resTimeInMos: +residenceTime.months + (residenceTime.years * 12),
    resCostInMos: lead.residenceCost[value_prop],
    employer: lead.employer[value_prop],
    emplTimeInMos: +employmentTime.months + (employmentTime.years * 12),
    jobTitle: lead.jobTitle[value_prop],

    make: lead.vehicle.make[value_prop],
    model: lead.vehicle.model.label,
    year: lead.vehicle.year[value_prop],
    mileage: lead.vehicle.mileage[value_prop],

    privacyPolicyApproved: app.privacyPolicy.hasBeenAccepted,
    tcpaContactAccepted: app.tcpaAuth.hasBeenAccepted,
    creditAuthApproved: app.creditAuth.hasBeenAccepted,
    forwardAppAuthApproved: app.creditAuth.hasBeenAccepted,
    creditEvalOfferAccepted: false
  }
}

const makeApiPostCall = (url, data) => fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  body: encodeURI(`=${ JSON.stringify(data) }`)
})
.then(res => res.json())


const checkPlacement = (mode, lead) => makeApiPostCall(getPlacementCheckUrl(mode), lead)
    , submitLead = (mode, lead) => makeApiPostCall(getSubmitLeadUrl(mode), lead)
    , updateStagedLead = lead => makeApiPostCall(`${ updateLeadUrl }${lead.id}`, lead)
    , fetchModels = make => fetch(`/api/vspec/make/${ make.id }/models/`).then(res => res.json())


export default {
  checkPlacement,
  submitLead,
  updateStagedLead,
  fetchModels
}
