import React from 'react'
import Spinner from 'react-spinkit'
import { isArray, isObject, isString } from './tools.js'

/**
 * 返回loading组件
 *
 *
 * @param {*} params
 * array: 为空不显示 数量为 则复制一份 大于等于2 则去前两个
 * string: 如果是默认编号 则显示 否则 不显示
 * 其他: 不显示
 *
 * 返回loading组件 [请求loading， 组件loading]
 * @returns {ReactNode[]}
 */
export default params => {
    const [ReqestLoading = null, ComponentLoading = null] = (isArray(params)
        ? params
        : isString(params)
        ? Array(2).fill(params)
        : [params]
    )
        .slice(0, 2)
        .map(v => {
            const REL = props =>
                React.isValidElement(v) ? (
                    v
                ) : (
                    <Spinner
                        {...{
                            style: {
                                marginRight: 'auto',
                                marginLeft: 'auto'
                            },
                            color: '#1890ff',
                            fadeIn: 'none',
                            ...(isObject(v) ? v : { name: v }),
                            ...props
                        }}
                    />
                )

            return REL
        })
    return [ReqestLoading, ComponentLoading]
}
