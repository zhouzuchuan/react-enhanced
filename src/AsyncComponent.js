/**
 * 异步加载组件以及model
 * */

import Loadable from 'react-loadable';
import React from 'react';
import Loading from './components/Loading.js';
import { isFunction, isArray } from './utils';

export default (registerModel, componentLoading, params = {}) => {
    const isMore = isFunction(params);

    const defaultParams = {
        loading: componentLoading ? componentLoading : Loading
    };

    if (isMore) {
        return Loadable({
            ...defaultParams,
            loader: params
        });
    } else {
        const { props: props2 = {}, component, model, ...rest } = params;
        return Loadable.Map({
            ...defaultParams,
            ...rest,
            loader: (isArray(model) ? model : [model]).reduce(
                (r, v, i) => ({ ...r, [i]: v }),
                { component }
            ),
            render({ component, ...models }, props) {
                const ReturnCompoment = component.default;
                models &&
                    Object.values(models).forEach(v =>
                        registerModel(v.default)
                    );
                return <ReturnCompoment {...{ ...props2, ...props }} />;
            }
        });
    }
};
