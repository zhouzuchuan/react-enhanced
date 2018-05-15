/**
 * 传递context
 * */

import React from 'react';
import lo from 'lodash';
import ContextStore from './ContextStore';

export default (type, transferKey = [], cust = {}) => WrappedComponent => {
    // console.log(WrappedComponent)
    return class HOCComponent2 extends React.Component {
        render() {
            return (
                <ContextStore.Provider
                    value={{
                        ...lo.pick(this.props, transferKey),
                        ...(this.props.CONTEXT || {}),
                        ...cust
                    }}
                >
                    <WrappedComponent
                        {...lo.omit(this.props, [...transferKey, 'CONTEXT'])}
                    />
                </ContextStore.Provider>
            );
        }
    };
};
