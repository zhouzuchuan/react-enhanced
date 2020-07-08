/**
 * 转换成 数组数据 （如果已经是数组 则直接返回）
 *
 * @param {*} data
 */
const toArray = (data: any) => (Array.isArray(data) ? data : [data])

export { toArray }
