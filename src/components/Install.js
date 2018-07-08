/**
 * 注入方法
 * type: 当前类型，查看ContextStore
 * limit：获取CONTEXT中指定的key
 *
 * */
import React from 'react';
import pick from 'lodash.pick';
import RE from '../store';
import { isString, isArray } from '../utils';

export default (inject = [], CONTEXT = []) => WrappedComponent => props => {
    const newProps = {
        ...props,
        ...(isString(inject) || isArray(inject) ? pick(RE, inject) : {})
    };
    return <WrappedComponent {...newProps} />;
};
