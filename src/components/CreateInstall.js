/**
 * 传递context
 * */

import React from 'react';
import ContextStore from './ContextStore';

export default value => WrappedComponent => {
    return class HOCComponent2 extends React.Component {
        render() {
            return (
                <ContextStore.Provider {...{ value }}>
                    <WrappedComponent {...this.props} />
                </ContextStore.Provider>
            );
        }
    };
};
