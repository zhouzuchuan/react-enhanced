import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import lo from 'lodash'
import {
    // ConnectedRouter,
    routerReducer,
    routerMiddleware,
    createReducer as createReducer2
} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import createGlobalReducer from './reducer'
import rootSaga from './saga'

import { fork, takeLatest, all } from 'redux-saga/effects'

import { composeWithDevTools } from 'redux-devtools-extension'

import axiosMiddleware from './middleware/axiosMiddleware'

// 创建 router histroy 中间件
const historyMiddleware = routerMiddleware(createHistory())

// 创建saga 中间件
const sagaMiddleware = createSagaMiddleware()

// 中间件列表
const middleware = [historyMiddleware, sagaMiddleware, axiosMiddleware]

const store = createStore(
    createGlobalReducer(),
    composeWithDevTools(applyMiddleware(...middleware))
)

store.asyncReducers = {}
store.asyncSagas = {}

// 处理saga
sagaMiddleware.run(rootSaga)

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

const addNameSpace = (obj = {}, namespace) =>
    Object.entries(obj).reduce(
        (r, [n, m]) => ({ ...r, [`${namespace}/${n}`]: m }),
        {}
    )

export function injectAsyncReducers(store, asyncReducers, initialState) {
    let flag = false

    if (asyncReducers) {
        for (let [n, m] of Object.entries(asyncReducers)) {
            if (Object.prototype.hasOwnProperty.call(asyncReducers, n)) {
                if (!store.asyncReducers[n]) {
                    store.asyncReducers[n] = createReducer(
                        initialState[n] || {},
                        m
                    )
                    flag = true
                }
            }
        }
        flag && store.replaceReducer(combineReducers(store.asyncReducers))
    }
}

export function injectAsyncSagas(store, sagas) {
    if (sagas) {
        for (let [n, m] of Object.entries(sagas)) {
            if (Object.prototype.hasOwnProperty.call(sagas, n)) {
                if (!store.asyncSagas[n]) {
                    store.asyncSagas[n] = m
                    sagaMiddleware.run(m)
                }
            }
        }
    }
}

export function initRedux(models) {
    const deal = (Array.isArray(models) ? models : [models])
        .filter(({ namespace, effects, reducer }) => {
            return [namespace, effects, reducer].every(v => !lo.isUndefined(v))
        })
        .reduce((r, { namespace, effects, reducer, state }) => {
            return {
                state: {
                    ...(r.state || {}),
                    [namespace]: state
                },
                sagas: {
                    ...(r.sagas || {}),
                    [namespace]: addNameSpace(effects, namespace)
                },
                reducers: {
                    ...(r.reducers || {}),
                    [namespace]: addNameSpace(reducer, namespace)
                }
            }
        }, {})

    injectAsyncReducers(store, deal.reducers, deal.state)
    injectAsyncSagas(
        store,
        Object.entries(deal.sagas).reduce((r, [name, fns]) => {
            return {
                ...r,
                [name]: function*() {
                    yield all([
                        fork(function*() {
                            yield Object.entries(fns).map(([n, m]) => {
                                return takeLatest(n, m)
                            })
                        })
                    ])
                }
            }
        }, {})
    )
}

// let chuan;

// export default ({
//     initialState = {},
//     reducers = {},
//     sagas = [],
//     middlewares = []
// } = {}) => () => {

//     // 中间件列表
//     const middleware = [historyMiddleware, sagaMiddleware, axiosMiddleware]

//     const store = createStore(
//         combineReducers({
//             ...reducers,
//             route: routerReducer
//         }),
//         initialState,
//         composeWithDevTools(applyMiddleware(...[...middleware, ...middlewares]))
//     )

//     // 处理saga
//     sagaMiddleware.run(function*() {
//         yield all(sagas)
//     })

//     // // 热重载reducers (requires Webpack or Browserify HMR to be enabled)
//     // if (module.hot) {
//     //     module.hot.accept('../reducers', () =>
//     //         store.replaceReducer(
//     //             require('../reducers') /*.default if you use Babel 6+ */
//     //         )
//     //     )
//     // }

//     store.asyncReducers = {}
//     store.asyncSagas = {}
//     return { store, sagaMiddleware }
// }
