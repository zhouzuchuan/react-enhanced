export { isFunction, isObject, isString, isBoolean, isUndefined, isArray, isNull, isNumber } from './tools.js';
export { default as loadFormat } from './loadFormat.js';
export { epicEnhance } from './epic';

export const addNameSpace = (obj = {}, namespace) =>
    Object.entries(obj).reduce((r, [n, m]) => {
        const funName = `${namespace}/${n}`;
        Reflect.defineProperty(m, 'name', { value: funName });
        return { ...r, [funName]: m };
    }, {});
