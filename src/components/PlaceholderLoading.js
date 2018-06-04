import React from 'react';
import { connect } from 'react-redux';
import Loading2 from './Loading';
import { isBoolean } from '../utils';

export default Loading => {
    class PlaceholderLoading extends React.Component {
        constructor(...arg) {
            super(...arg);
        }
        render() {
            return this.props.loading && Loading ? Loading === true ? <Loading2 /> : <Loading {...this.props} /> : null;
        }
    }
    return connect(store => {
        return {
            loading: (store['@@LOADING'] || {}).loading
        };
    })(PlaceholderLoading);
};
