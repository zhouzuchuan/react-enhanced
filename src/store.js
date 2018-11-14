import pick from 'lodash.pick';
import React from 'react';
import { isArray, isObject } from './utils';
import { TOP_WAREHOUSE_NAME } from './const';
import { bindActionCreators } from 'redux';

const RE = {};

export const pull = (...params) => {
    if (!params.length) {
        return {};
    }
    const [id, limit] = params.length === 1 ? [TOP_WAREHOUSE_NAME, ...params] : params.slice(0, 2);

    const wh = RE.__warehouse__[id];

    if (!wh) {
        console.warn(`仓库名 ${id} 并未注册，请在 init 初始化中注册 warehouse！`);
        return {};
    }

    return pick(wh, isArray(limit) ? limit : [limit]);
};
export const push = (...params) => {
    if (!params.length) {
        return {};
    }
    const [id, limit] = params.length === 1 ? [TOP_WAREHOUSE_NAME, ...params] : params.slice(0, 2);

    const wh = RE.__warehouse__[id];
    if (!wh) {
        console.warn(`仓库名 ${id} 并未注册，请在 init 初始化中注册 warehouse！`);
        return {};
    }

    return isObject(limit)
        ? Object.entries(limit).reduce((r, [k, v]) => {
              r[k] = v;
              return r;
          }, wh)
        : {};
};

export const request = (...params) => {
    return bindActionCreators(
        Object.entries(pull(...params)).reduce(
            (r, [k, v]) => ({
                ...r,
                [k]: (params, callback) => ({
                    request: v.bind(null, params),
                    callback
                })
            }),
            {}
        ),
        RE.dispatch
    );
};
export const Context = React.createContext();

RE.pull = pull;
RE.push = push;
RE.request = request;
// RE.Context = Context;

export default RE;
