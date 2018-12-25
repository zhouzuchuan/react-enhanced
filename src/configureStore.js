import { routerReducer } from 'react-router-redux'
import modelRedux from 'model-redux'
import pick from 'lodash.pick'

import 'babel-regenerator-runtime'
import apiManage from 'api-manage'

import isEmpty from 'lodash.isempty'

import { isArray, loadFormat, isFunction } from './utils'
import RE from './store'

import Provider from './components/Provider'

import Loading from './components/Loading'

import requestMiddleware from './middleware/requestMiddleware'
import AsyncComponent from './AsyncComponent'
import loadingModel from './models/loading'

import { TOP_WAREHOUSE_NAME, SERVE_NAME } from './const'

import sagas from 'model-redux/lib/effects/sagas'
import epics from 'model-redux/lib/effects/epics'

console.log(epics, sagas)

/**
 *
 *
 * @export
 * @param {any} [{
 *     state： 默认state,
 *     reducers： 全局reducers,
 *     effects： 全局effects,
 *     middlewares： saga中间件,
 *     requestCallback：请求统一回调,
 *     requestError：请求统一错误处理,
 *     resultLimit：根据返回的数据数据格式，统一自定义返回
 * }={}]
 * @returns
 */
export function configureStore({
    models = [],
    requestCallback,
    requestError,
    resultLimit,
    warehouse = [],
    loading = 'wave',
    api = {}
} = {}) {
    const [RequestLoading, ComponentLoading] = loadFormat(loading)

    const { name = SERVE_NAME, ...apiParams } = api

    Object.entries({
        __warehouse__: warehouse.reduce(
            (r, v) => ({
                [v]: {},
                ...r
            }),
            {
                ...(!isEmpty(apiParams) && { [name]: apiManage.init(apiParams) }),
                [TOP_WAREHOUSE_NAME]: {}
            }
        ),
        _effects: {},
        _epics: {},
        _reducers: {},
        _models: [],
        asyncReducers: { route: routerReducer },
        asyncSagas: {},
        asyncEpics: {},
        // registerModel: registerModel.bind(null, sagaMiddleware, epicMiddleware),

        AsyncComponent,
        Loading,

        RequestLoading,
        ComponentLoading
    }).forEach(([n, m]) => {
        RE[n] = m
    })

    const { store, registerModel } = modelRedux.create({
        middlewares: [
            [
                requestMiddleware.bind(null, RE, {
                    requestCallback,
                    requestError,
                    resultLimit
                })
            ]
        ]
        // effects: epics
    })

    RE.registerModel = fns => {
        return registerModel(isFunction(fns) ? [fns(pick(RE, ['pull', 'push', 'request']))] : fns)
    }

    RE.__store__ = store

    // // 热重载reducers (requires Webpack or Browserify HMR to be enabled)
    // if (module.hot) {
    //     module.hot.accept('../reducers', () =>
    //         store.replaceReducer(
    //             require('../reducers') /*.default if you use Babel 6+ */
    //         )
    //     )
    // }

    RE.dispatch = RE.__store__.dispatch
    RE.getState = RE.__store__.getState

    // 注入默认model
    ;[...(isArray(models) ? models : [models]), loadingModel].forEach(v => RE.registerModel(v))

    return {
        Provider
    }
}
