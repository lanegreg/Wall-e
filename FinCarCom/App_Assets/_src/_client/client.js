
//! This is the client-side entrypoint.

import React from 'react' // eslint-disable-line no-unused-vars
import { render } from 'react-dom'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { routerReducer as routing, syncHistoryWithStore } from 'react-router-redux'
import configureStore, { sagaMiddleware } from './core/store'
import routes from './core/routes'
import reducers from './reducers'
import rootSaga from './actions/sagas'


const store = configureStore(
  combineReducers({
    ...reducers,
    routing
  })
)

const history = syncHistoryWithStore(browserHistory, store)
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app_mount')
)
