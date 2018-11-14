import React from 'react';
import { Provider } from 'react-redux';
import { Context } from '../store';

const Provider2 = props => (
    // <Context.Provider value={LOADING}>
    <Provider {...props} />
    // </Context.Provider>
);

export default Provider2;
