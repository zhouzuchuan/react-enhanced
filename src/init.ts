import ApiManage from 'api-manage'
import modelRedux from 'model-redux'

import Provider from './Provider'
import { toArray } from './utils/index'
import { addStore, TReStore } from './store'
import loadingModel, { LOADING_MODEL_NAME } from './loadingModel'

interface Init {
    models?: any[]
    apiConfig?: any
    modelConfig?: any
    requestLoadingConfig?: TReStore['requestLoadingProps']
}

const init = ({
    models = [],
    apiConfig,
    modelConfig,
    requestLoadingConfig,
}: Init) => {
    const { store, registerModel } = modelRedux.create(modelConfig)

    const apiHookStart = modelConfig?.hooks?.start
    const apiHookFinally = modelConfig?.hooks?.finally

    const apiManage = new ApiManage({
        ...apiConfig,

        hooks: {
            ...(apiConfig.hooks || {}),
            start() {
                store.dispatch({
                    type: `${LOADING_MODEL_NAME}/set`,
                    payload: [...arguments].join('--'),
                })

                if (typeof apiHookStart === 'function') apiHookStart(arguments)
            },
            finally() {
                store.dispatch({
                    type: `${LOADING_MODEL_NAME}/remove`,
                    payload: [...arguments].join('--'),
                })

                if (typeof apiHookFinally === 'function')
                    apiHookFinally(arguments)
            },
        },
    })

    const requestList = apiManage.getService()

    const ReRegisterModel = (data: Object | Function) =>
        registerModel(
            toArray(data).map((v) =>
                typeof v === 'function' ? v(requestList) : v,
            ),
        )

    addStore({
        store,
        registerModel: ReRegisterModel,
        apiManage,
        requestLoadingProps: {
            fadeIn: 'quarter',
            name: 'wave',
            ...(requestLoadingConfig || {}),
        },
    })

    // 注入默认model
    ;[...toArray(models), loadingModel].forEach((v) => {
        ReRegisterModel(v)
    })

    return {
        Provider,
        dispatch: store.dispatch,
    }
}

export { init }
