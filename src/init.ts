import modelRedux, { ModelConfig } from 'model-redux'
import ApiManage, { ApiManageOptions } from 'api-manage'

import Provider from './Provider'
import { toArray } from './utils/index'
import { addStore, TReStore } from './store'
import loadingModel, { LOADING_MODEL_NAME, splitStr } from './loadingModel'

interface Init {
    models?: any[]
    apiConfig?: ApiManageOptions
    modelConfig?: ModelConfig
    requestLoadingConfig?: TReStore['requestLoadingProps']
}

const init = ({
    models = [],
    apiConfig,
    modelConfig,
    requestLoadingConfig,
}: Init) => {
    const { store, registerModel } = modelRedux.create(modelConfig)

    const apiHookStart = apiConfig?.hooks?.start
    const apiHookFinally = apiConfig?.hooks?.finally

    const apiManage = new ApiManage({
        ...apiConfig,
        hooks: {
            ...(apiConfig?.hooks || {}),
            start() {
                store.dispatch({
                    type: `${LOADING_MODEL_NAME}/set`,
                    payload: [...arguments].join(splitStr),
                })

                if (typeof apiHookStart === 'function')
                    apiHookStart(...arguments)
            },
            finally() {
                store.dispatch({
                    type: `${LOADING_MODEL_NAME}/remove`,
                    payload: [...arguments].join(splitStr),
                })

                if (typeof apiHookFinally === 'function')
                    apiHookFinally(...arguments)
            },
        },
    } as ApiManageOptions)

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
