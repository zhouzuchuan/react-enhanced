/**
 * 注入方法
 * type: 当前类型，查看ContextStore
 * limit：获取CONTEXT中指定的key
 *
 * */
import React from 'react'
import pick from 'lodash.pick'
import RE from '../store'
import { isString, isArray, console } from '../utils'

export default (inject = []) => WrappedComponent => {
    const name = WrappedComponent.displayName || WrappedComponent.name
    const InstallHoc = props => {
        console.warn(
            'Install 将在未来的2.0版本删除，Loading以及AsyncComponent的使用，请查看文档 https://zhouzuchuan.github.io/react-enhanced/#/base/hoc'
        )
        const newProps = {
            ...props,
            ...(isString(inject) || isArray(inject) ? pick(RE, inject) : {})
        }
        return <WrappedComponent {...newProps} />
    }
    Reflect.defineProperty(InstallHoc, 'name', { value: `InstallHoc-${name}` })
    return InstallHoc
}
