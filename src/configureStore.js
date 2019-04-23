import pick from 'lodash.pick'

import 'babel-regenerator-runtime'
import apiManage from 'api-manage'
import modelRedux from 'model-redux'
import Provider from './components/Provider'

import isEmpty from 'lodash.isempty'

import { isArray, loadFormat, isFunction } from './utils'
import RE from './store'

import loadingModel from './models/loading'

import { TOP_WAREHOUSE_NAME, SERVE_NAME } from './const'

export function configureStore({ models = [], warehouse = [], loading = 'wave', api = {}, modelConfig = {} } = {}) {
    const { store, registerModel, persistor } = modelRedux.create(modelConfig)

    const [RequestLoading, ComponentLoading] = loadFormat(loading)

    const { name = SERVE_NAME, ...apiParams } = api

    Object.entries({
        __warehouse__: warehouse.reduce(
            (r, v) => ({
                [v]: {},
                ...r,
            }),
            {
                ...(!isEmpty(apiParams) && { [name]: apiManage.init(apiParams) }),
                [TOP_WAREHOUSE_NAME]: {},
            },
        ),
        RequestLoading,
        ComponentLoading,
    }).forEach(([n, m]) => {
        RE[n] = m
    })

    RE.__store__ = store
    RE.persistor = persistor

    RE.registerModel = fns => {
        return registerModel(isFunction(fns) ? [fns(pick(RE, ['pull', 'push', 'request']))] : fns)
    }

    RE.dispatch = RE.__store__.dispatch

    // 注入默认model
    ;[...(isArray(models) ? models : [models]), loadingModel].forEach(v => RE.registerModel(v))

    return { Provider, dispatch: RE.dispatch }
}
