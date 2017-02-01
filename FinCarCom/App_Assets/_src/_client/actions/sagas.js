
import { call, put, select } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import actions from '../actions'
import service, { getAppMode, getLeadData, getCurrentMake } from '../api/service'
import { url, appMode } from '../core/global'



function* initAppData() {
  yield put({ type: actions.APP_DATA_INITTING })

  const id = url.qsArgs('id')
      , mode = (!window.CAR.refiSrcIds.filter(i => i.id == id).length)
                ? appMode.PURCHASE
                : appMode.REFINANCE

  yield put({ type: actions.UPDATE_APP_MODE, mode })
  yield put({ type: actions.UPDATE_APP_DATA, pages: window.CAR.pageMeta })
  yield put({ type: actions.UPDATE_MAKES, makes: window.CAR.makes })
  yield put({ type: actions.APP_DATA_INITTED })
}

function* watchInitAppData() {
  yield* takeLatest(actions.INIT_APP_DATA, initAppData)
}


function* checkPlacementSaga() {
  yield put({ type: actions.PLACEMENT_CHECKING })
  const lead = yield select(getLeadData)
  const mode = yield select(getAppMode)
  const res = yield call(service.checkPlacement, mode, lead)
  yield put({ type: actions.PLACEMENT_CHECKED })

  if (res.isKosher) {
    yield put({ type: actions.UPDATE_ID, id: res.id || 0 })
    yield put({ type: actions.UPDATE_SESSION_ID, sessionId: res.sessionId })
    yield put({ type: actions.NEXT_PAGE })
  } else {
    yield put({ type: actions.RESET_PAGE_SEQ })
    yield put({ type: actions.UPDATE_APP_MODE, mode: appMode.NO_QUALIFY })
  }
}

function* watchCheckPlacement() {
  yield* takeLatest(actions.CHECK_PLACEMENT, checkPlacementSaga)
}


function* submitLeadSaga() {
  yield put({ type: actions.LEAD_SUBMITTING })
  const lead = yield select(getLeadData)
  const mode = yield select(getAppMode)
  const res = yield call(service.submitLead, mode, lead)
  yield put({ type: actions.LEAD_SUBMITTED })

  if (res.isKosher) {
    yield put({ type: actions.NEXT_PAGE })
  } else {
    yield put({ type: actions.NO_QUALIFY_PAGE })
  }
}

function* watchSubmitLead() {
  yield* takeLatest(actions.SUBMIT_LEAD, submitLeadSaga)
}


function* fetchModelsSaga() {
  yield put({ type: actions.MODELS_FETCHING })
  const make = yield select(getCurrentMake)
  const res = yield call(service.fetchModels, make)
  yield put({ type: actions.MODELS_FETCHED })

  if (res.isKosher) {
    yield put({
      type: actions.UPDATE_MODELS,
      models: res.models.map(m => ({ label: m.name, value: m.id }))
    })
  }
}

function* watchFetchModels() {
  yield* takeLatest(actions.FETCH_MODELS, fetchModelsSaga)
}


export default function* rootSaga() {
  yield [
    watchInitAppData(),
    watchCheckPlacement(),
    watchSubmitLead(),
    watchFetchModels()
  ]
}
