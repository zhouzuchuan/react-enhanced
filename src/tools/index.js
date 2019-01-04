import last from 'lodash.last'

// 获取 immutable 数据
export const immutableSelector = (source, keyArr) =>
    keyArr.reduce((r, v) => {
        const isJS = Array.isArray(v)
        const path = (isJS ? v.join('.') : v).split('.')
        const key = last(last(path).split('|'))
        const data = source.getIn(path.map(v => v.split('|')[0]))
        return {
            ...r,
            [key]: isJS ? data.toJS() : data
        }
    }, {})

export default {
    immutableSelector
}
