import React from 'react';
import RE, { request, pull } from '../store';

export default (id, limit = [], inline = true) => WrappedComponent => props => {
    return <WrappedComponent {...{ ...props, ...request(id, limit), ...(inline && { pull }) }} />;
};
