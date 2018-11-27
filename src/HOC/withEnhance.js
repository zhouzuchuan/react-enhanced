import React from 'react';
import RE, { request, pull, push } from '../store';

export default WrappedComponent => props => {
    return <WrappedComponent {...{ ...props, enhance: { request, pull, push } }} />;
};
