import React from 'react';
import { connect } from 'react-redux';
import Loading2 from './Loading';
import { isFunction, isUndefined } from '../utils';

export default Loading => {
    class PlaceholderLoading extends React.Component {
        constructor(...arg) {
            super(...arg);
        }
        render() {
            return this.props.loading && !isUndefined(Loading) ? (
                !isFunction(Loading) ? (
                    <Loading2 type={Loading} />
                ) : (
                    <Loading {...this.props} />
                )
            ) : null;
        }
    }
    return connect(store => {
        return {
            loading: (store['@@LOADING'] || {}).loading
        };
    })(PlaceholderLoading);
};
