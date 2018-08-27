/**
 * 传递context
 * */

import React from 'react';
import RE from '../store';
import { isArray, isFunction, isString, isObject } from '../utils';
import pick from 'lodash.pick';

export default (id, fn = []) => WrappedComponent => props => {
    let warehouse = RE.__warehouse__[id];

    if (!warehouse) {
        console.warn(`组件${WrappedComponent.displayName} Push 的 仓库id 不存在，请在 init 初始化中注册 warehouse！`);
    } else {
        if (isFunction(fn)) {
            const dealResult = fn(props);
            Object.entries(isObject(dealResult) ? dealResult : {}).forEach(([n, m]) => {
                warehouse[n] = m;
            });
        } else {
            (isArray(fn) ? fn : [fn]).forEach(v => {
                warehouse[v] = props[v];
            });
        }
    }

    return <WrappedComponent {...props} />;
};
