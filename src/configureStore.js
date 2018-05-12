import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {
    // ConnectedRouter,
    routerReducer,
    routerMiddleware
} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import { all } from 'redux-saga/effects'

import { composeWithDevTools } from 'redux-devtools-extension'

import axiosMiddleware from './middleware/axiosMiddleware'

import registerModel from './registerModel'
import AsyncComponent from './AsyncComponent'

// 创建 router histroy 中间件
const historyMiddleware = routerMiddleware(createHistory())

// 创建saga中间件
const sagaMiddleware = createSagaMiddleware()

export function configureStore({
    initialState = {},
    reducers = {},
    sagas = [],
    middlewares = []
} = {}) {
    // 中间件列表
    const middleware = [historyMiddleware, sagaMiddleware, axiosMiddleware]

    const store = createStore(
        combineReducers({
            ...reducers,
            route: routerReducer
        }),
        initialState,
        composeWithDevTools(applyMiddleware(...[...middleware, ...middlewares]))
    )

    // 处理saga
    sagaMiddleware.run(function*() {
        yield all(sagas)
    })

    // // 热重载reducers (requires Webpack or Browserify HMR to be enabled)
    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //         store.replaceReducer(
    //             require('../reducers') /*.default if you use Babel 6+ */
    //         )
    //     )
    // }

    store.asyncReducers = {}
    store.asyncSagas = {}

    const newR = registerModel.bind(null, store, sagaMiddleware)

    return {
        store,
        registerModel: newR,
        AsyncComponent: AsyncComponent.bind(null, newR)
    }
}
