/**
 * 异步加载组件以及model
 * */

import Loadable from 'react-loadable';
import React from 'react';
// import Loading from '@components/Loading'

export default (registerModel, fn, params = {}) => {
    const { props: props2 = {}, ...reset } = params;
    const isMore = typeof fn === 'object';

    return (!isMore ? Loadable : Loadable.Map)({
        loader: fn,
        loading: () => {
            return <div>dddd</div>;
        },
        ...(isMore && {
            render({ component, model }, props) {
                const ReturnCompoment = component.default;
                model && registerModel(model.default);
                return <ReturnCompoment {...{ ...props2, ...props }} />;
            }
        }),
        ...reset
    });
};
