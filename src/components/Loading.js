import React from 'react';
import './loading.css';

const LOADING_TYPE = [
    <span className="RE-LOADING WAVE">
        <span />
        <span />
        <span />
        <span />
        <span />
    </span>,
    <span className="RE-LOADING BLOCK">
        <span />
    </span>,
    <span className="RE-LOADING CRICLE">
        <span />
        <span />
    </span>
];

const Loading = ({ type }) => {
    return LOADING_TYPE[type] ? LOADING_TYPE[type] : null;
};

export default Loading;
