import pick from 'lodash.pick'

import 'babel-regenerator-runtime'
import ApiManage from 'api-manage'
import modelRedux from 'model-redux'
import Provider from './components/Provider'

import isEmpty from 'lodash.isempty'

import { isArray, loadFormat, isFunction, isObject, console } from './utils'
import RE from './store'

import loadingModel from './models/loading'

import { TOP_WAREHOUSE_NAME, SERVE_NAME, LOADING_MODEL_NAME } from './const'

export function configureStore({
    models = [],
    warehouse = [],
    loading = 'wave',
    guard = () => true,
    api = {},
    modelConfig = {},
} = {}) {
    let dealmodelConfig = modelConfig

    if (modelConfig.persist) {
        dealmodelConfig = {
            ...modelConfig,
            persist: {
                blacklist: [
                    LOADING_MODEL_NAME,
                    ...(isArray(modelConfig.persist.blacklist)
                        ? modelConfig.persist.blacklist
                        : []),
                ],
                ...(isObject(modelConfig.persist) ? modelConfig.persist : {}),
            },
        }
    }

    const { store, registerModel } = modelRedux.create(dealmodelConfig)

    const [RequestLoading, ComponentLoading] = loadFormat(loading)

    const { name = SERVE_NAME, ...apiParams } = api

    let guardFunction = guard

    if (!isFunction(guardFunction)) {
        console('guard must be function!')
        guardFunction = () => true
    }

    Object.entries({
        __warehouse__: warehouse.reduce(
            (r, v) => ({
                [v]: {},
                ...r,
            }),
            {
                ...(!isEmpty(apiParams) && {
                    [name]: new ApiManage({
                        ...apiParams,

                        hooks: {
                            ...(apiParams.hooks || {}),
                            start(serveName, timestamp) {
                                store.dispatch({
                                    type: `${LOADING_MODEL_NAME}/set`,
                                    payload: [serveName, timestamp],
                                })
                                if (
                                    apiParams.hooks &&
                                    typeof apiParams.hooks.start === 'function'
                                ) {
                                    apiParams.hooks.start(serveName, timestamp)
                                }
                            },
                            finally(serveName, timestamp) {
                                store.dispatch({
                                    type: `${LOADING_MODEL_NAME}/remove`,
                                    payload: [serveName, timestamp],
                                })

                                if (
                                    apiParams.hooks &&
                                    typeof apiParams.hooks.finally ===
                                        'function'
                                ) {
                                    apiParams.hooks.finally(
                                        serveName,
                                        timestamp,
                                    )
                                }
                            },
                        },
                    }),
                }),
                [TOP_WAREHOUSE_NAME]: {},
            },
        ),
        RequestLoading,
        ComponentLoading,
        guardFunction,
    }).forEach(([n, m]) => {
        RE[n] = m
    })

    RE.__store__ = store

    RE.registerModel = fns => {
        return registerModel(
            isFunction(fns)
                ? [fns(pick(RE, ['pull', 'push', 'request']))]
                : fns,
        )
    }

    RE.dispatch = RE.__store__.dispatch

    // 注入默认model
    ;[...(isArray(models) ? models : [models]), loadingModel].forEach(v =>
        RE.registerModel(v),
    )

    return { Provider, dispatch: RE.dispatch }
}
