import pick from 'lodash.pick';
import React from 'react';
import { isArray, isObject } from './utils';
import { TOP_WAREHOUSE_NAME } from './const';

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
export const Context = React.createContext();
export const LOADING = {};

RE.pull = pull;
RE.push = push;
RE.LOADING = {};
// RE.Context = Context;

export default RE;
