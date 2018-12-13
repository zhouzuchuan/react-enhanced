import React from 'react'
import { request } from '../store'

export default (id, limit = []) => WrappedComponent => {
    const name = WrappedComponent.displayName || WrappedComponent.name
    const RequestHoc = props => {
        return <WrappedComponent {...{ ...props, ...request(id, limit) }} />
    }
    Reflect.defineProperty(RequestHoc, 'name', { value: `RequestHoc-${name}` })
    return RequestHoc
}
