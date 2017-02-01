
import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import sagaMiddlewareFactory from 'redux-saga'
import loggerMiddlewareFactory from 'redux-logger'


const loggerMiddleware = loggerMiddlewareFactory()
export const sagaMiddleware = sagaMiddlewareFactory()


const configureStore = reducers => {
  const composedCreateStore = compose(
      applyMiddleware(
        thunkMiddleware,
        sagaMiddleware,
        loggerMiddleware
      ),
      window.devToolsExtension
        ? window.devToolsExtension()
        : f => f // <- ...basically a noop()
    )(createStore)

  return composedCreateStore(reducers)
}


export default configureStore
