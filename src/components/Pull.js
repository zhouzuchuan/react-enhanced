/**
 * 继承context
 * id: 仓库名
 * limit：获取CONTEXT中指定的key
 *
 * */
import React from 'react';
import pick from 'lodash.pick';
import RE from '../store';
import { isArray } from '../utils';

export default (id, limit = []) => WrappedComponent => props => {
    const warehouse = RE.__warehouse__[id];
    let newProps = props;

    if (!warehouse) {
        console.warn(`组件${WrappedComponent.displayName} Pull 的 仓库id 不存在，请在 init 初始化中注册 warehouse！`);
    } else {
        newProps = {
            ...newProps,
            ...(isArray(limit) ? pick(warehouse, limit) : {})
        };
    }
    return <WrappedComponent {...newProps} />;
};
