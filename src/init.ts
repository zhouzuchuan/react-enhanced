import React from 'react'
import ApiManage from 'api-manage'
import modelRedux from 'model-redux'
import Provider from './Provider'

import loadingModel from './models/loading'

import { toArray } from './utils'
import { ReStore } from './store'

import { LOADING_MODEL_NAME } from './constant'

const init = ({ models = [], loading = 'wave', apiConfig, modelConfig }) => {
    const { store, registerModel } = modelRedux.create(modelConfig)

    const apiHookStart = modelConfig?.hooks?.start
    const apiHookFinally = modelConfig?.hooks?.finally

    const a = new ApiManage({
        ...apiConfig,

        hooks: {
            ...(apiConfig.hooks || {}),
            start(serveName, timestamp) {
                store.dispatch({
                    type: `${LOADING_MODEL_NAME}/set`,
                    payload: `${serveName}-${timestamp}`,
                })

                if (typeof apiHookStart === 'function') apiHookStart(arguments)
            },
            finally(serveName, timestamp) {
                store.dispatch({
                    type: `${LOADING_MODEL_NAME}/remove`,
                    payload: `${serveName}-${timestamp}`,
                })

                if (typeof apiHookFinally === 'function')
                    apiHookFinally(arguments)
            },
        },
    })

    ReStore.set('store', store)
    ReStore.set('registerModel', registerModel)
    ReStore.set('dispatch', store.dispatch)

    // 注入默认model
    ;[...toArray(models), loadingModel].forEach((v) => {
        ReStore.get('registerModel')(v)
    })
    // RE.registerModel = (fns) => {
    //     return registerModel(
    //         isFunction(fns)
    //             ? [fns(pick(RE, ['pull', 'push', 'request']))]
    //             : fns,
    //     )
    // }

    return {
        Provider,
        dispatch: store.dispatch,
    }
}
