import { useMemo } from 'react'
import { ReStore } from './store'

/**
 * 使用 apiManage 包装的 request function
 *
 * @returns {Promise[]}
 */
export const useApi = () => {
    const apiList: any = useMemo(() => ReStore.apiManage.getService(), [])
    return apiList
}
