import React from 'react';
import { isFunction, isArray } from '../utils';
import RE from '../store';

export default modelFn => WrappedComponent => props => {
    const { pull, push, dispatch, request, getState } = RE;
    const newProps = (isArray(modelFn) ? modelFn : [modelFn]).reduce(
        (r, v) => ({
            ...r,
            ...(isFunction(v) ? v({ pull, push, dispatch, request, getState }, props) || {} : {})
        }),
        {}
    );
    return <WrappedComponent {...{ ...props, ...newProps }} />;
};
