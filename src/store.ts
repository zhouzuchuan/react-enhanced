import React from 'react'
import { RequestLoadingProps } from './RequestLoading'

export type TReStore = Partial<{
    store: any
    registerModel: any
    apiManage: any
    requestLoadingProps: RequestLoadingProps['spinnerProps']
}> & {}

export const ReStore: TReStore = {}

export const addStore = (data: Record<string, any>) => {
    Object.entries(data).forEach(([key, value]) => {
        Reflect.set(ReStore, key, value)
    })
}

export const getStore = (key: keyof TReStore) => Reflect.get(ReStore, key)

export const ReactEnhancedContext = React.createContext(ReStore)

export const setRequestLoadingProps = (
    data: Record<keyof RequestLoadingProps['spinnerProps'], any>,
) => {
    addStore({
        requestLoadingProps: { ...getStore('requestLoadingProps'), ...data },
    })
}
