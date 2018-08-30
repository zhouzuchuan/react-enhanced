import React from 'react';
import { isFunction, isBoolean, isArray, isUndefined, isString, isNumber, isObject } from './tools.js';
import Loading from '../components/Loading.js';

/**
 * 返回loading组件 [请求loading， 组件loading]
 *
 * @param {*} arr
 * @return []
 */
const dealArray = arr =>
    arr.map(
        v =>
            React.isValidElement(v) ? (
                v
            ) : (isBoolean(v) && v) || isString(v) || isNumber(v) ? (
                <Loading type={`${v}`} />
            ) : null
    );
/**
 * 统一处理传进来的非函数值
 *
 * @param {*} data
 * @returns
 */
const tranferArray = data => {
    let temp = data;
    if (isArray(data)) {
        const size = data.length;
        if (size >= 2) {
            return dealArray(data.slice(0, 2));
        } else {
            temp = !size ? null : data;
        }
    }
    if (isFunction(data)) {
        temp = null;
    }
    return dealArray(Array(2).fill(temp));
};

/**
 * 返回loading组件
 *
 *
 * @param {*} params
 * function: 则执行, 返回值为 function 不显示 否则 对应下面的逻辑
 * object: 会取里面的type 作为目标 执行下面的逻辑，其他的参数带出
 * array: 为空不显示 数量为1 则复制一份 大于等于2 则去前两个
 * boolean: true 显示默认1， fasle 则不显示
 * string/number: 如果是默认编号 则显示 否则 不显示
 * 其他: 不显示
 * @returns
 */
export default params => {
    let dealParams = [params, {}];
    if (isFunction(params)) {
        dealParams[0] = params();
    } else if (isObject(params)) {
        const { type = 0, ...rest } = params;
        dealParams = [type, rest];
    }
    return [...tranferArray(dealParams[0]), dealParams[1]];
};
