import React from 'react'

export type TReStore = Partial<{
    store: any
    registerModel: any
    apiManage: any
    ComponentLoading: any
}> & {}

export const ReStore: TReStore = {}

export const addStore = (data: Record<string, any>) => {
    Object.entries(data).forEach(([key, value]) => {
        Reflect.set(ReStore, key, value)
    })
}

export const getStore = (key: keyof TReStore) => Reflect.get(ReStore, key)

export const ReactEnhancedContext = React.createContext(ReStore)
