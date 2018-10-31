/**
 * 传递context
 * */

import React from 'react';
import { push } from '../store';
import { isArray, isFunction, isString, isObject } from '../utils';
import pick from 'lodash.pick';

const deal = (l, p) => {
    return isFunction(l) ? fn(p) : pick(p, isArray(l) ? l : [l]);
};

export default (...params) => WrappedComponent => props => {
    const [id, fn = [], inline = true] = params;
    if (params.length > 1) {
        push(id, deal(fn, props));
    } else {
        push(deal(id, props));
    }

    return <WrappedComponent {...{ ...props, ...(inline && { push }) }} />;
};
