/**
 * 继承context
 * id: 仓库名
 * limit：获取仓库中指定的key
 * inline：是否内联注入pull
 *
 * */
import React from 'react';
import { pull } from '../store';

export default (id, limit = [], inline = true) => WrappedComponent => props => {
    return <WrappedComponent {...{ ...props, ...pull(id, limit), ...(inline && { pull }) }} />;
};
