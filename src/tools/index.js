import last from 'lodash.last'
import { console } from '../utils'

import RE from '../store'

export const registerModel = (...a) => {
    if (RE.registerModel) {
        return RE.registerModel(...a)
    }
    console.error('registerModel 不存在，请先 init！')
}

/**
 *
 * 获取 immutable对象 数据
 *
 * @param {*} source
 * immutable对象
 *
 * @param {Array} pathArr
 * 选取路径集合，采用.拼接路径
 * 如果子项是 array 则返回的数据经过toJS转换
 *
 * @return {*} 默认返回的是取到的immutable数据
 *
 * @example
 *
 * 获取嵌套数据
 * immutableSelector(app, ['data.list'])
 * 多个数据
 * immutableSelector(app, ['name', 'age'])
 * 获取的Imuutable数据 经过toJS处理
 * immutableSelector(app, [['children']])
 *
 */
export const immutableSelector = (source, pathArr) =>
    pathArr.reduce((r, v) => {
        const isJS = Array.isArray(v)
        const path = (isJS ? v.join('.') : v).split('.')
        const key = last(last(path).split('|'))
        const data = source.getIn(path.map(v => v.split('|')[0]))
        return {
            ...r,
            [key]: isJS ? data.toJS() : data,
        }
    }, {})

export default {
    immutableSelector,
    registerModel,
}
