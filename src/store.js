import pick from 'lodash.pick';
import { isArray, isObject, isFunction } from './utils';
import { TOP_WAREHOUSE_NAME } from './const';
import { bindActionCreators } from 'redux';

const RE = {};

// 提取参数
const extractParams = (params, callback) => {
    if (!params.length) {
        return {};
    }
    // 如果参数只有一个 则从根仓库取值赋值
    const [id, limit] = params.length === 1 ? [TOP_WAREHOUSE_NAME, ...params] : params.slice(0, 2);

    const wh = RE.__warehouse__[id];

    if (!wh) {
        console.warn(`仓库名 ${id} 并未注册，请在 init 初始化中注册 warehouse！`);
        return {};
    }
    return callback(wh, limit);
};

// 取
export const pull = (...params) => extractParams(params, (wh, limit) => pick(wh, isArray(limit) ? limit : [limit]));
// 存
export const push = (...params) =>
    extractParams(params, (wh, limit) =>
        isObject(limit)
            ? Object.entries(limit).reduce((r, [k, v]) => {
                  r[k] = v;
                  return r;
              }, wh)
            : {}
    );
// request中间件包装
export const request = (...params) =>
    bindActionCreators(
        Object.entries(pull(...params)).reduce(
            (r, [k, v]) => ({
                ...r,
                [k]: (params, options = {}) => {
                    const { tplData, ...restOption } = {
                        ...(isFunction(options) && { callback: options }),
                        ...(isObject(options) && options)
                    };
                    return {
                        request: v.bind(null, ...[params, ...(tplData ? [tplData] : [])]),
                        ...restOption
                    };
                }
            }),
            {}
        ),
        RE.dispatch
    );

RE.pull = pull;
RE.push = push;
RE.request = request;

export default RE;
