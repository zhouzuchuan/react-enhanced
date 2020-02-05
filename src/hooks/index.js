import RE, { pull, push, request } from '../store'
import { TOP_WAREHOUSE_NAME, SERVE_NAME } from '../const'

/**
 * 使用仓库
 * */
export const useWarehouse = (warehouse = TOP_WAREHOUSE_NAME) => {
    const store = RE.__warehouse__[warehouse]

    if (!store) {
        console.warn(
            `仓库名 ${warehouse} 并未注册，请在 init 初始化中注册 warehouse！`,
        )
        return Array(3).fill(null)
    }

    return [store, push.bind(null, warehouse), pull.bind(null, warehouse)]
}

/**
 * 使用封装的request action
 * */
// export const useRequest = (warehouse = SERVE_NAME) => request(warehouse, true)
export const useRequest = (warehouse = SERVE_NAME) => RE[warehouse].getService()

/**
 * 使用封装Action
 * */
export const useAction = type => (params = {}) =>
    RE.dispatch({ type, ...params })

export default {
    useWarehouse,
    useRequest,
    useAction,
}
