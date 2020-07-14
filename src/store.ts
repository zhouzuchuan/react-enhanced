import React from 'react'
import { RequestLoadingProps } from './RequestLoading'

export type TReStore = Partial<{
    store: any
    registerModel: any
    apiManage: any
    requestLoadingProps: RequestLoadingProps['spinnerProps']
}> & {}

export const ReStore: TReStore = {}
/**
 * 添加储存
 *
 * @param {Record<string, any>} data
 */
export const addStore = (data: Record<string, any>) => {
    Object.entries(data).forEach(([key, value]) => {
        Reflect.set(ReStore, key, value)
    })
}
/**
 * 获取储存数据
 *
 * @param {keyof TReStore} key
 */
export const getStore = (key: keyof TReStore) => Reflect.get(ReStore, key)

/**
 * React Enhanced Context
 */
export const ReactEnhancedContext = React.createContext(ReStore)

/**
 * 设置 请求loading组件 props
 *
 * @param {Record<keyof RequestLoadingProps['spinnerProps'], any>} data
 */
export const setRequestLoadingProps = (
    data: Record<keyof RequestLoadingProps['spinnerProps'], any>,
) => {
    addStore({
        requestLoadingProps: { ...getStore('requestLoadingProps'), ...data },
    })
}

/**
 * 获取  请求loading组件 props
 *
 *@example 
 const request = getRequestLoadingProps()
 */
export const getRequestLoadingProps = (): Record<
    keyof RequestLoadingProps['spinnerProps'],
    any
> => getStore('requestLoadingProps')
